import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  return prisma.sylius_product.findMany({
    select: {
      id: true,
      sylius_product_translation: {
        select: {
          name: true,
        },
        where: {
          locale: "fr_FR",
        },
      },
      sylius_product_image: {
        select: {
          path: true,
        },
      },
      sylius_product_variant: {
        take: 1,
        select: {
          sylius_channel_pricing: {
            select: {
              price: true,
            },
          },
        },
        where: {
          enabled: true,
        },
      },
    },
  });
});
