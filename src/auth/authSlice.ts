import { createSlice } from "@reduxjs/toolkit";
import {
  clearAuthStorage,
  getStoredAccessToken,
  getStoredRefreshToken,
  getStoredUser,
} from "../service/tokenService";
import type { AuthState } from "./authTypes";
import { loginUser, registerUser } from "./authThunk";

const initialState: AuthState = {
  user: getStoredUser(),
  accessToken: getStoredAccessToken(),
  refreshToken: getStoredRefreshToken(),
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.status = "idle";
      state.error = null;
      clearAuthStorage();
    },
    clearAuthError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = "succeded";
      state.user = action.payload.user;
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload ?? "Login Failed";
    });

    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "succeded";
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Registration Failed.Please try again";
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
