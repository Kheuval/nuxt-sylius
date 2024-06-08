export interface Variant {
  productName: string;
  code: string;
  name?: string;
  price?: number;
}

interface Image {
  path: string;
}

export interface SingleProduct {
  name: string;
  description?: string;
  shortDescription?: string;
  variants?: Variant[];
  images?: Image[];
}
