import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategories, updateCategories } from "~/api/apiCategories";

const initialState = {
  categories: [],
  status: "idle",
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await getCategories();
    return response;
  }
);

const userSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    updateUser: {
      reducer(state, action) {
        state.categories = action.payload;
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
