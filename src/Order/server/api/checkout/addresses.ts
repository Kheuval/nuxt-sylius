import {
  type AddressDTO,
  createValidationSchema,
} from "~/src/Addressing/form/validation/AddressForm";

export default defineEventHandler(async (event) => {
  assertMethod(event, "POST");

  const {
    shippingAddress,
    billingAddress,
  }: { shippingAddress: AddressDTO; billingAddress: AddressDTO } =
    await readBody(event);

  const countries = await $fetch("/api/country");

  // Check if a user is logged in
  const validationSchema = createValidationSchema(countries /*, !user */);

  try {
    validationSchema.parse(shippingAddress);
  } catch {
    throw createError({
      statusCode: 400,
    });
  }

  try {
    validationSchema.parse(billingAddress);
  } catch {
    throw createError({
      statusCode: 400,
    });
  }

  const config = useRuntimeConfig();
  const cartToken = getCookie(event, "cartToken");

  const body: {
    shippingAddress: AddressDTO;
    billingAddress: AddressDTO;
    email?: string;
  } = {
    shippingAddress,
    billingAddress,
  };

  if (shippingAddress.email) {
    body.email = shippingAddress.email;
  }

  await $fetch(`orders/${cartToken}`, {
    baseURL: config.public.syliusApiUrl,
    method: "PUT",
    body,
  });
});
