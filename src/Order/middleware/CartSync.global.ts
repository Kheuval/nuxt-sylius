import { useCartStore } from "~/src/Order/stores/CartStore";

export default defineNuxtRouteMiddleware(async () => {
  const { getCartFromStorage } = useCartStore();

  await getCartFromStorage();
});
