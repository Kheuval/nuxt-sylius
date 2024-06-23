import { useSessionManager } from "~/src/Auth/server/services/SessionManager";
import type { H3Event } from "h3";

const setResponse = (event: H3Event) => {
  setResponseStatus(event, 204);
  deleteCookie(event, "sessionToken");
};

export default defineEventHandler(async (event) => {
  const { getSession, removeSession } = useSessionManager();

  const session = await getSession(event);

  if (null === session) {
    setResponse(event);

    return;
  }

  await removeSession(session, event);
  setResponse(event);
});
