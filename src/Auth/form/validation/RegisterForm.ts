import { z } from "zod";

export const createValidationSchema = () => {
  return z
    .object({
      firstName: z.string().min(2),
      lastName: z.string().min(2),
      email: z.string().email(),
      passwordFirst: z.string().min(4),
      passwordSecond: z.string().min(4),
      subscribedToNewsletter: z.boolean().optional(),
    })
    .refine((data) => data.passwordFirst === data.passwordSecond, {
      message: "Les mots de passe ne sont pas identiques",
      path: ["passwordSecond"],
    });
};

export type RegisterDTO = z.infer<ReturnType<typeof createValidationSchema>>;
