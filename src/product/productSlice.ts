import { createSlice } from "@reduxjs/toolkit";

import type { ProductState } from "./productTypes";

import { fetchProductDetail, fetchProducts } from "./productThunk";

const initialState: ProductState = {
  products: [],
  productCount: 0,
  status: "idle",
  selectedProduct: null,
  detailStatus: "idle",
  detailError: null,
  error: null,
  productsLoaded: false,
  filters: {
    search: "",
    maxPrice: 5000,
    category: undefined,
  },
};

const productSlice = createSlice({
  name: "products",

  initialState,

  reducers: {
    setSearch: (state, action) => {
      state.filters.search = action.payload;
    },

    setMaxPrice: (state, action) => {
      state.filters.maxPrice = action.payload;
    },

    setCategory: (state, action) => {
      state.filters.category = action.payload;
    },

    clearFilters: (state) => {
      state.filters.search = "";
      state.filters.maxPrice = 5000;
      state.filters.category = undefined;
    },
  },

  extraReducers: (builder) => {
    builder

      // LOADING
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      // SUCCESS
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.products = action.payload.products;

        state.productCount = action.payload.product_count;

        state.error = null;
        state.productsLoaded = true;
      })

      // FAILED
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";

        state.error = action.payload ?? "Failed to load products";
      })

      .addCase(fetchProductDetail.pending, (state) => {
        state.detailStatus = "loading";
        state.detailError = null;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.detailStatus = "succeeded";
        state.selectedProduct = action.payload;
        state.detailError = null;
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.detailStatus = "failed";
        state.detailError = action.payload ?? "Failed to load product";
      });
  },
});
export const { setSearch, setMaxPrice, setCategory, clearFilters } =
  productSlice.actions;

export default productSlice.reducer;
