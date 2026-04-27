import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../apistock/axiosClient";
import { normalizeStocks } from "../apistock/stockAdapter";

export const getStock = createAsyncThunk(
  "stock/getStock",
  async (_, { getState }) => {
    const response = await axiosClient.get("?endpoint=readS");
    const materiels = getState().materiel.materiels || [];

    return normalizeStocks(response.data.data || [], (stock) => {
      const id_materiel = stock.id_materiel ?? stock.materielId;
      const materiel = materiels.find(
        (item) => item.id_materiel === id_materiel,
      );

      return materiel
        ? {
            id_materiel: materiel.id_materiel,
            designation: materiel.designation,
          }
        : undefined;
    });
  },
);
