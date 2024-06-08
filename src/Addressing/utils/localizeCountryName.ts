export const localizeCountryName = (code: string, locale = "fr"): string => {
  const intl = new Intl.DisplayNames([locale], {
    type: "region",
    fallback: "code",
  });

  return intl.of(code) || code;
};
