import { Prisma } from "@prisma/client";
import { denormalizeCountries } from "../normalizer/Country";
import { providePrismaClient } from "~/src/Core/prisma/ClientProvider";

const prisma = providePrismaClient();

const findAllQuery = async () => {
  return await prisma.sylius_country.findMany({
    where: {
      enabled: true,
    },
    select: {
      code: true,
      sylius_province: {
        select: {
          code: true,
          name: true,
        },
      },
    },
  });
};

export type AllCountriesResult = Prisma.PromiseReturnType<typeof findAllQuery>;

export const useCountryRepository = () => {
  const findAll = async () => denormalizeCountries(await findAllQuery());

  return { findAll };
};
