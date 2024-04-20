export const formatPrice = (price: number | null): string => {
  if (null === price) {
    return "/";
  }

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price / 100);
};
