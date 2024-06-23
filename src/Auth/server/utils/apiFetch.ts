import type { SessionInterface } from "~/src/Auth/types/SessionInterface";

export const apiFetch = (session: SessionInterface | null = null) => {
  const config = useRuntimeConfig();

  return $fetch.create({
    baseURL: config.public.syliusApiUrl,
    onRequest({ options }) {
      if (null !== session) {
        const headers = (options.headers ||= {});

        if (Array.isArray(headers)) {
          headers.push([
            "Authorization",
            `Bearer ${session.accessToken.value}`,
          ]);
        } else if (headers instanceof Headers) {
          headers.set("Authorization", `Bearer ${session.accessToken.value}`);
        } else {
          headers.Authorization = `Bearer ${session.accessToken.value}`;
        }
      }
    },
  });
};
