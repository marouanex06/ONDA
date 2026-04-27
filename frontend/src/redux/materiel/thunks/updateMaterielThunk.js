import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../apimateriel/axiosClient";
import { normalizeMateriel } from "../apimateriel/materielAdapter";

export const updateMateriel = createAsyncThunk(
  "materiels/updateMateriel",
  async (materiel, { getState }) => {
    const categories = getState().categorie.fournitures || [];
    const selectedCategory = categories.find(
      (item) => String(item.id_fourniture) === String(materiel.id_fourniture),
    );

    const response = await axiosClient.put("?endpoint=updateM", {
      id_materiel: materiel.id_materiel,
      designation: materiel.designation,
      id_fourniture: Number(materiel.id_fourniture),
    });

    if (!response.data.success) {
      throw new Error(response.data.message || "Erreur modification materiel");
    }

    return normalizeMateriel(response.data.data, {
      id_materiel: materiel.id_materiel,
      id_fourniture: materiel.id_fourniture,
      nom_fourniture: selectedCategory?.nom_fourniture,
      designation: materiel.designation,
    });
  },
);
