import {
  createValidationSchema,
  type LoginDTO,
} from "~/src/Auth/form/validation/LoginForm";
import type { AuthResponse } from "~/src/Auth/types/TokenInterface";
import { useSessionManager } from "~/src/Auth/server/services/SessionManager";

export default defineEventHandler(async (event) => {
  const { createSession, getSession } = useSessionManager();

  const session = await getSession(event);

  if (null !== session) {
    setResponseStatus(event, 200);

    return;
  }

  const {
    email,
    password,
    rememberMe = false,
  }: { email: string; password: string; rememberMe?: boolean } = await readBody(
    event,
  );

  const loginForm: LoginDTO = { email, password };
  const validationSchema = createValidationSchema();

  try {
    validationSchema.parse(loginForm);
  } catch {
    throw createError({
      statusCode: 400,
    });
  }

  try {
    const response = await apiFetch()<AuthResponse>("authentication-token", {
      method: "POST",
      body: loginForm,
    });

    await createSession(response, rememberMe, event);

    setResponseStatus(event, 201);
  } catch (error: any) {
    if (error.status === 401) {
      throw createError({
        statusCode: 401,
        data: {
          errors: [
            { node: "login-form", message: "auth.login.invalid_credentials" },
          ],
        },
      });
    }
  }
});
