import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../apimateriel/axiosClient";

export const deleteMateriel = createAsyncThunk(
  "materiels/deleteMateriel",
  async (id_materiel) => {
    const response = await axiosClient.delete("?endpoint=deleteM", {
      data: { id_materiel },
    });

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Erreur suppression");
    }

    return id_materiel;
  },
);
