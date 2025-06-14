import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import eduApi from "../../axios";

export const getDataKelas = createAsyncThunk(
  "getDataKelas",
  async (_, { rejectWithValue }) => {
    try {
      const res = await eduApi.get("kelas");
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error);
      }
      return rejectWithValue("An unknown error occurred.");
    }
  }
);

const kelasAdminSlice = createSlice({
  name: "kelasAdminSlice",
  initialState: {
    isLoading: false,
    error: "",
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDataKelas.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDataKelas.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(getDataKelas.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.isLoading = false;
        state.error = "";
      });
  },
});

export default kelasAdminSlice.reducer;
