import { useProductRepository } from "~/server/Services/Product/Repository/ProductRepository";

export default defineEventHandler(async (event) => {
  assertMethod(event, "GET");

  const { findLatest } = useProductRepository();

  return await findLatest();
});
