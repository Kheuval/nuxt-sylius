import { useProductRepository } from "~/server/Services/Product/Repository/ProductRepository";

export default defineEventHandler(async () => {
  const { findLatest } = useProductRepository();

  return await findLatest();
});
