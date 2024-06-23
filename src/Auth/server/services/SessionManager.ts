import type {
  SerializedSessionInterface,
  SessionInterface,
} from "~/src/Auth/types/SessionInterface";
import type { AuthResponse } from "~/src/Auth/types/TokenInterface";
import type { H3Event } from "h3";
import { useAuthTokenManager } from "~/src/Auth/server/services/AuthTokenManager";
import { generateRandomString } from "~/src/Core/utils/generateRandomString";
import { idFromIri } from "~/src/Core/utils/idFromIri";
import { useRefreshTokenRepository } from "~/src/Auth/server/repository/RefreshTokenRepository";

const { createToken, deserializeToken } = useAuthTokenManager();

export const useSessionManager = () => {
  const storage = useStorage("session");

  const createSession = async (
    response: AuthResponse,
    rememberMe: boolean,
    event: H3Event,
  ): Promise<SessionInterface> => {
    const config = useRuntimeConfig();

    const accessToken = createToken(response.token);
    const refreshToken = createToken(
      response.refresh_token,
      parseInt(config.refreshTokenExpiration),
    );

    const expirationDate = new Date();

    if (rememberMe) {
      expirationDate.setTime(refreshToken.expirationDate.getTime());
    } else {
      expirationDate.setTime(accessToken.expirationDate.getTime());
    }

    const session: SessionInterface = {
      key: generateRandomString(10),
      expirationDate,
      userId: idFromIri(response.customer),
      accessToken,
      refreshToken,
      isExpired: () => expirationDate <= new Date(),
    };

    await storage.setItem(session.key, session);

    setCookie(event, "sessionToken", session.key, {
      sameSite: true,
      secure: true,
      httpOnly: true,
      maxAge: Math.floor(
        (session.expirationDate.getTime() - new Date().getTime()) / 1000,
      ),
    });

    return session;
  };

  const refreshSession = async (
    response: AuthResponse,
    session: SessionInterface,
    event: H3Event,
  ): Promise<SessionInterface> => {
    const config = useRuntimeConfig();

    const accessToken = createToken(response.token);
    const refreshToken = createToken(
      response.refresh_token,
      parseInt(config.refreshTokenExpiration),
    );

    const newSession: SessionInterface = {
      key: session.key,
      expirationDate: new Date(refreshToken.expirationDate.getTime()),
      userId: session.userId,
      accessToken,
      refreshToken,
      isExpired: () => refreshToken.expirationDate <= new Date(),
    };

    await storage.setItem(session.key, newSession);

    setCookie(event, "sessionToken", newSession.key, {
      sameSite: true,
      secure: true,
      httpOnly: true,
      maxAge: Math.floor(
        (newSession.expirationDate.getTime() - new Date().getTime()) / 1000,
      ),
    });

    return newSession;
  };

  const removeSession = async (
    session: SessionInterface,
    event: H3Event,
  ): Promise<void> => {
    const { deleteToken } = useRefreshTokenRepository();

    await deleteToken(session.refreshToken.value);
    await storage.removeItem(session.key);
    deleteCookie(event, "sessionToken");
  };

  const getSession = async (
    event: H3Event,
  ): Promise<SessionInterface | null> => {
    const sessionToken = getCookie(event, "sessionToken");

    if (!sessionToken) {
      return null;
    }

    const session = deserializeSession(
      await storage.getItem<SerializedSessionInterface>(sessionToken),
    );

    if (!session) {
      return null;
    }

    if (session.isExpired()) {
      await removeSession(session, event);

      return null;
    }

    return session;
  };

  return { createSession, removeSession, getSession, refreshSession };
};

const deserializeSession = (
  serializedSession: SerializedSessionInterface | null,
): SessionInterface | null => {
  if (!serializedSession) {
    return null;
  }

  const expirationDate = new Date(serializedSession.expirationDate);

  return {
    key: serializedSession.key,
    expirationDate,
    userId: serializedSession.userId,
    accessToken: deserializeToken(serializedSession.accessToken),
    refreshToken: deserializeToken(serializedSession.refreshToken),
    isExpired: () => expirationDate <= new Date(),
  };
};
