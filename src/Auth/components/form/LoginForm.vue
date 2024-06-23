<template>
  <FormKit
    type="form"
    id="login-form"
    :actions="false"
    :plugins="[zodPlugin]"
    @submit="submitHandler"
  >
    <FormKit type="text" name="email" label="Identifiant" />
    <FormKit type="password" name="password" label="Mot de passe" />
    <FormKit type="checkbox" name="rememberMe" label="Rester connecté" />
  </FormKit>
</template>

<script lang="ts" setup>
import { createZodPlugin } from "@formkit/zod";
import {
  createValidationSchema,
  type LoginDTO,
} from "~/src/Auth/form/validation/LoginForm";

const emits = defineEmits<{
  update: [data: LoginDTO & { rememberMe?: boolean }];
}>();

const validationSchema = createValidationSchema();

const [zodPlugin, submitHandler] = createZodPlugin(
  validationSchema,
  async (formData) => emits("update", formData),
);
</script>
