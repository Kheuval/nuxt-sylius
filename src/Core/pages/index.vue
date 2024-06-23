<template>
  {{ session }}
  <h1>{{ $t("welcome") }}</h1>
  <button v-if="isLoggedIn" @click="getUser">Get user</button>
  <NuxtLink :to="localePath('/checkout')">Aller au checkout</NuxtLink>
  <NuxtLink :to="localePath('/login')" v-if="!isLoggedIn">
    Se connecter
  </NuxtLink>
  <NuxtLink :to="localePath('/register')" v-if="!isLoggedIn">
    Créer un compte
  </NuxtLink>
  <button v-if="isLoggedIn" @click="logout">Se déconnecter</button>
  <ProductList />
</template>

<script lang="ts" setup>
const localePath = useLocalePath();
await useConfigureLocale();

const { session, isLoggedIn } = useUserSession();
const { logout, getUser } = useAuth();
</script>
