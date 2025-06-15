import { AxiosError } from "axios";
import eduApi from "../../axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getArtikelDataAdmin = createAsyncThunk(
  "getArtikelDataAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const res = await eduApi.get("artikel");

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error);
      }

      return rejectWithValue("unknown error");
    }
  }
);

export const getArtikelById = createAsyncThunk(
  "getArtikelById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await eduApi.get(`artikel?id=${id}`);
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("Unknown error occurred");
    }
  }
);

export const createArtikel = createAsyncThunk(
  "createArtikel",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await eduApi.post("artikel", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("Unknown error occurred");
    }
  }
);
export const deleteArtikel = createAsyncThunk(
  "deleteArtikel",
  async (id, { rejectWithValue }) => {
    try {
      const res = await eduApi.delete(`artikel/${id}`);
      return { id, message: res.data.message };
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("Unknown error occurred");
    }
  }
);

export const updateArtikel = createAsyncThunk(
  "updateArtikel",
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("_method", "PATCH");
      formData.append("judul", data.judul);
      formData.append("deskripsi", data.deskripsi);
      formData.append("artikel_link", data.artikel_link);
      formData.append("type", data.type);

      // hanya append jika file gambar ada
      if (data.image instanceof File) {
        formData.append("gambar", data.image);
      }

      const res = await eduApi.post(`artikel/${data.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("Unknown error occurred");
    }
  }
);

const artikelAdminSlice = createSlice({
  name: "artikelAdminSlice",
  initialState: {
    isLoading: false,
    error: "",
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getArtikelDataAdmin.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getArtikelDataAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      })
      .addCase(getArtikelDataAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.error = "";
      })
      .addCase(createArtikel.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(createArtikel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload.data); // tambahkan artikel baru ke state
        state.error = "";
      })
      .addCase(createArtikel.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Gagal membuat artikel";
      })
      .addCase(getArtikelById.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getArtikelById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = [action.payload.data];
        state.error = "";
      })
      .addCase(getArtikelById.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message || "Gagal mengambil detail artikel";
      })
      .addCase(deleteArtikel.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(deleteArtikel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.data = state.data.filter((item) => item.id !== action.payload.id); // hapus dari state
      })
      .addCase(deleteArtikel.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Gagal menghapus artikel";
      })
      .addCase(updateArtikel.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(updateArtikel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";

        // Update artikel yang diedit di state
        const updatedArtikel = action.payload.data;
        state.data = state.data.map((item) =>
          item.id === updatedArtikel.id ? updatedArtikel : item
        );
      })
      .addCase(updateArtikel.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Gagal mengubah artikel";
      });
  },
});

export default artikelAdminSlice.reducer;
