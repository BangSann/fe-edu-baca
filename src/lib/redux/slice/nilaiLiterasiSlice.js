import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import eduApi from "../../axios";
import { AxiosError } from "axios";

export const getnilaiLiterasiByIdArtikel = createAsyncThunk(
  "getnilaiLiterasiByIdArtikel",
  async (id, { rejectWithValue }) => {
    try {
      const res = await eduApi.get(`nilai?id_artikel=${id}`);

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error);
      }

      return rejectWithValue("unknown error");
    }
  }
);
export const deleteNilaiLiterasi = createAsyncThunk(
  "deleteNilaiLiterasi",
  async (id, { rejectWithValue }) => {
    try {
      const res = await eduApi.delete(`nilai/${id}`);

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error);
      }

      return rejectWithValue("unknown error");
    }
  }
);
export const uploadNilaiLiterasi = createAsyncThunk(
  "uploadNilaiLiterasi",
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("nilai", data.nilai);
      formData.append("id_user", data.id_user);
      formData.append("id_artikel", data.id_artikel);

      const res = await eduApi.post(`nilai`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error);
      }

      return rejectWithValue("unknown error");
    }
  }
);
export const getNilaiLiterasiByIdUsersIdArtikel = createAsyncThunk(
  "getNilaiLiterasiByIdUsersIdArtikel",
  async ({ id_user, id_artikel }, { rejectWithValue }) => {
    try {
      const res = await eduApi.get(
        `nilai?id_user=${id_user}&&id_artikel=${id_artikel}`
      );

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error);
      }

      return rejectWithValue("unknown error");
    }
  }
);

const nilaiLiterasiSlice = createSlice({
  name: "nilaiLiterasiSlice",
  initialState: {
    isLoading: false,
    data: [],
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getnilaiLiterasiByIdArtikel.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getnilaiLiterasiByIdArtikel.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      })
      .addCase(getnilaiLiterasiByIdArtikel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.error = "";
      })
      .addCase(deleteNilaiLiterasi.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(deleteNilaiLiterasi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      })
      .addCase(deleteNilaiLiterasi.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.data = action.payload.data;
        state.error = "";
      })
      .addCase(uploadNilaiLiterasi.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(uploadNilaiLiterasi.rejected, (state, action) => {
        state.isLoading = false;
        // state.error = action.payload.error;
      })
      .addCase(uploadNilaiLiterasi.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.data = action.payload.data;
        state.error = "";
      })
      .addCase(getNilaiLiterasiByIdUsersIdArtikel.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getNilaiLiterasiByIdUsersIdArtikel.rejected, (state, action) => {
        state.isLoading = false;
        // state.error = action.payload.error;
        state.data = undefined
      })
      .addCase(
        getNilaiLiterasiByIdUsersIdArtikel.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.data = action.payload.data;
          state.error = "";
        }
      );
  },
});

export default nilaiLiterasiSlice.reducer;
