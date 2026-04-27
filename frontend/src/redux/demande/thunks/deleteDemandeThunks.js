import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../apidemande/axiosClient";

export const deleteDemande = createAsyncThunk(
  "demandes/deleteDemande",
  async (id_demande, { rejectWithValue }) => {
    try {
      const response = await axiosClient.delete("?endpoint=deleteD", {
        data: { id_demande },
      });

      if (!response.data?.success) {
        return rejectWithValue(
          response.data?.message || "Erreur suppression",
        );
      }

      return id_demande;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Erreur suppression");
    }
  },
);
