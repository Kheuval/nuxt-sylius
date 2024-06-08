<template>
  <FormKit
    type="form"
    id="register-form"
    :actions="false"
    :plugins="[zodPlugin]"
    @submit="submitHandler"
  >
    <div class="flex gap-4">
      <FormKit type="text" name="firstName" label="Prénom" />
      <FormKit type="text" name="lastName" label="Nom" />
    </div>
    <FormKit type="email" name="email" label="Courriel" />
    <FormKit type="tel" name="phoneNumber" label="Téléphone" />
    <FormKit
      type="checkbox"
      name="newsletter"
      label="S'abonner à la newsletter"
    />
    <FormKit type="password" name="passwordFirst" label="Mot de passe" />
    <FormKit type="password" name="passwordSecond" label="Vérification" />
  </FormKit>
</template>

<script lang="ts" setup>
import { createZodPlugin } from "@formkit/zod";
import {
  createValidationSchema,
  type RegisterDTO,
} from "~/src/Auth/form/validation/RegisterForm";

const emits = defineEmits<{
  update: [data: RegisterDTO];
}>();

const validationSchema = createValidationSchema();

const [zodPlugin, submitHandler] = createZodPlugin(
  validationSchema,
  async (formData) => emits("update", formData),
);
</script>
