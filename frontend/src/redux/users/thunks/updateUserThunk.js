import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../apiusers/axiosClient";
import { normalizeUser } from "../apiusers/userAdapter";

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (data, { rejectWithValue }) => {
    try {
      const fullname = data.fullname ?? data.full_name;
      const response = await axiosClient.put("?endpoint=modifier", {
        id_user: data.id_user,
        fullname,
        email: data.email,
        username: data.username,
        password: data.password,
      });

      if (!response.data?.success) {
        return rejectWithValue(
          response.data?.message || "Erreur mise a jour utilisateur",
        );
      }

      return {
        ...response.data,
        user: normalizeUser({
          ...data,
          full_name: fullname,
        }),
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Erreur mise a jour utilisateur",
      );
    }
  },
);
