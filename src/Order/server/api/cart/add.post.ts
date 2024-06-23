import { useSessionManager } from "~/src/Auth/server/services/SessionManager";
import type { SessionInterface } from "~/src/Auth/types/SessionInterface";
import { codeFromIri } from "~/src/Core/utils/codeFromIri";
import { useCartStorageManager } from "~/src/Order/server/services/CartStorageManager";
import type { Cart, Item } from "~/src/Order/types/Cart";

export default defineEventHandler(async (event) => {
  const { getSession } = useSessionManager();
  const { setCartInStorage } = useCartStorageManager();

  const session = await getSession(event);

  const { cart, item, quantity }: { cart: Cart; item: Item; quantity: number } =
    await readBody(event);

  if (!cart.tokenValue) {
    // TODO : Error handling
    await createCart(cart, session);
  }

  // TODO : Error handling
  await addItem(cart, item, quantity, session);

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

const createCart = async (cart: Cart, session: SessionInterface | null) => {
  const createdCart = await apiFetch(session)<{ tokenValue: string }>(
    "/orders",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: {},
    },
  );

  cart.tokenValue = createdCart.tokenValue;
};

const addItem = async (
  cart: Cart,
  item: Item,
  quantity: number,
  session: SessionInterface | null,
) => {
  if (item.id) {
    await apiFetch(session)(`/orders/${cart.tokenValue}/items/${item.id}`, {
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

  const response = await apiFetch(session)<{
    items: { id: number; variant: string }[];
  }>(`/orders/${cart.tokenValue}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: {
      productVariant: item.variantCode,
      quantity,
    },
  });

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
