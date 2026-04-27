import { createAsyncThunk } from "@reduxjs/toolkit";

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  // Clear token and user from localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  return { success: true };
});
