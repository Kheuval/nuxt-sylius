import { PrismaClient } from "@prisma/client";
import type { Cart } from "~/types/Cart";

export const useCartStorageManager = () => {
  const setCartInStorage = async (cart: Cart): Promise<void> => {
    if (!import.meta.server) {
      throw new Error(
        "The setCartInStorage method should only be used in the server context",
      );
    }

    if (!cart.tokenValue) {
      throw new Error("A cart token must be present");
    }

    const storage = useStorage("cart");

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

    const prisma = new PrismaClient();

    const syliusCart = await prisma.sylius_order.findUnique({
      where: {
        token_value: cartToken,
      },
      select: {
        id: true,
      },
    });

    const storage = useStorage("cart");

    if (!syliusCart) {
      await storage.removeItem(cartToken);

      return null;
    }

    const cart = await storage.getItem<Cart>(cartToken);

    return cart;
  };

  return { setCartInStorage, getCartFromStorage };
};
