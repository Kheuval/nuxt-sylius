import { useSessionManager } from "~/src/Auth/server/services/SessionManager";
import type { AuthResponse } from "~/src/Auth/types/TokenInterface";

export default defineEventHandler(async (event) => {
  const { getSession, refreshSession } = useSessionManager();

  const session = await getSession(event);

  if (session && session.accessToken.expirationDate <= new Date()) {
    const response = await apiFetch(session)<AuthResponse>("refresh", {
      method: "POST",
      body: {
        refresh_token: session.refreshToken.value,
      },
    });

    await refreshSession(response, session, event);
  }
});
