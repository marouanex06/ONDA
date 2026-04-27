import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../apistock/axiosClient";
import { normalizeStock } from "../apistock/stockAdapter";

export const addStock = createAsyncThunk(
  "stock/addStock",
  async (stock, { getState }) => {
    const response = await axiosClient.post("?endpoint=createS", {
      id_materiel: Number(stock.id_materiel),
      qte_stock: Number(stock.qte_stock),
    });

    if (!response.data.success) throw new Error(response.data.message);

    const materiel = (getState().materiel.materiels || []).find(
      (item) => item.id_materiel === Number(stock.id_materiel),
    );

    return normalizeStock(response.data.data, {
      id_materiel: Number(stock.id_materiel),
      designation: materiel?.designation,
      qte_stock: Number(stock.qte_stock),
    });
  },
);
