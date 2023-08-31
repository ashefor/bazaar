export interface Product {
  _id: string;
  product_name: string;
  product_slug: string;
  product_description: string;
  product_price: number;
  product_size: string;
  product_features: string[];
  product_color: string;
  main_image: string;
  product_images: string[];
  product_category: string;
}

export interface ProductsData {
  products: Product[];
  currentPage: number;
  message: string;
  totalItems: number;
  totalPages: number;
  pageSize: number;
  pageStart: number;
  pageLimit: number;
}
