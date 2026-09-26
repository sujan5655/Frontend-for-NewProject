import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../service/axiosPublic";
import type { Category } from "./categoryTypes";

export const fetchCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>("categories/fetchCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<Category[]>("/store/categories/");

    console.log("CATEGORY API RESPONSE:", response.data);
    console.log("IS ARRAY:", Array.isArray(response.data));

    return response.data;
  } catch (error) {
    console.error("CATEGORY ERROR:", error);

    return rejectWithValue("Failed to load categories");
  }
});
