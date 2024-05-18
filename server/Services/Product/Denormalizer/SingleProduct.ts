import type { SingleProduct } from "~/types/Product/SingleProduct";
import type { SingleProductResult } from "~/server/Services/Product/Repository/ProductRepository";

export const denormalizeSingleProduct = (
  product: SingleProductResult,
): SingleProduct | null => {
  if (null === product) {
    return null;
  }

  const denormalizedProduct = {} as SingleProduct;

  denormalizedProduct.name = product.name;
  denormalizedProduct.description = product.description ?? undefined;
  denormalizedProduct.shortDescription = product.short_description ?? undefined;

  if (!product.sylius_product.sylius_product_image) {
    denormalizedProduct.images = undefined;
  } else {
    denormalizedProduct.images =
      product.sylius_product.sylius_product_image.map(
        (image: any) => image.path,
      );
  }

  if (!product.sylius_product.sylius_product_variant) {
    denormalizedProduct.variants = undefined;
  } else {
    denormalizedProduct.variants =
      product.sylius_product.sylius_product_variant.map((variant: any) => ({
        productName: product.name,
        code: variant.code,
        name: variant.sylius_product_variant_translation[0]?.name ?? undefined,
        price: variant.sylius_channel_pricing[0]?.price ?? undefined,
      }));
  }

  return denormalizedProduct;
};
