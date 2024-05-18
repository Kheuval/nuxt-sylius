import { useCartStorageManager } from "~/server/Services/Order/CartStorageManager";
import { codeFromIri } from "~/server/utils/codeFromIri";
import type { Cart, Item } from "~/types/Cart";

const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  assertMethod(event, "POST");

  const { setCartInStorage } = useCartStorageManager();

  const { cart, item, quantity }: { cart: Cart; item: Item; quantity: number } =
    await readBody(event);

  if (!cart.tokenValue) {
    // TODO : Error handling
    await createCart(cart);
  }

  // TODO : Error handling
  await addItem(cart, item, quantity);

  // TODO : Error handling
  await setCartInStorage(cart);

  // Set the cookie for 1 year, can be removed earlier if the cart doesn't exist anymore
  setCookie(event, "cartToken", cart.tokenValue!, {
    sameSite: true,
    secure: true,
    httpOnly: true,
    maxAge: 365 * 24 * 60 * 60,
  });

  setResponseStatus(event, 201);
});

const createCart = async (cart: Cart) => {
  const createdCart = await $fetch<{ tokenValue: string }>("/orders", {
    baseURL: config.public.syliusApiUrl,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: {},
  });

  cart.tokenValue = createdCart.tokenValue;
};

const addItem = async (cart: Cart, item: Item, quantity: number) => {
  if (item.id) {
    await $fetch(`/orders/${cart.tokenValue}/items/${item.id}`, {
      baseURL: config.public.syliusApiUrl,
      method: "PATCH",
      headers: {
        "Content-Type": "application/merge-patch+json",
        Accept: "application/json",
      },
      body: {
        quantity,
      },
    });

    return;
  }

  const response = await $fetch<{ items: { id: number; variant: string }[] }>(
    `/orders/${cart.tokenValue}/items`,
    {
      baseURL: config.public.syliusApiUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: {
        productVariant: item.variantCode,
        quantity,
      },
    },
  );

  const orderItems = response.items.map((item) => ({
    variantCode: codeFromIri(item.variant),
    itemId: item.id,
  }));

  for (const item of cart.items) {
    const matchingItem = orderItems.find(
      (orderItem) => orderItem.variantCode === item.variantCode,
    );

    if (matchingItem) {
      item.id = matchingItem.itemId;
    }
  }
};
