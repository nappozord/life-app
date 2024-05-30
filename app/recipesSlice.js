import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRecipes, updateRecipes } from "~/api/apiRecipes";

const initialState = {
  recipes: [],
  status: "idle",
  error: null,
};

// Async thunk for fetching recipes
export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (range) => {
    const response = await getRecipes(range);
    return response;
  }
);

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    addRecipe(state, action) {
      state.recipes.push(action.payload);
      updateRecipes(state.recipes);
    },
    updateRecipe(state, action) {
      const recipe = action.payload;
      const index = state.recipes.findIndex((i) => recipe.id === i.id);
      if (index !== -1) {
        state.recipes[index] = recipe;
        updateRecipes(state.recipes, state.recipes[index].date);
      }
    },
    deleteRecipe(state, action) {
      const recipe = action.payload;
      state.recipes = state.recipes.filter((i) => i.id !== recipe.id);
      updateRecipes(state.recipes);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addRecipe, updateRecipe, deleteRecipe } = recipesSlice.actions;

export default recipesSlice.reducer;
