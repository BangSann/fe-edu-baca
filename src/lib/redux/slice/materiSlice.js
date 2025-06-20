import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import eduApi from "../../axios";
import { AxiosError } from "axios";

export const getMateri = createAsyncThunk(
  "getMateri",
  async (_, { rejectWithValue }) => {
    try {
      const response = await eduApi.get("materi");
      if (response.data) {
        return response.data.data;
      }

      throw new Error("No data found");
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue("An error occurred while fetching data.");
    }
  }
);
export const getMateriById = createAsyncThunk(
  "getMateriById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await eduApi.get(`materi?id=${id}`);
      if (response.data) {
        return response.data.data;
      }

      throw new Error("No data found");
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue("An error occurred while fetching data.");
    }
  }
);
export const hapusMateri = createAsyncThunk(
  "hapusMateri",
  async (data, { rejectWithValue }) => {
    try {
      const response = await eduApi.delete(`materi/${data?.id}`);
      if (response.data) {
        return data;
      }

      throw new Error("No data found");
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue("An error occurred while fetching data.");
    }
  }
);
export const createMateri = createAsyncThunk(
  "createMateri",
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("judul", data.judul);
      formData.append("cover", data.cover);
      formData.append("pdf", data.pdf);
      const response = await eduApi.post(`materi`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        return response.data.data;
      }

      throw new Error("No data found");
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error);
      }

      return rejectWithValue("An error occurred while fetching data.");
    }
  }
);

const materiSlice = createSlice({
  name: "materiSlcie",
  initialState: {
    isLoading: false,
    error: "",
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMateri.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
        state.data = [];
      })
      .addCase(getMateri.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        state.data = [];
      })
      .addCase(getMateri.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(getMateriById.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
        state.data = [];
      })
      .addCase(getMateriById.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        state.data = [];
      })
      .addCase(getMateriById.fulfilled, (state, action) => {
        state.data = [action.payload];
        state.isLoading = false;
        state.error = "";
      })
      .addCase(createMateri.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
        // state.data = [];
      })
      .addCase(createMateri.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        state.data = [];
      })
      .addCase(createMateri.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.isLoading = false;
        state.error = "";
      })
      .addCase(hapusMateri.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
        // state.data = [];
      })
      .addCase(hapusMateri.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        state.data = [];
      })
      .addCase(hapusMateri.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item.id != action.payload.id);
        state.isLoading = false;
        state.error = "";
      });
  },
});

export default materiSlice.reducer;
