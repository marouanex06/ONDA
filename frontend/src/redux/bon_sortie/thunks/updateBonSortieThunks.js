import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../apiBS/axiosClient";
import { normalizeBonSortie } from "../apiBS/bonSortieAdapter";

export const updateBonSortie = createAsyncThunk(
  "bonSortie/updateBonSortie",
  async (bonSortie, { rejectWithValue, getState }) => {
    try {
      const demande = (getState().demande.demandes || []).find(
        (item) => String(item.id_demande) === String(bonSortie.id_demande),
      );

      const response = await axiosClient.put("?endpoint=updateBS", {
        id_bs: bonSortie.id_bs,
        code_bs: bonSortie.code_bs,
        id_demande: Number(bonSortie.id_demande),
        date_sortie: bonSortie.date_sortie,
        nb_sortie: Number(bonSortie.nb_sortie),
      });

      if (!response.data?.success) {
        return rejectWithValue(response.data?.message || "Erreur mise a jour");
      }

      return normalizeBonSortie(response.data.data, {
        id_bs: bonSortie.id_bs,
        code_bs: bonSortie.code_bs,
        id_demande: Number(bonSortie.id_demande),
        id_materiel: demande?.id_materiel,
        designation: demande?.designation,
        quantite: demande?.quantite,
        nb_sortie: Number(bonSortie.nb_sortie),
        reste_livrer: bonSortie.reste_livrer,
        date_sortie: bonSortie.date_sortie,
      });
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Erreur serveur",
      );
    }
  },
);
