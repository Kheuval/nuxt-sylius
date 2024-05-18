import type { AddressDTO } from "~/form/Validation/AddressForm";

export interface Item {
  id?: number;
  productName: string;
  variantName?: string;
  variantCode: string;
  quantity: number;
  price?: number;
}

export interface Cart {
  orderTotal: number;
  orderItemTotal: number;
  items: Item[];
  shippingAddress?: AddressDTO;
  billingAddress?: AddressDTO;
  tokenValue?: string;
}
