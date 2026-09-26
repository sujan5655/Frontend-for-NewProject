import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  type RegisterResponse,
  type LoginResponse,
  type RegisterCredentials,
  type LoginCredentials,
} from "./authTypes";
import axiosInstance from "../service/axiosPublic";
import axios from "axios";

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  { rejectValue: string }
>("auth/login", async (credentials: LoginCredentials, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post<LoginResponse>(
      "/auth/login/",
      credentials,
    );
    return data;
  } catch (error) {
    return rejectWithValue("Login Failed");
  }
});

export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterCredentials,
  { rejectValue: string }
>(
  "auth/register",
  async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post<RegisterResponse>(
        "/auth/register/",
        credentials,
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data;
        if (data?.first_name) {
          return rejectWithValue(data.first_name[0]);
        }

        if (data?.last_name) {
          return rejectWithValue(data.last_name[0]);
        }
        if (data?.email) {
          return rejectWithValue(data.email[0]);
        }
        if (data?.password) {
          return rejectWithValue(data.password[0]);
        }
        if (data?.detail) {
          return rejectWithValue(data.detail);
        }
        return rejectWithValue("Registration failed");
      }
      return rejectWithValue("Something went wrong");
    }
  },
);
