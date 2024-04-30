import type { Cart, Item } from "~/types/Cart";

export const useCartStore = defineStore("cart", () => {
  const cart = ref<Cart>();

  const getCartFromStorage = async () => {
    // @ts-ignore
    cart.value = await $fetch("/api/cart/sync", {
      headers: useRequestHeaders(["cookie"]),
    });
  };

  const createCart = () =>
    (cart.value = { orderTotal: 0, orderItemTotal: 0, items: [] });

  const addToCart = (item: Item) => {
    if (!cart.value) {
      createCart();
    }

    cart.value!.orderItemTotal += item.price || 0;
    cart.value!.orderTotal += item.price || 0;

    const existingItem = cart.value!.items.find(
      (searchItem) => searchItem.variantCode === item.variantCode,
    );

    if (existingItem) {
      existingItem.quantity += item.quantity;

      return;
    }

    cart.value!.items.push(item);
  };

  return { cart, addToCart, getCartFromStorage };
});
