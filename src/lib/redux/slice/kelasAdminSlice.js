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
export const getDataKelasByIdSekolah = createAsyncThunk(
  "getDataKelasByIdSekolah",
  async (id, { rejectWithValue }) => {
    try {
      const res = await eduApi.get(`kelas?sekolah=${id}`);
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error);
      }
      return rejectWithValue("An unknown error occurred.");
    }
  }
);
export const addDataKelas = createAsyncThunk(
  "addDataKelas",
  async (data, { rejectWithValue }) => {
    try {
      const res = await eduApi.post(`kelas`, data);
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error);
      }
      return rejectWithValue("An unknown error occurred.");
    }
  }
);
export const updateDataKelas = createAsyncThunk(
  "updateDataKelas",
  async (data, { rejectWithValue }) => {
    try {
      const res = await eduApi.patch(`kelas/${data?.id}`, data);
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error);
      }
      return rejectWithValue("An unknown error occurred.");
    }
  }
);
export const deleteDataKelas = createAsyncThunk(
  "deleteDataKelas",
  async (data, { rejectWithValue }) => {
    try {
      const res = await eduApi.delete(`kelas/${data?.id}`);
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
      })
      .addCase(getDataKelasByIdSekolah.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDataKelasByIdSekolah.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(getDataKelasByIdSekolah.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(addDataKelas.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addDataKelas.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(addDataKelas.fulfilled, (state, action) => {
        // state.data = action.payload.data;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(updateDataKelas.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDataKelas.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(updateDataKelas.fulfilled, (state, action) => {
        // state.data = action.payload.data;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(deleteDataKelas.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDataKelas.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(deleteDataKelas.fulfilled, (state, action) => {
        // state.data = action.payload.data;
        state.isLoading = false;
        state.error = "";
      });
  },
});

export default kelasAdminSlice.reducer;
