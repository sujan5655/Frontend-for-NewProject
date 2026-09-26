import { createSlice } from "@reduxjs/toolkit";

import type { CartState } from "./cartTypes";

import { fetchCart, addToCart, updateCartItem } from "./cartThunk";

const initialState: CartState = {
  cart: null,

  cartItems: [],

  total: 0,

  quantity: 0,

  status: "idle",

  error: null,

  addStatus: "idle",

  addError: null,
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    // =========================
    // FETCH CART
    // =========================

    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.cart = action.payload.cart;

        state.cartItems = action.payload.cart_items;

        state.total = action.payload.total;

        state.quantity = action.payload.quantity;

        state.error = null;
      })

      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";

        state.error = action.payload ?? "Failed to load cart";
      });

    // =========================
    // ADD TO CART
    // =========================

    builder
      .addCase(addToCart.pending, (state) => {
        state.addStatus = "loading";

        state.addError = null;
      })

      .addCase(addToCart.fulfilled, (state) => {
        state.addStatus = "succeeded";

        state.addError = null;
      })

      .addCase(addToCart.rejected, (state, action) => {
        state.addStatus = "failed";

        state.addError = action.payload ?? "Failed to add product to cart";
      })

      .addCase(updateCartItem.pending, (state) => {
        state.error = null;
      })

      .addCase(updateCartItem.fulfilled, (state, action) => {
        const updatedItem = action.payload;

        const index = state.cartItems.findIndex(
          (item) => item.id === updatedItem.id,
        );

        if (index !== -1) {
          state.cartItems[index] = updatedItem;
        }

        // Recalculate total quantity
        state.quantity = state.cartItems.reduce(
          (sum, item) => sum + item.quantity,
          0,
        );

        // Recalculate total price
        state.total = state.cartItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0,
        );
      })

      .addCase(updateCartItem.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to update cart";
      });
  },
});

export default cartSlice.reducer;
