import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import eduApi from "../../axios";

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
      });
  },
});

export default nilaiLiterasiSlice.reducer;
