import { defu } from "defu";
import { createResolver } from "@nuxt/kit";

const { resolve } = createResolver(import.meta.url);

const config = defineNuxtConfig({
  runtimeConfig: {
    public: {
      syliusUrl: import.meta.env.SYLIUS_URL || "",
      syliusApiUrl: import.meta.env.SYLIUS_API_URL || "",
      syliusMediaUrl: import.meta.env.SYLIUS_MEDIA_URL || "",
    },
  },
});

const modules = defineNuxtConfig({
  modules: [
    "@pinia/nuxt",
    "@nuxt/test-utils/module",
    "@nuxt/image",
    "@formkit/nuxt",
    "@nuxtjs/i18n",
  ],

  nitro: {
    storage: {
      cart: {
        driver: "fsLite",
        base: "./var/sessions/carts",
      },
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

  formkit: {
    autoImport: true,
  },

  i18n: {
    locales: [
      {
        code: "fr",
        file: "fr.ts",
      },
      {
        code: "en",
        file: "en.ts",
      },
    ],
    lazy: true,
    langDir: "translations",
    defaultLocale: "fr",
    strategy: "prefix",
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});

const app = defineNuxtConfig({
  css: [resolve("./assets/css/main.css")],
});

export default defu(config, modules, app);
