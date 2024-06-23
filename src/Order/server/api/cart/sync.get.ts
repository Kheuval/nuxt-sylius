import { useCartStorageManager } from "~/src/Order/server/services/CartStorageManager";

export default defineEventHandler(async (event) => {
  const { getCartFromStorage } = useCartStorageManager();

  const cartToken = getCookie(event, "cartToken");

  const cart = await getCartFromStorage(cartToken);

  if (!cart) {
    deleteCookie(event, "cartToken");
  }

  return cart;
});
