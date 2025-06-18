import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import eduApi from "../../axios";
import { AxiosError } from "axios";

export const getPerangkatMateri = createAsyncThunk(
  "getPerangkatMateri",
  async (_, { rejectWithValue }) => {
    try {
      const response = await eduApi.get("perangkat-materi");
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
export const getPerangkatMateriById = createAsyncThunk(
  "getPerangkatMateriById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await eduApi.get(`perangkat-materi?id=${id}`);
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
export const createPerangkatMateri = createAsyncThunk(
  "createPerangkatMateri",
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("judul", data.judul);
      formData.append("cover", data.cover);
      formData.append("file", data.pdf);
      const response = await eduApi.post(`perangkat-materi`, formData, {
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
export const deletePerangkatMateri = createAsyncThunk(
  "deletePerangkatMateri",
  async (data, { rejectWithValue }) => {
    try {
      const response = await eduApi.delete(`perangkat-materi/${data?.id}`);
      if (response.data) {
        return data;
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

const PerangkatMateriSlice = createSlice({
  name: "PerangkatMateriSlcie",
  initialState: {
    isLoading: false,
    error: "",
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPerangkatMateri.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
        state.data = [];
      })
      .addCase(getPerangkatMateri.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        state.data = [];
      })
      .addCase(getPerangkatMateri.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(getPerangkatMateriById.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
        state.data = [];
      })
      .addCase(getPerangkatMateriById.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        state.data = [];
      })
      .addCase(getPerangkatMateriById.fulfilled, (state, action) => {
        state.data = [action.payload];
        state.isLoading = false;
        state.error = "";
      })
      .addCase(createPerangkatMateri.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
        // state.data = [];
      })
      .addCase(createPerangkatMateri.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        state.data = [];
      })
      .addCase(createPerangkatMateri.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.isLoading = false;
        state.error = "";
      })
      .addCase(deletePerangkatMateri.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
        // state.data = [];
      })
      .addCase(deletePerangkatMateri.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        state.data = [];
      })
      .addCase(deletePerangkatMateri.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (item) => item?.id != action?.payload?.id
        );
        state.isLoading = false;
        state.error = "";
      });
  },
});

export default PerangkatMateriSlice.reducer;
