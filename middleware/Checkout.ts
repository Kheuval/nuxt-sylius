export default defineNuxtRouteMiddleware(() => {
  const { cart } = useCartStore();

  if (!cart) {
    return abortNavigation();
  }
});
