import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getIngredients, updateIngredients } from "~/api/apiIngredients";

const initialState = {
  ingredients: [],
  status: "idle",
  error: null,
};

// Async thunk for fetching ingredients
export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async (range) => {
    const response = await getIngredients(range);
    return response;
  }
);

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    addIngredient(state, action) {
      state.ingredients.push(action.payload);
      updateIngredients(state.ingredients);
    },
    updateIngredient(state, action) {
      const ingredient = action.payload;
      const index = state.ingredients.findIndex((i) => ingredient.id === i.id);
      if (index !== -1) {
        state.ingredients[index] = ingredient;
        updateIngredients(state.ingredients, state.ingredients[index].date);
      }
    },
    deleteIngredient(state, action) {
      const ingredient = action.payload;
      state.ingredients = state.ingredients.filter(
        (i) => i.id !== ingredient.id
      );
      updateIngredients(state.ingredients);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addIngredient, updateIngredient, deleteIngredient } =
  ingredientsSlice.actions;

export default ingredientsSlice.reducer;
