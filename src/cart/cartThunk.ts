import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPrivate from "../service/axiosPrivate";
import type { CartResponse, AddToCartResponse, CartItem } from "./cartTypes";

// =========================
// FETCH CART
// =========================

export const fetchCart = createAsyncThunk<
  CartResponse,
  void,
  { rejectValue: string }
>("cart/fetchCart", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosPrivate.get<CartResponse>("/cart/");

    console.log("FETCH CART:", response.data);

    return response.data;
  } catch (error: any) {
    console.error("FETCH CART ERROR:", error);
    console.error("FETCH CART RESPONSE:", error.response?.data);

    return rejectWithValue(
      error.response?.data?.error || "Failed to load cart",
    );
  }
});

// =========================
// ADD TO CART
// =========================

export const addToCart = createAsyncThunk<
  AddToCartResponse,
  number,
  { rejectValue: string }
>("cart/addToCart", async (productId, { dispatch, rejectWithValue }) => {
  try {
    console.log("ADDING PRODUCT:", productId);

    const response = await axiosPrivate.post<AddToCartResponse>(
      `/cart/add/${productId}/`,
      {},
    );

    console.log("ADD TO CART STATUS:", response.status);

    console.log("ADD TO CART RESPONSE:", response.data);

    // Fetch the updated cart
    const cartResult = await dispatch(fetchCart());

    if (fetchCart.rejected.match(cartResult)) {
      console.error("CART REFRESH FAILED:", cartResult.payload);

      return rejectWithValue(
        cartResult.payload || "Product was added but cart could not be loaded",
      );
    }

    console.log("CART REFRESH SUCCESS:", cartResult.payload);

    return response.data;
  } catch (error: any) {
    console.error("ADD TO CART ERROR:", error);

    console.error("ADD TO CART RESPONSE:", error.response?.data);

    console.error("ADD TO CART STATUS:", error.response?.status);

    return rejectWithValue(
      error.response?.data?.error || "Failed to add product to cart",
    );
  }
});

// =========================
// UPDATE CART ITEM
// =========================

export const updateCartItem = createAsyncThunk<
  CartItem,
  {
    itemId: number;
    quantity: number;
  },
  { rejectValue: string }
>("cart/updateCartItem", async ({ itemId, quantity }, { rejectWithValue }) => {
  try {
    const response = await axiosPrivate.patch<CartItem>(
      `/cart/item/${itemId}/`,
      {
        quantity,
      },
    );

    return response.data;
  } catch (error: any) {
    console.error("UPDATE CART ITEM ERROR:", error);

    console.error("UPDATE CART ITEM RESPONSE:", error.response?.data);

    return rejectWithValue(
      error.response?.data?.error || "Failed to update cart",
    );
  }
});
