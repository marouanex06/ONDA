import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../apiusers/axiosClient";
import { normalizeUsers } from "../apiusers/userAdapter";

export const getUsers = createAsyncThunk(
  "auth/getUsers",
  async () => {
    const response = await axiosClient.get("?endpoint=toutUtilisateur");

    return normalizeUsers(
      Array.isArray(response.data) ? response.data : response.data?.data || [],
    );
  },
);
