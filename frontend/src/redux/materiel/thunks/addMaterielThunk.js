import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../apimateriel/axiosClient";
import { normalizeMateriel } from "../apimateriel/materielAdapter";

export const addMateriel = createAsyncThunk(
  "materiels/addMateriel",
  async (materiel, { getState }) => {
    const categories = getState().categorie.fournitures || [];
    const selectedCategory = categories.find(
      (item) => String(item.id_fourniture) === String(materiel.id_fourniture),
    );

    const response = await axiosClient.post("?endpoint=createM", {
      designation: materiel.designation,
      id_fourniture: Number(materiel.id_fourniture),
    });

    if (!response.data.success) {
      throw new Error(response.data.message || "Erreur ajout materiel");
    }

    return normalizeMateriel(response.data.data, {
      id_fourniture: materiel.id_fourniture,
      nom_fourniture: selectedCategory?.nom_fourniture,
      designation: materiel.designation,
    });
  },
);
