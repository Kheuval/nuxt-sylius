/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "plugin:tailwindcss/recommended",
    "@vue/eslint-config-prettier",
  ],
  rules: {
    "vue/multi-word-component-names": [
      "error",
      {
        ignores: ["index", "[slug]"],
      },
    ],
  },
  settings: {
    tailwindcss: {},
  },
  parserOptions: {
    ecmaVersion: "latest",
  },
};
