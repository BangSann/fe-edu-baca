import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import eduApi from "../../axios";
import { AxiosError } from "axios";

export const getMateri = createAsyncThunk(
  "getMateri",
  async (_, { rejectWithValue }) => {
    try {
      const response = await eduApi.get("materi");
      if (response.data) {
        return response.data.data;
      }

      throw new Error("No data found");
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue("An error occurred while fetching data.");
    }
  }
);
export const getMateriById = createAsyncThunk(
  "getMateriById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await eduApi.get(`materi?id=${id}`);
      if (response.data) {
        return response.data.data;
      }

      throw new Error("No data found");
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue("An error occurred while fetching data.");
    }
  }
);

const materiSlice = createSlice({
  name: "materiSlcie",
  initialState: {
    isLoading: false,
    error: "",
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMateri.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
        state.data = [];
      })
      .addCase(getMateri.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        state.data = [];
      })
      .addCase(getMateri.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(getMateriById.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
        state.data = [];
      })
      .addCase(getMateriById.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        state.data = [];
      })
      .addCase(getMateriById.fulfilled, (state, action) => {
        state.data = [action.payload];
        state.isLoading = false;
        state.error = "";
      });
  },
});

export default materiSlice.reducer;
