import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../apimateriel/axiosClient";
import { normalizeMateriels } from "../apimateriel/materielAdapter";

export const getMateriels = createAsyncThunk(
  "materiels/getMateriels",
  async (_, { getState }) => {
    const response = await axiosClient.get("?endpoint=readM");
    const categories = getState().categorie.fournitures || [];

    return normalizeMateriels(response.data.data || [], (materiel) => {
      const category = categories.find(
        (item) => item.nom_fourniture === materiel.category,
      );

      return category
        ? {
            id_fourniture: category.id_fourniture,
            nom_fourniture: category.nom_fourniture,
          }
        : undefined;
    });
  },
);
