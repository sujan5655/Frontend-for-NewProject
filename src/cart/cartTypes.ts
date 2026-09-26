export interface CartProduct {
  id: number;
  product_name: string;
  price: number;
  image_url: string | null;
}

export interface CartItem {
  id: number;
  product: CartProduct;
  quantity: number;
  is_active: boolean;
}

export interface Cart {
  id: number;
  cart_id: string;
}

export interface CartResponse {
  cart: Cart | null;
  cart_items: CartItem[];
  total: number;
  quantity: number;
}

export interface AddToCartResponse {
  message: string;
  cart_item: CartItem;
}

export interface CartState {
  cart: Cart | null;
  cartItems: CartItem[];
  total: number;
  quantity: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  addStatus: "idle" | "loading" | "succeeded" | "failed";
  addError: string | null;
}
