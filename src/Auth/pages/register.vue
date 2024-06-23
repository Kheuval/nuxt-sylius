<template>
  <RegisterForm @update="(formData) => (registerFormData = formData)" />
  <button @click="submit">Créer un compte</button>
</template>

<script lang="ts" setup>
import RegisterForm from "~/src/Auth/components/form/RegisterForm.vue";

const { registerFormData, register, registerError } = useAuth();

const submit = async () => {
  const registerForm = getNode("register-form");
  submitForm("register-form");

  await waitForFormUpdate();

  if (registerForm?.context?.state.valid) {
    await register();

    if (registerError.value) {
      return;
    }

    const localePath = useLocalePath();

    return navigateTo(localePath("/"));
  }
};
</script>
