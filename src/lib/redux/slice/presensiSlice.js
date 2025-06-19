import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import eduApi from "../../axios";

const API_URL = "presensi";
// GET by id / by kelas & tanggal / all
export const fetchPresensi = createAsyncThunk(
  "presensi/fetchPresensi",
  async (_, { rejectWithValue }) => {
    try {
      const response = await eduApi.get(API_URL);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const fetchPresensiTanggal = createAsyncThunk(
  "presensi/fetchPresensiTanggal",
  async ({ id_kelas, tanggal }, { rejectWithValue }) => {
    try {
      const response = await eduApi.get(
        `${API_URL}?id_kelas=${id_kelas}&&tanggal=${tanggal}`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const fetchPresensiByUser = createAsyncThunk(
  "presensi/fetchPresensiByUser",
  async ({ id_kelas, id_user }, { rejectWithValue }) => {
    try {
      const response = await eduApi.get(
        `${API_URL}?id_kelas=${id_kelas}&&id_user=${id_user}`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// POST create presensi
export const createPresensi = createAsyncThunk(
  "presensi/createPresensi",
  async (data, { rejectWithValue }) => {
    // console.log(data)
    try {
      const response = await eduApi.post(API_URL, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// PATCH/PUT update presensi
export const updatePresensi = createAsyncThunk(
  "presensi/updatePresensi",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await eduApi.put(`${API_URL}/${id}`, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// DELETE presensi
export const deletePresensi = createAsyncThunk(
  "presensi/deletePresensi",
  async (id, { rejectWithValue }) => {
    try {
      await eduApi.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const presensiSlice = createSlice({
  name: "presensi",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchPresensi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPresensi.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPresensi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch by id
      .addCase(fetchPresensiTanggal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPresensiTanggal.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [action.payload];
      })
      .addCase(fetchPresensiTanggal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createPresensi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPresensi.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(createPresensi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updatePresensi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePresensi.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.data[index] = action.payload;
      })
      .addCase(updatePresensi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deletePresensi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePresensi.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((p) => p.id !== action.payload);
      })
      .addCase(deletePresensi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch by user
      .addCase(fetchPresensiByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPresensiByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPresensiByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default presensiSlice.reducer;
