import type { ClientSessionInterface } from "~/src/Auth/types/SessionInterface";

const useSessionState = () =>
  useState<ClientSessionInterface | null>("user-session", () => null);

const syncSession = async (): Promise<void> => {
  const sessionState = useSessionState();

  const session = await $fetch("/api/auth/session", {
    headers: useRequestHeaders(["cookie"]),
  });

  if (!session) {
    sessionState.value = null;

    return;
  }

  const expirationDate = new Date(session.expirationDate);

  sessionState.value = {
    key: session.key,
    expirationDate,
    isExpired: () => expirationDate <= new Date(),
  };
};

const shouldRedirectToLogin = async () => {
  const sessionState = useSessionState();

  if (sessionState.value && !sessionState.value.isExpired()) {
    return;
  }

  await syncSession();

  return navigateTo("/login");
};

export const useUserSession = () => {
  const sessionState = useSessionState();

  return {
    session: sessionState,
    isLoggedIn: computed(() =>
      Boolean(sessionState.value && !sessionState.value.isExpired()),
    ),
    syncSession,
    shouldRedirectToLogin,
  };
};
