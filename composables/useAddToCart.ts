import type { Item } from "~/types/Cart";
import type { Variant } from "~/types/Product/SingleProduct";

export const useAddToCart = () => {
  const { addToCart, getCartFromStorage } = useCartStore();
  const { cart } = toRefs(useCartStore());

  const selectedVariant = ref<Variant>();
  const _addedItem = ref<Item>();
  const _quantity = ref(1);

  const body = computed(() => ({
    cart: cart.value,
    item: _addedItem.value,
    quantity: _quantity.value,
  }));

  const addItemToCart = async (quantity: number = 1) => {
    if (!selectedVariant.value) {
      return;
    }

    _quantity.value = quantity;

    _addedItem.value = {
      productName: selectedVariant.value.productName,
      variantName: selectedVariant.value.name,
      variantCode: selectedVariant.value.code,
      quantity,
      price: selectedVariant.value.price,
    };

    addToCart(_addedItem.value);

    // TODO : Error handling
    await $fetch("/api/cart/add", {
      method: "POST",
      body: body.value,
    });

    // TODO : Error handling
    await getCartFromStorage();
  };

  return { selectedVariant, addItemToCart };
};
