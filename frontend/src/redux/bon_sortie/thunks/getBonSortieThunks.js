import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../apiBS/axiosClient";
import { normalizeBonSorties } from "../apiBS/bonSortieAdapter";

export const getBonSorties = createAsyncThunk(
  "bonSortie/getBonSorties",
  async (_, { rejectWithValue, getState }) => {
    try {
      const demandes = getState().demande.demandes || [];
      const response = await axiosClient.get("?endpoint=readBS");
      const bonSorties = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];

      return normalizeBonSorties(bonSorties, (bonSortie) => {
        const demande = demandes.find(
          (item) => item.id_demande === (bonSortie.id_demande ?? bonSortie.demandeId),
        );

        return demande
          ? {
              id_demande: demande.id_demande,
              id_materiel: demande.id_materiel,
              designation: demande.designation,
              quantite: demande.quantite,
            }
          : undefined;
      });
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Erreur serveur");
    }
  },
);
