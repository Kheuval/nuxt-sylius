<template>
  <FormKit
    type="form"
    :id
    :actions="false"
    :plugins="[zodPlugin]"
    @submit="submitHandler"
    v-model="_formData"
  >
    <FormKit v-if="showEmailField" type="email" name="email" label="Courriel" />
    <div class="flex gap-4">
      <FormKit type="text" name="firstName" label="Prénom" />
      <FormKit type="text" name="lastName" label="Nom" />
    </div>
    <FormKit type="text" name="company" label="Société" />
    <FormKit type="text" name="street" label="Voie" />
    <FormKit
      type="select"
      id="countrySelect"
      name="countryCode"
      label="Pays"
      placeholder="Sélectionner un pays"
      :options="_countries"
      @change="handleCountrySelection"
    />
    <FormKit
      v-show="showProvinceSelect"
      type="select"
      id="provinceSelect"
      name="provinceCode"
      label="État"
      placeholder="Sélectionner un état"
      :options="provinces"
      @change="setProvinceName"
    />
    <FormKit type="hidden" id="provinceName" name="provinceName" />
    <div class="flex gap-4">
      <FormKit type="text" name="city" label="Ville" />
      <FormKit type="text" name="postcode" label="Code postal" />
    </div>
    <FormKit type="tel" name="phoneNumber" label="Téléphone" />
  </FormKit>
</template>

<script lang="ts" setup>
import { createZodPlugin } from "@formkit/zod";
import {
  createValidationSchema,
  type AddressDTO,
} from "~/src/Addressing/form/validation/AddressForm";

const {
  id,
  initialData,
  showEmailField = false,
} = defineProps<{
  id: string;
  initialData?: AddressDTO | Partial<AddressDTO>;
  showEmailField?: boolean;
}>();

const _formData = ref(initialData);

const emits = defineEmits<{
  update: [data: AddressDTO];
}>();

const { data: countries } = await useFetch("/api/country");

const validationSchema = createValidationSchema(
  countries.value,
  showEmailField,
);

const _countries = countries.value?.map((country) => ({
  value: country.code,
  label: country.name,
}));

const showProvinceSelect = ref(false);
const provinces = ref<{ value: string; label: string }[]>([]);

const handleCountrySelection = async () => {
  if (!countries.value || !_formData.value?.countryCode) {
    return;
  }

  const selectedCountry = countries.value.find(
    (country) => country.code === _formData.value?.countryCode,
  );

  if (!selectedCountry) {
    return;
  }

  provinces.value =
    selectedCountry.provinces?.map((province) => ({
      value: province.code,
      label: province.name,
    })) || [];

  showProvinceSelect.value = !!(
    selectedCountry && selectedCountry?.provinces?.length
  );

  const provinceNode = getNode("provinceSelect");
  const provinceNameNode = getNode("provinceName");

  if (provinceNode && provinceNameNode && !showProvinceSelect.value) {
    await nextTick();
    provinceNode.reset();
    provinceNameNode.reset();
  }
};

const setProvinceName = async () => {
  const provinceNode = getNode("provinceSelect");
  const provinceNameNode = getNode("provinceName");

  if (
    !provinceNode ||
    !_formData.value?.countryCode ||
    !countries.value ||
    !provinceNameNode
  ) {
    return;
  }

  const country = countries.value.find(
    (country) => country.code === _formData.value!.countryCode,
  );

  if (!country || !country.provinces) {
    return;
  }

  const province = country.provinces.find(
    (province) => province.code === provinceNode.value,
  );

  if (!province) {
    return;
  }

  await provinceNameNode.input(province.name);
};

const [zodPlugin, submitHandler] = createZodPlugin(
  validationSchema,
  async (formData) => emits("update", formData),
);

handleCountrySelection();
</script>
