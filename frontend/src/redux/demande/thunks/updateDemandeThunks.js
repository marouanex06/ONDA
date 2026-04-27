import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../apidemande/axiosClient";
import { normalizeDemande } from "../apidemande/demandeAdapter";

export const updateDemande = createAsyncThunk(
  "demandes/updateDemande",
  async (data, { rejectWithValue, getState }) => {
    try {
      const materiel = (getState().materiel.materiels || []).find(
        (item) => item.id_materiel === Number(data.id_materiel),
      );

      const response = await axiosClient.put("?endpoint=updateD", {
        id_demande: data.id_demande,
        quantite: Number(data.quantite),
        statut: data.statut || "en_attente",
        date_reception: data.date_reception,
        observation: data.description || "",
      });

      if (!response.data?.success) {
        return rejectWithValue(response.data?.message || "Erreur serveur");
      }

      return normalizeDemande(response.data.data, {
        id_demande: data.id_demande,
        id_user: data.id_user,
        id_materiel: Number(data.id_materiel),
        designation: materiel?.designation,
        quantite: Number(data.quantite),
        reste_livrer: data.reste_livrer,
        statut: data.statut,
      });
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Erreur serveur");
    }
  },
);
