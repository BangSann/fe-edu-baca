import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import eduApi from "../../axios";
import { AxiosError } from "axios";

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
export const addDataSekolah = createAsyncThunk(
  "addDataSekolah",
  async (data, { rejectWithValue }) => {
    try {
      const res = await eduApi.post("sekolah", data);

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error);
      }
      return rejectWithValue("An unknown error occurred.");
    }
  }
);
export const deleteDataSekolah = createAsyncThunk(
  "deleteDataSekolah",
  async (data, { rejectWithValue }) => {
    try {
      const res = await eduApi.delete(`sekolah/${data?.id}`);

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error);
      }
      return rejectWithValue("An unknown error occurred.");
    }
  }
);
export const updateDataSekolah = createAsyncThunk(
  "updateDataSekolah",
  async (data, { rejectWithValue }) => {
    try {
      const res = await eduApi.patch(`sekolah/${data?.id}`, data);

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
      })
      .addCase(addDataSekolah.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addDataSekolah.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(addDataSekolah.fulfilled, (state, action) => {
        // state.data = action.payload.data.data;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(deleteDataSekolah.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDataSekolah.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(deleteDataSekolah.fulfilled, (state, action) => {
        // state.data = action.payload.data.data;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(updateDataSekolah.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDataSekolah.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(updateDataSekolah.fulfilled, (state, action) => {
        // state.data = action.payload.data.data;
        state.isLoading = false;
        state.error = "";
      })
  },
});

export default sekolahAdminSlice.reducer;
