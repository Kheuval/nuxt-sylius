<template>
  <h1>{{ $t("welcome") }}</h1>
  <NuxtLink :to="localePath('/checkout')">Aller au checkout</NuxtLink>
  <ProductList />
</template>

<script lang="ts" setup>
const localePath = useLocalePath();
await useConfigureLocale();
</script>
