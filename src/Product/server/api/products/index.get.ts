import { useProductRepository } from "~/src/Product/server/repository/ProductRepository";

export default defineEventHandler(async (event) => {
  const { findLatest } = useProductRepository();

  return await findLatest({ locale: event.context.locale });
});
