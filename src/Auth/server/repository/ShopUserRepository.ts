import type { Prisma } from "@prisma/client";
import { providePrismaClient } from "~/src/Core/prisma/ClientProvider";

const prisma = providePrismaClient();

const findOneByCustomerIdQuery = async (id: number) => {
  return await prisma.sylius_shop_user.findUnique({
    where: {
      customer_id: id,
    },
    select: {
      id: true,
      username: true,
      enabled: true,
    },
  });
};

export type ShopUserResult = Prisma.PromiseReturnType<
  typeof findOneByCustomerIdQuery
>;

export const useShopUserRepository = () => {
  const findOneByCustomerId = async (id: number) =>
    await findOneByCustomerIdQuery(id);

  return { findOneByCustomerId };
};
