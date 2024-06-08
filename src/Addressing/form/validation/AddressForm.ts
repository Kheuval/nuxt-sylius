import { z } from "zod";
import type { Country } from "~/src/Addressing/types/Country";

export const createValidationSchema = (
  countries: Country[] | null,
  emailRequired = false,
) => {
  return z
    .object({
      email: emailRequired ? z.string().email() : z.string().email().optional(),
      firstName: z.string().min(2).max(255),
      lastName: z.string().min(2).max(255),
      company: z.string().optional(),
      street: z.string().min(2).max(255),
      countryCode: z.string(),
      provinceCode: z.string().min(2).optional(),
      provinceName: z.string().optional(),
      city: z.string().min(2).max(255),
      postcode: z.string().min(1).max(255),
      phoneNumber: z.string().optional(),
    })
    .refine(
      (data) => {
        if (!countries) {
          return true;
        }

        const country = countries.find(
          (country) => country.code === data.countryCode,
        );

        if (!country || !country.provinces?.length) {
          return true;
        }

        return !!country.provinces.find(
          (province) => province.code === data.provinceCode,
        );
      },
      { message: "Vous devez choisir un état", path: ["provinceCode"] },
    );
};

export type AddressDTO = z.infer<ReturnType<typeof createValidationSchema>>;
