/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./src/**/components/**/*.{js,vue,ts}",
    "./src/**/layouts/**/*.vue",
    "./src/**/pages/**/*.vue",
    "./app.vue",
    "./error.vue",
    "./formkit.theme.ts",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
