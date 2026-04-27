import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../apidemande/axiosClient";
import { normalizeDemande } from "../apidemande/demandeAdapter";

export const createDemande = createAsyncThunk(
  "demandes/createDemande",
  async (data, { rejectWithValue, getState }) => {
    try {
      const materiel = (getState().materiel.materiels || []).find(
        (item) => item.id_materiel === Number(data.id_materiel),
      );

      const response = await axiosClient.post("?endpoint=createD", {
        id_user: Number(data.id_user),
        id_materiel: Number(data.id_materiel),
        quantite: Number(data.quantite),
        observation: data.description || "",
        solde: Number(data.solde || 0),
      });

      if (!response.data?.success) {
        return rejectWithValue(response.data?.message || "Erreur serveur");
      }

      return normalizeDemande(response.data.data, {
        id_user: Number(data.id_user),
        id_materiel: Number(data.id_materiel),
        designation: materiel?.designation,
        quantite: Number(data.quantite),
        reste_livrer: data.reste_livrer,
      });
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Erreur serveur");
    }
  },
);
