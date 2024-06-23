import {
  type AddressDTO,
  createValidationSchema,
} from "~/src/Addressing/form/validation/AddressForm";
import { useSessionManager } from "~/src/Auth/server/services/SessionManager";

export default defineEventHandler(async (event) => {
  const {
    shippingAddress,
    billingAddress,
  }: { shippingAddress: AddressDTO; billingAddress: AddressDTO } =
    await readBody(event);

  const { getSession } = useSessionManager();

  const session = await getSession(event);
  const countries = await apiFetch(session)("/api/country");

  const validationSchema = createValidationSchema(countries, !session);

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

  await apiFetch(session)(`orders/${cartToken}`, {
    method: "PUT",
    body,
  });
});
