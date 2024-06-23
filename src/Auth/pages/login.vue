<template>
  <LoginForm @update="(formData) => (loginFormData = formData)" />
  <button @click="submit">Se connecter</button>
</template>

<script lang="ts" setup>
import LoginForm from "~/src/Auth/components/form/LoginForm.vue";

const { loginFormData, login, loginError } = useAuth();
const { referer } = useRoute().query;

definePageMeta({
  middleware: ["auth"],
});

const submit = async () => {
  const loginForm = getNode("login-form");
  submitForm("login-form");

  await waitForFormUpdate();

  if (loginForm?.context?.state.valid) {
    await login();

    if (loginError.value) {
      return;
    }

    if (Array.isArray(referer)) {
      throw new Error("The referer query parameter must be a string");
    }

    const localePath = useLocalePath();

    return navigateTo(referer || localePath("/"));
  }
};
</script>
