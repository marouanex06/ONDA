import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../apiusers/axiosClient";
import { normalizeUser } from "../apiusers/userAdapter";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("?endpoint=register", {
        fullname: data.fullname ?? data.full_name,
        username: data.username,
        email: data.email,
        password: data.password,
        role: data.role,
      });

      if (!response.data?.success) {
        return rejectWithValue(
          response.data?.message || "Erreur lors de l'inscription.",
        );
      }

      return {
        ...response.data,
        user: normalizeUser({
          full_name: data.fullname ?? data.full_name,
          username: data.username,
          email: data.email,
          role: data.role,
        }),
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Erreur lors de l'inscription.",
      );
    }
  },
);
