import { useSessionManager } from "~/src/Auth/server/services/SessionManager";
import {
  type RegisterDTO,
  createValidationSchema,
} from "~/src/Auth/form/validation/RegisterForm";

export default defineEventHandler(async (event) => {
  const { getSession } = useSessionManager();

  const session = await getSession(event);

  if (null !== session) {
    setResponseStatus(event, 200);

    return;
  }

  const registerForm: RegisterDTO = await readBody(event);
  const validationSchema = createValidationSchema();

  try {
    validationSchema.parse(registerForm);
  } catch {
    throw createError({
      statusCode: 400,
    });
  }

  try {
    const registerFormBody = {
      firstName: registerForm.firstName,
      lastName: registerForm.lastName,
      email: registerForm.email,
      password: registerForm.passwordFirst,
      subscribedToNewsletter: registerForm.subscribedToNewsletter,
    };

    await apiFetch()("customers", {
      method: "POST",
      body: registerFormBody,
    });

    setResponseStatus(event, 201);
  } catch (error: any) {
    if (error.status === 422) {
      throw createError({
        statusCode: 422,
        data: {
          errors: [
            { node: "email", message: "auth.register.email_already_in_use" },
          ],
        },
      });
    }
  }
});
