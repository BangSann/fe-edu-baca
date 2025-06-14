import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import eduApi from "../../axios";
import { AxiosError } from "axios";

export const getUsersDataAdmin = createAsyncThunk(
  "getUsersDataAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const res = await eduApi.get("user");

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error);
      }
      return rejectWithValue("An unknown error occurred.");
    }
  }
);
export const addUsersDataAdmin = createAsyncThunk(
  "addUsersDataAdmin",
  async (data, { rejectWithValue }) => {
    try {
      const res = await eduApi.post("user", data);

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error);
      }
      return rejectWithValue("An unknown error occurred.");
    }
  }
);
export const editUsersDataAdmin = createAsyncThunk(
  "editUsersDataAdmin",
  async (data, { rejectWithValue }) => {
    try {
      const res = await eduApi.patch(`user/${data.id}?method=PATCH`, data);

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error);
      }
      return rejectWithValue("An unknown error occurred.");
    }
  }
);
export const deleteUsersDataAdmin = createAsyncThunk(
  "deleteUsersDataAdmin",
  async (data, { rejectWithValue }) => {
    try {
      const res = await eduApi.delete("user/" + data.id);

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error);
      }
      return rejectWithValue("An unknown error occurred.");
    }
  }
);

const usersAdminSlice = createSlice({
  name: "usersAdminSlice",
  initialState: {
    isLoading: false,
    error: "",
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersDataAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsersDataAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(getUsersDataAdmin.fulfilled, (state, action) => {
        state.data = action.payload.data.data;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(addUsersDataAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUsersDataAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(addUsersDataAdmin.fulfilled, (state, action) => {
        state.data = action.payload.data.data;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(editUsersDataAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editUsersDataAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(editUsersDataAdmin.fulfilled, (state, action) => {
        state.data = action.payload.data.data;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(deleteUsersDataAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUsersDataAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(deleteUsersDataAdmin.fulfilled, (state, action) => {
        // state.data = action.payload;
        state.isLoading = false;
        state.error = "";
      });
  },
});

export default usersAdminSlice.reducer;
