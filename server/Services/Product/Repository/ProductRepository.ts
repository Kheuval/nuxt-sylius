import { PrismaClient, Prisma } from "@prisma/client";
import { denormalizeListProducts } from "~/server/Services/Product/Denormalizer/ListProducts";
import { denormalizeSingleProduct } from "~/server/Services/Product/Denormalizer/SingleProduct";

const prisma = new PrismaClient();

const findLatestQuery = async (options?: {
  locale?: string;
  count?: number;
}) => {
  const locale = options?.locale || "fr";
  const count = options?.count || 3;

  return await prisma.sylius_product.findMany({
    where: {
      sylius_product_variant: { some: {} },
      enabled: true,
    },
    select: {
      code: true,
      sylius_product_translation: {
        select: {
          name: true,
          slug: true,
        },
        where: {
          locale,
        },
      },
      sylius_product_image: {
        take: 1,
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
    orderBy: { created_at: "desc" },
    take: count,
  });
};

export type ListProductsResult = Prisma.PromiseReturnType<
  typeof findLatestQuery
>;

const findOneBySlugQuery = async (options: {
  slug: string;
  locale?: string;
}) => {
  const slug = options.slug;
  const locale = options.locale || "fr";

  return await prisma.sylius_product_translation.findUnique({
    where: {
      locale_slug: {
        locale,
        slug,
      },
    },
    select: {
      name: true,
      description: true,
      short_description: true,
      sylius_product: {
        select: {
          sylius_product_variant: {
            select: {
              code: true,
              sylius_product_variant_translation: {
                where: {
                  locale,
                },
                select: {
                  name: true,
                },
              },
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
          sylius_product_image: {
            select: {
              path: true,
            },
          },
        },
      },
    },
  });
};

export type SingleProductResult = Prisma.PromiseReturnType<
  typeof findOneBySlugQuery
>;

export const useProductRepository = () => {
  const findLatest = async (options?: { locale?: string; count?: number }) =>
    denormalizeListProducts(await findLatestQuery(options));

  const findOneBySlug = async (options: { slug: string; locale?: string }) =>
    denormalizeSingleProduct(await findOneBySlugQuery(options));

  return { findLatest, findOneBySlug };
};
