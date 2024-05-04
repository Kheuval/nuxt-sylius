<template>
  <FormKitSchema
    v-if="schema"
    :schema
    @submit="(data: T) => $emit('submit', data)"
  />
</template>

<script lang="ts" setup generic="T">
import { FormKitSchema } from "@formkit/vue";
import { provideForm } from "~/services/Form/FormProvider";

const { formName, initialData } = defineProps<{
  formName: string;
  initialData?: T;
}>();

defineEmits<{
  submit: [data: T];
}>();

const schema = await provideForm(formName, initialData as Object | undefined);
</script>
