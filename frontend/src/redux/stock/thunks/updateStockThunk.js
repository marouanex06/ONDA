import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../apistock/axiosClient";
import { normalizeStock } from "../apistock/stockAdapter";

export const updateStock = createAsyncThunk(
  "stock/updateStock",
  async (stock, { getState }) => {
    const response = await axiosClient.put("?endpoint=updateS", {
      id_stock: stock.id_stock,
      id_materiel: Number(stock.id_materiel),
      qte_stock: Number(stock.qte_stock),
    });

    if (!response.data.success) throw new Error(response.data.message);

    const materiel = (getState().materiel.materiels || []).find(
      (item) => item.id_materiel === Number(stock.id_materiel),
    );

    return normalizeStock(response.data.data, {
      id_stock: stock.id_stock,
      id_materiel: Number(stock.id_materiel),
      designation: materiel?.designation,
      qte_stock: Number(stock.qte_stock),
    });
  },
);
