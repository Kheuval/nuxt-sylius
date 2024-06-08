import type { ListProduct } from "~/src/Product/types/ListProduct";
import type { ListProductsResult } from "~/src/Product/server/repository/ProductRepository";

export const normalizeListProducts = (
  products: ListProductsResult,
): ListProduct[] => {
  const denormalizedProducts = [] as ListProduct[];

  products.forEach((product) => {
    const denormalizedProduct = {} as ListProduct;

    denormalizedProduct.code = product.code;
    denormalizedProduct.name = product.sylius_product_translation[0].name;
    denormalizedProduct.slug = product.sylius_product_translation[0].slug;
    denormalizedProduct.price =
      product.sylius_product_variant[0].sylius_channel_pricing[0].price ??
      undefined;
    denormalizedProduct.imagePath = product.sylius_product_image[0]?.path;

    denormalizedProducts.push(denormalizedProduct);
  });

  return denormalizedProducts;
};
