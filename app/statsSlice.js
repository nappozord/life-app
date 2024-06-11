import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getCategories } from "~/api/apiCategories";
import { getYTDMonths } from "~/utils/manageDate";

const initialState = {
  categories: [],
  year: new Date().getFullYear(),
  status: "idle",
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "stats/fetchCategories",
  async (range) => {
    const response = await getCategories(range);
    return response;
  }
);

export const updateYear = createAsyncThunk(
  "stats/updateYear",
  async (payload, { dispatch, getState }) => {
    dispatch(_updateYear(payload));
    const state = getState().stats;
    const months = getYTDMonths(state.year);
    dispatch(fetchCategories(months));
  }
);

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    _updateYear(state, action) {
      state.year = action.payload;
    },
  },
  extraReducers: (builder) => {
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

export const { _updateYear } = statsSlice.actions;

export default statsSlice.reducer;
