import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import eduApi from "../../axios";

export const getBacaan = createAsyncThunk(
  "bacaan/getBacaan",
  async (_, { rejectWithValue }) => {
    try {
      const res = await eduApi.get("bank-bacaan");
      if (res.data) {
        return res.data.data;
      }

      throw new Error("failed to get data");
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error);
      }
      return rejectWithValue("unknown error");
    }
  }
);

export const getBacaanById = createAsyncThunk(
  "bacaan/getBacaanById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await eduApi.get(`bank-bacaan?id=${id}`);
      if (res.data) {
        return res.data.data;
      }

      throw new Error("failed to get data");
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error);
      }
      return rejectWithValue("unknown error");
    }
  }
);

export const deleteBacaan = createAsyncThunk(
  "bacaan/deleteBacaan",
  async (data, { rejectWithValue }) => {
    try {
      const res = await eduApi.delete(`bank-bacaan/${data?.id}`);
      if (res.data) {
        return data;
      }

      throw new Error("failed to get data");
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error);
      }
      return rejectWithValue("unknown error");
    }
  }
);

export const addBacaan = createAsyncThunk(
  "bacaan/addBacaan",
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("judul", data?.judul);
      formData.append("cover", data?.cover); // perbaikan
      formData.append("pdf", data?.pdf); // perbaikan

      const res = await eduApi.post("bank-bacaan", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data) {
        return res.data.data;
      }

      throw new Error("failed to add data");
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("unknown error");
    }
  }
);

const bacaanSlice = createSlice({
  name: "bacaanSlice",
  initialState: {
    isLoading: false,
    error: "",
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBacaan.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getBacaan.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(getBacaan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = "";
      })
      .addCase(getBacaanById.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getBacaanById.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(getBacaanById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = [action.payload];
        state.error = "";
      })
      .addCase(addBacaan.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addBacaan.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(addBacaan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload);
        state.error = "";
      })
      .addCase(deleteBacaan.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteBacaan.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteBacaan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.filter(
          (item) => item?.id != action?.payload?.id
        );
        state.error = "";
      });
  },
});

export default bacaanSlice.reducer;
