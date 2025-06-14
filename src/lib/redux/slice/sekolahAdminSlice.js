import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import eduApi from "../../axios";

export const getDataSekolah = createAsyncThunk(
  "getDataSekolah",
  async (_, { rejectWithValue }) => {
    try {
      const res = await eduApi.get("sekolah");

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error);
      }
      return rejectWithValue("An unknown error occurred.");
    }
  }
);

const sekolahAdminSlice = createSlice({
  name: "sekolahAdminSlice",
  initialState: {
    isLoading: false,
    error: "",
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDataSekolah.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDataSekolah.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(getDataSekolah.fulfilled, (state, action) => {
        state.data = action.payload.data.data;
        state.isLoading = false;
        state.error = "";
      });
  },
});

export default sekolahAdminSlice.reducer;
