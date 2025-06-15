import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import eduApi from "../../axios";
import { AxiosError } from "axios";

export const getSoalLiterasiByIdArtikel = createAsyncThunk(
  "getSoalLiterasiByIdArtikel",
  async (id, { rejectWithValue }) => {
    try {
      const res = await eduApi.get(`soal?id_artikel=${id}`);

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error);
      }

      return rejectWithValue("unknown error");
    }
  }
);
export const createSoalLiterasi = createAsyncThunk(
  "createSoalLiterasi",
  async (data, { rejectWithValue }) => {
    try {
      const res = await eduApi.post(`soal`, data);

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error);
      }

      return rejectWithValue("unknown error");
    }
  }
);
export const updateSoalLiterasi = createAsyncThunk(
  "updateSoalLiterasi",
  async (data, { rejectWithValue }) => {
    try {
      const res = await eduApi.patch(`soal/${data.id}`, data);

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error);
      }

      return rejectWithValue("unknown error");
    }
  }
);
export const deleteSoalLiterasi = createAsyncThunk(
  "deleteSoalLiterasi",
  async (id, { rejectWithValue }) => {
    try {
      const res = await eduApi.delete(`soal/${id}`);

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error);
      }

      return rejectWithValue("unknown error");
    }
  }
);

const soalLiterasiSlice = createSlice({
  name: "soalLiterasiSlice",
  initialState: {
    isLoading: false,
    data: [],
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSoalLiterasiByIdArtikel.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getSoalLiterasiByIdArtikel.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      })
      .addCase(getSoalLiterasiByIdArtikel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.error = "";
      })
      .addCase(createSoalLiterasi.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(createSoalLiterasi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createSoalLiterasi.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.data = action.payload.data;
        state.error = "";
      })
      .addCase(updateSoalLiterasi.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(updateSoalLiterasi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateSoalLiterasi.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.data = action.payload.data;
        state.error = "";
      })
      .addCase(deleteSoalLiterasi.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(deleteSoalLiterasi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteSoalLiterasi.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.data = action.payload.data;
        state.error = "";
      });
  },
});

export default soalLiterasiSlice.reducer;
