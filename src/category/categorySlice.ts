import { createSlice } from "@reduxjs/toolkit";
import type { CategoryState } from "./categoryTypes";
import { fetchCategories } from "./categoryThunk";

const initialState: CategoryState = {
  categories: [],
  status: "idle",
  error: null,
};
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeded";
        state.categories = action.payload;
      })

      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Failed to load categories";
      });
  },
});

export default categorySlice.reducer;
