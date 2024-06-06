import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getGroceryList, updateGroceryList } from "~/api/apiGroceries";

const initialState = {
  groceries: [],
  categories: [
    {
      id: 0,
      title: "Meal Plan",
    },
    {
      id: 1,
      title: "Groceries",
    },
    {
      id: 2,
      title: "Recipes",
    },
    {
      id: 3,
      title: "Ingredients",
    },
    {
      id: 4,
      title: "General",
    },
  ],
  status: "idle",
  error: null,
  activeCategory: 0,
};

// Async thunk for fetching groceries
export const fetchGroceries = createAsyncThunk(
  "groceries/fetchGroceries",
  async () => {
    const response = await getGroceryList();
    return response;
  }
);

const groceriesSlice = createSlice({
  name: "groceries",
  initialState,
  reducers: {
    updateActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroceries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGroceries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.groceries = action.payload;
      })
      .addCase(fetchGroceries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updateActiveCategory } = groceriesSlice.actions;

export default groceriesSlice.reducer;
