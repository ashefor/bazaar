import { Product } from "./product.interface";

export interface OrderDelivery {
  address: string;
  city: string;
  delivery: number;
  delivery_type: string;
  first_name: string;
  last_name: string;
  phone: string;
  state: string;
  tax: number;
  total: number;
}

export interface CartItem {
  id: string,
  product: Product;
  quantity: number
}

export interface Order {
  items: CartItem[],
  shipping: OrderDelivery;
  createdAt: string;
  user: string;
  _id: string;
  updatedAt: string
}
