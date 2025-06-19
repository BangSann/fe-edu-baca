import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import eduApi from "../../axios";

export const getDashboard = createAsyncThunk(
  "getDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const res = await eduApi.get("dashboard");
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error);
      }

      return rejectWithValue("unknown error");
    }
  }
);

const dahsboardSlice = createSlice({
  name: "dahsboardSlice",
  initialState: {
    isLoading: false,
    error: "",
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboard.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getDashboard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getDashboard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.data = action.payload.message;
      });
  },
});

export default dahsboardSlice.reducer;
