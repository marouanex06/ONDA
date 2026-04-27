import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../apidemande/axiosClient";
import { normalizeDemandes } from "../apidemande/demandeAdapter";

export const getDemandes = createAsyncThunk(
  "demandes/getDemandes",
  async (_, { rejectWithValue, getState }) => {
    try {
      const response = await axiosClient.get("?endpoint=readD");
      const materiels = getState().materiel.materiels || [];

      return normalizeDemandes(response.data.data || [], (demande) => {
        const id_materiel = demande.id_materiel ?? demande.materielId;
        const materiel = materiels.find((item) => item.id_materiel === id_materiel);

        return materiel
          ? {
              id_materiel: materiel.id_materiel,
              designation: materiel.designation,
            }
          : undefined;
      });
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Erreur serveur");
    }
  },
);
