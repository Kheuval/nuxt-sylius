import { useProductRepository } from "~/src/Product/server/repository/ProductRepository";

export default defineEventHandler(async (event) => {
  const { slug } = getRouterParams(event);

  if (!slug) {
    throw createError({
      statusCode: 404,
    });
  }

  const { findOneBySlug } = useProductRepository();
  const product = await findOneBySlug({ slug, locale: event.context.locale });

  if (null === product) {
    throw createError({
      statusCode: 404,
    });
  }

  return product;
});
