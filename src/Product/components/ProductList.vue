<template>
  <div class="grid grid-cols-3 gap-6">
    <div v-for="product in products" :key="product.code">
      <NuxtLink :to="localePath(`/products/${product.slug}`)">
        <NuxtImg
          class="w-full object-cover"
          :src="$config.public.syliusMediaUrl + product.imagePath"
          sizes="600px"
        />
        <p>
          {{ product.name }}
        </p>
        <p>
          {{ formatPrice(product.price) }}
        </p>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const localePath = useLocalePath();

const { data: products } = await useFetch("/api/products");
</script>
