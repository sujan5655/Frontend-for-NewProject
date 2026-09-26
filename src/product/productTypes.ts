export interface Product {
  id: number;
  product_name: string;
  slug: string;
  product_description: string;
  price: number;
  images: string;
  image_url: string | null;
  stock: number;
  is_available: boolean;
  category: number;
  category_name: string;
  category_slug: string;
  created_date: string;
  modified_date: string;
}
export interface ProductResponse {
  product_count: number;
  products: Product[];
}

export interface ProductState {
  products: Product[];
  productCount: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  selectedProduct: Product | null;
  detailStatus: "idle" | "loading" | "succeeded" | "failed";
  detailError: string | null;
  productsLoaded: boolean;

  // Remember HomePage filters
  filters: ProductFilters;
}

export interface ProductFilters {
  search?: string;
  maxPrice?: number;
  category?: string;
}
