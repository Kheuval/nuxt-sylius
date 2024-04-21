import { useProductRepository } from "~/server/Services/Product/Repository/ProductRepository";

export default defineEventHandler(async (event) => {
  assertMethod(event, "GET");

  const { slug } = getRouterParams(event);

  if (!slug) {
    throw createError({
      statusCode: 404,
    });
  }

  const { findOneBySlug } = useProductRepository();
  const product = await findOneBySlug({ slug });

  if (null === product) {
    throw createError({
      statusCode: 404,
    });
  }

  return product;
});
