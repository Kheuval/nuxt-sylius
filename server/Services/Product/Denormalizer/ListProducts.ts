import type { ListProduct } from "~/types/Product/ListProduct";
import type { ListProductsResult } from "~/server/Services/Product/Repository/ProductRepository";

export const denormalizeListProducts = (
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
