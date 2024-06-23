<template>
  <div>
    Addresse de livraison
    <AddressForm
      :id="shippingAddressFormId"
      :showEmailField="!isLoggedIn"
      @update="(data) => (shippingAddressFormData = data as AddressDTO)"
    />
  </div>
  <FormKit
    type="checkbox"
    label="Utiliser une adresse différente pour la facturation ?"
    v-model="differentBillingAddress"
  />
  <ClientOnly>
    <div v-show="differentBillingAddress">
      Addresse de facturation
      <AddressForm
        :id="billingAddressFormId"
        @update="(data) => (shippingAddressFormData = data as AddressDTO)"
      />
    </div>
  </ClientOnly>
  <button class="bg-sky-500 p-4" @click="submit">Valider</button>
</template>

<script lang="ts" setup>
import AddressForm from "~/src/Addressing/components/form/AddressForm.vue";
import type { AddressDTO } from "~/src/Addressing/form/validation/AddressForm";
import { waitForFormUpdate } from "~/src/Core/utils/waitForFormUpdate";
import { useCartStore } from "~/src/Order/stores/CartStore";

const { cart } = storeToRefs(useCartStore());
const { isLoggedIn } = useUserSession();

definePageMeta({
  middleware: ["checkout"],
});

const differentBillingAddress = ref(false);
const shippingAddressFormId = "shipping-address";
const billingAddressFormId = "billing-address";
const shippingAddressFormData = ref<AddressDTO>();
const billingAddressFormData = ref<AddressDTO>();

const submit = async () => {
  const shippingAddressForm = getNode(shippingAddressFormId);

  submitForm(shippingAddressFormId);

  if (differentBillingAddress.value) {
    const billingAddressForm = getNode(billingAddressFormId);

    submitForm(billingAddressFormId);

    await waitForFormUpdate();

    if (
      shippingAddressForm?.context?.state.valid &&
      billingAddressForm?.context?.state.valid
    ) {
      await doSubmit();
    }

    return;
  }

  await waitForFormUpdate();

  if (shippingAddressForm?.context?.state.valid) {
    billingAddressFormData.value = shippingAddressFormData.value;

    await doSubmit();
  }
};

const doSubmit = async () => {
  try {
    await $fetch("/api/checkout/addresses", {
      method: "POST",
      body: {
        shippingAddress: shippingAddressFormData.value,
        billingAddress: billingAddressFormData.value,
      },
    });

    cart.value!.shippingAddress = shippingAddressFormData.value;
    cart.value!.billingAddress = billingAddressFormData.value;
  } catch (error) {
    console.log(error);
  }
};
</script>
