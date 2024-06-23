import type { SerializedSessionInterface } from "~/src/Auth/types/SessionInterface";
import { useRefreshTokenRepository } from "~/src/Auth/server/repository/RefreshTokenRepository";

export default defineTask({
  meta: {
    name: "auth:remove-expired-sessions",
    description: "Removes the expired sessions from the storage",
  },
  async run() {
    const storage = useStorage("session");
    const { deleteToken } = useRefreshTokenRepository();

    const sessionKeys = await storage.getKeys();

    let removedSessionsCount = 0;
    const dateNow = new Date();

    for (const key of sessionKeys) {
      const session = await storage.getItem<SerializedSessionInterface>(key);

      const expirationDate = new Date(session!.expirationDate);

      if (expirationDate <= dateNow) {
        removedSessionsCount += 1;

        await deleteToken(session!.refreshToken.value);
        await storage.removeItem(session!.key);
      }
    }

    return { result: `${removedSessionsCount} sessions removed` };
  },
});
