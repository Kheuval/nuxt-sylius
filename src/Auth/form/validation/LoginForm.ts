import { z } from "zod";

export const createValidationSchema = () => {
  return z.object({
    email: z.string(),
    password: z.string(),
    rememberMe: z.boolean().optional(),
  });
};

export type LoginDTO = z.infer<ReturnType<typeof createValidationSchema>>;
