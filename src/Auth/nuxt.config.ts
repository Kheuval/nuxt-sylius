import { createResolver } from "@nuxt/kit";

const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  runtimeConfig: {
    refreshTokenExpiration: import.meta.env.REFRESH_TOKEN_EXPIRATION || "0",
  },
  nitro: {
    experimental: {
      tasks: true,
    },
    scheduledTasks: {
      "*/30 * * * *": ["auth:remove-expired-sessions"],
    },
    storage: {
      session: {
        driver: "fsLite",
        base: resolve("../../var/storage/session"),
      },
    },
  },
});
