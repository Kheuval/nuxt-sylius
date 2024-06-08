export const useConfigureLocale = async () => {
  const { getBrowserLocale, setLocale, locale } = useI18n();

  const savedLang = useCookie("lang");

  watchEffect(() => {
    if (savedLang.value !== locale.value) {
      savedLang.value = locale.value;
    }
  });

  await setLocale(savedLang.value || getBrowserLocale() || "fr");
};
