<template>
  <div v-if="product">
    <h1>{{ product.name }}</h1>
    <p v-if="product.shortDescription">{{ product.shortDescription }}</p>
    <p v-if="product.description">{{ product.description }}</p>
    <p v-if="product.variants">
      {{ formatPrice(product.variants[0].price) }}
    </p>
    <select
      v-if="product.variants"
      @change="
        (event) =>
          (selectedVariant = product!.variants!.find(
            (variant) =>
              variant.code === (event.target! as HTMLSelectElement).value,
          ))
      "
    >
      <option
        v-for="variant in product.variants"
        :key="variant.code"
        :value="variant.code"
      >
        {{ variant.name }}
      </option>
    </select>
    <button class="bg-sky-500 p-4" @click="addItemToCart(1)">
      Ajouter au panier
    </button>
  </div>
</template>

<script lang="ts" setup>
const { slug } = useRoute().params;

const { data: product, error } = await useFetch(`/api/product/${slug}`);

if (error.value) {
  throw createError(error.value);
}

const { selectedVariant, addItemToCart } = useAddToCart();
</script>
