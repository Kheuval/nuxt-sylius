import { useCartStore } from "~/src/Order/stores/CartStore";

export default defineNuxtRouteMiddleware(() => {
  const { cart } = useCartStore();

  if (!cart) {
    return abortNavigation();
  }
});
