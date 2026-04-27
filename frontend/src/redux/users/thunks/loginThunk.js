import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../apiusers/axiosClient";
import { normalizeUser } from "../apiusers/userAdapter";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("?endpoint=login", {
        username: data.email || data.username,
        password: data.password,
      });

      if (!response.data?.success) {
        return rejectWithValue(
          response.data?.message || "Identifiants invalides.",
        );
      }

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      return {
        ...response.data,
        user: normalizeUser(response.data.user),
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Erreur login",
      );
    }
  },
);
