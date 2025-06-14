import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import eduApi from "../../axios";

export const signIn = createAsyncThunk(
  "signIn",
  async (data, { rejectWithValue }) => {
    try {
      const res = await eduApi.post("auth/sign-in", data);

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data?.message || "Request failed"
        );
      }
      return rejectWithValue("An unknown error occurred.");
    }
  }
);
export const signOut = createAsyncThunk(
  "signOut",
  async (_, { rejectWithValue }) => {
    try {
      const res = await eduApi.get("auth/sign-out");

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data?.message || "Request failed"
        );
      }
      return rejectWithValue("An unknown error occurred.");
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await eduApi.get("auth/profile");

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data?.message || "Request failed"
        );
      }
      return rejectWithValue("An unknown error occurred.");
    }
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    isLoading: false,
    error: "",
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = "";
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload || action.error?.message || "Unknown error";
      })
      .addCase(signOut.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(signOut.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = "";
      })
      .addCase(signOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload || action.error?.message || "Unknown error";
      })
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.error = "";
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload || action.error?.message || "Unknown error";
      });
  },
});

export default authSlice.reducer;
