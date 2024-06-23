import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  extends: [
    "./src/Core",
    "./src/Product",
    "./src/Order",
    "./src/Addressing",
    "./src/Auth",
  ],

  imports: {
    dirs: ["~/**/composables/**"],
  },
});
