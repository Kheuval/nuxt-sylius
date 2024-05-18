import { useCartStorageManager } from "~/server/Services/Order/CartStorageManager";

export default defineEventHandler(async (event) => {
  assertMethod(event, "GET");

  const { getCartFromStorage } = useCartStorageManager();

  const cartToken = getCookie(event, "cartToken");

  const cart = await getCartFromStorage(cartToken);

  if (!cart) {
    setCookie(event, "cartToken", "", {
      expires: new Date("+0"),
      sameSite: true,
    });
  }

  return cart;
});
