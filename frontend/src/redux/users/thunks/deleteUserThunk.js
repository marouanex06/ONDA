import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../apiusers/axiosClient";

export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (id_user, { rejectWithValue }) => {
    try {
      const response = await axiosClient.delete("?endpoint=supprimer", {
        data: { id_user },
      });

      if (!response.data?.success) {
        return rejectWithValue(
          response.data?.message || "Erreur suppression utilisateur",
        );
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Erreur suppression utilisateur",
      );
    }
  },
);
