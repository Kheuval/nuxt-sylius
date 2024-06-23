import type { H3Event } from "h3";
import { useSessionManager } from "~/src/Auth/server/services/SessionManager";
import type { SessionInterface } from "~/src/Auth/types/SessionInterface";

/**
 * Checks if there is a session and if it is not expired
 * @param event The H3 request event
 * @returns A SessionInterface object
 * @throws 401 if there is no session or the session is expired
 */
export const protectRoute = async (
  event: H3Event,
): Promise<SessionInterface> => {
  const { getSession } = useSessionManager();

  const session = await getSession(event);

  if (!session || session.isExpired()) {
    throw createError({
      status: 401,
    });
  }

  return session;
};
