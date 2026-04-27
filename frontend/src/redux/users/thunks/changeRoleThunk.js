import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../apiusers/axiosClient";
import { normalizeUser } from "../apiusers/userAdapter";

export const changeRole = createAsyncThunk(
  "auth/changeRole",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put("?endpoint=change_role", {
        id_user: data.id_user,
        role: data.role,
      });

      if (!response.data?.success) {
        return rejectWithValue(
          response.data?.message || "Erreur changement de role",
        );
      }

      return {
        ...response.data,
        user: normalizeUser({
          id_user: data.id_user,
          role: data.role,
        }),
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Erreur changement de role",
      );
    }
  },
);
