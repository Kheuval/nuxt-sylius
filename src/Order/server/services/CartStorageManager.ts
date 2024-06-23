import { providePrismaClient } from "~/src/Core/prisma/ClientProvider";
import type { Cart } from "~/src/Order/types/Cart";

export const useCartStorageManager = () => {
  const storage = useStorage("cart");

  const setCartInStorage = async (cart: Cart): Promise<void> => {
    if (!import.meta.server) {
      throw new Error(
        "The setCartInStorage method should only be used in the server context",
      );
    }

    if (!cart.tokenValue) {
      throw new Error("A cart token must be present");
    }

    await storage.setItem(cart.tokenValue, cart);
  };

  const getCartFromStorage = async (
    cartToken?: string,
  ): Promise<Cart | null> => {
    if (!import.meta.server) {
      throw new Error(
        "The getCartFromStorage method should only be used in the server context",
      );
    }

    if (!cartToken) {
      return null;
    }

    const prisma = providePrismaClient();

    const syliusCart = await prisma.sylius_order.findUnique({
      where: {
        token_value: cartToken,
        state: "cart",
      },
      select: {
        id: true,
      },
    });

    if (!syliusCart) {
      await storage.removeItem(cartToken);

      return null;
    }

    const cart = await storage.getItem<Cart>(cartToken);

    return cart;
  };

  return { setCartInStorage, getCartFromStorage };
};
