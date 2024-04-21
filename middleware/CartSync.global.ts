export default defineNuxtRouteMiddleware(async () => {
  const { getCartFromStorage } = useCartStore();

  await getCartFromStorage();
});
