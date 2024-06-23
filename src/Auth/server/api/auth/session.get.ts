import { useSessionManager } from "~/src/Auth/server/services/SessionManager";
import type { ClientSessionInterface } from "~/src/Auth/types/SessionInterface";

export default defineEventHandler(async (event) => {
  const { getSession } = useSessionManager();

  const session = await getSession(event);

  if (!session) {
    deleteCookie(event, "sessionToken");

    return null;
  }

  const clientSession: ClientSessionInterface = {
    key: session.key,
    expirationDate: session.expirationDate,
    isExpired: session.isExpired,
  };

  return clientSession;
});
