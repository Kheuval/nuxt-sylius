export default defineEventHandler((event) => {
  const locale = getCookie(event, "lang");

  event.context.locale = locale;
});
