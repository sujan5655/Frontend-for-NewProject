import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../service/axiosPublic";
import type { ProductFilters, ProductResponse } from "./productTypes";

// createAsyncThunk<Response,Argument,Config>

// export const fetchProducts = createAsyncThunk<
//   ProductResponse,
//   ProductFilters,
//   { rejectValue: string }
// >("products/fetchProducts", async (filters, { rejectWithValue }) => {
//   try {
//     const { data } = await axios.get<ProductResponse>("/store/");

//     return data;
//   } catch (error) {
//     console.error(error);

//     return rejectWithValue("Failed to load products");
//   }
// });

export const fetchProducts = createAsyncThunk<
  ProductResponse,
  ProductFilters,
  { rejectValue: string }
>(
  "products/fetchProducts",

  async (filters = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();

      // Search
      if (filters.search) {
        params.append("search", filters.search);
      }

      // Maximum price
      if (filters.maxPrice !== undefined) {
        params.append("max_price", String(filters.maxPrice));
      }

      // Category
      const url = filters.category
        ? `/store/category/${filters.category}/`
        : `/store/`;

      const queryString = params.toString();

      const { data } = await axios.get<ProductResponse>(
        queryString ? `${url}?${queryString}` : url,
      );

      return data;
    } catch (error) {
      console.error(error);

      return rejectWithValue("Failed to load products");
    }
  },
);

import type { Product } from "./productTypes";

interface ProductDetailParams {
  categorySlug: string;
  productSlug: string;
}

export const fetchProductDetail = createAsyncThunk<
  Product,
  ProductDetailParams,
  { rejectValue: string }
>(
  "products/fetchProductDetail",
  async ({ categorySlug, productSlug }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<Product>(
        `/store/product/${categorySlug}/${productSlug}/`,
      );

      return data;
    } catch (error) {
      console.error(error);

      return rejectWithValue("Failed to load product");
    }
  },
);
