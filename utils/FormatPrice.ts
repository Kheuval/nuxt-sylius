export const formatPrice = (price: number | null | undefined): string => {
  if (null === price || undefined === price) {
    return "/";
  }

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price / 100);
};
