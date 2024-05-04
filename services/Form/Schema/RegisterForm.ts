import { z } from "zod";
import type { FormType } from "~/types/Form";

export const schema: FormType = {
  name: "register-form",
  $formkit: "form",
  children: [
    {
      $el: "div",
      attrs: {
        class: "flex gap-4",
      },
      children: [
        {
          $formkit: "text",
          label: "Prénom",
          name: "firstName",
          validation: "required|length:2",
        },
        {
          $formkit: "text",
          label: "Nom",
          name: "lastName",
          validation: "required|length:2",
        },
      ],
    },
    {
      $formkit: "email",
      label: "Courriel",
      name: "email",
      validation: "required|email",
    },
    {
      $formkit: "tel",
      label: "Téléphone",
      name: "phoneNumber",
    },
    {
      $formkit: "checkbox",
      label: "S'abonner à la newsletter",
      name: "newsletter",
    },
    {
      $formkit: "password",
      label: "Mot de passe",
      name: "passwordFirst",
      validation: "required|length:4",
    },
    {
      $formkit: "password",
      label: "Vérification",
      name: "passwordSecond",
      validation: "required|length:4|confirm:passwordFirst",
    },
  ],
};

export const validationSchema = z
  .object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    passwordFirst: z.string().min(4),
    passwordSecond: z.string().min(4),
    newsletter: z.boolean(),
    phoneNumber: z.string(),
  })
  .refine((data) => data.passwordFirst === data.passwordSecond, {
    message: "Passwords don't match",
    path: ["passwordSecond"],
  });

export type RegisterDTO = z.input<typeof validationSchema>;
