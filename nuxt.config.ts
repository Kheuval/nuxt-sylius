import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxt/test-utils/module",
    "@nuxt/image",
    "@formkit/nuxt",
  ],
  nitro: {
    storage: {
      cart: {
        driver: "fsLite",
        base: "./var/sessions/carts",
      },
    },
  },
  css: ["~/assets/css/main.css"],
  formkit: {
    autoImport: true,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      syliusUrl: import.meta.env.SYLIUS_URL || "",
      syliusApiUrl: import.meta.env.SYLIUS_API_URL || "",
      syliusMediaUrl: import.meta.env.SYLIUS_MEDIA_URL || "",
    },
  },
  image: {
    format: ["webp"],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      "2xl": 1536,
    },
    domains: [import.meta.env.SYLIUS_URL || ""],
  },
});
