import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRecipes, updateRecipes } from "~/api/apiRecipes";
import { deleteRecipeFromMeal } from "./mealsSlice";

const initialState = {
  recipes: [],
  status: "idle",
  error: null,
};

// Async thunk for fetching recipes
export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async () => {
    const response = await getRecipes();
    return response;
  }
);

export const addRecipe = createAsyncThunk(
  "recipes/addRecipe",
  async (payload, { dispatch, getState }) => {
    dispatch(_addRecipe(payload));
    const state = getState().recipes;
    updateRecipes(state.recipes);
  }
);

export const updateRecipe = createAsyncThunk(
  "recipes/updateRecipe",
  async (payload, { dispatch, getState }) => {
    dispatch(_updateRecipe(payload));
    const state = getState().recipes;
    updateRecipes(state.recipes);
  }
);

export const updateRecipeUsage = createAsyncThunk(
  "recipes/updateRecipe",
  async (payload, { dispatch, getState }) => {
    dispatch(_updateRecipeUsage(payload));
    const state = getState().recipes;
    updateRecipes(state.recipes);
  }
);

export const deleteRecipe = createAsyncThunk(
  "recipes/deleteRecipe",
  async (payload, { dispatch, getState }) => {
    dispatch(_deleteRecipe(payload));
    const state = getState().recipes;
    updateRecipes(state.recipes);

    deleteRecipeFromMeal(payload);
  }
);

export const deleteIngredientFromRecipe = createAsyncThunk(
  "recipes/deleteIngredientFromRecipe",
  async (payload, { dispatch, getState }) => {
    dispatch(_deleteIngredientFromRecipe(payload));
    const state = getState().recipes;
    updateRecipes(state.recipes);
  }
);

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    _addRecipe(state, action) {
      const { name, icon, selected } = action.payload;

      if (name === "" || name === null) name = "New Recipe";

      if (icon === "" || icon === null) icon = "food";

      const ids = state.recipes.map((object) => {
        return object.id;
      });

      const max = ids.length > 0 ? Math.max(...ids) : 0;

      state.recipes.push({
        id: max + 1,
        title: name,
        icon: icon,
        used: 0,
        ingredients: [...selected],
      });
    },
    _deleteRecipe(state, action) {
      state.recipes = state.recipes.filter((obj) => obj.id !== action.payload);
    },
    _updateRecipe(state, action) {
      const { icon, name, recipeId, selected } = action.payload;

      const recipe = state.recipes.find((obj) => obj.id === recipeId);

      if (name === "" || name === null) name = "New Recipe";

      if (icon === "" || icon === null) icon = "food";

      recipe.title = name;
      recipe.icon = icon;
      recipe.ingredients = [...selected];
    },
    _updateRecipeUsage(state, action) {
      action.payload.forEach((r) => {
        const recipe = state.recipes.find((obj) => obj.id === r);
        recipe ? (recipe.used += 1) : null;
      });
    },
    _deleteIngredientFromRecipe(state, action) {
      const ingredientId = action.payload;

      state.recipes.forEach((r) => {
        r.ingredients = r.ingredients.filter((obj) => obj.id !== ingredientId);
      });
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

export const {
  _addRecipe,
  _deleteRecipe,
  _updateRecipe,
  _deleteIngredientFromRecipe,
  _updateRecipeUsage,
} = recipesSlice.actions;

export const getRecipe = (state, id) =>
  state.recipes.recipes.find((i) => i.id === id);

export default recipesSlice.reducer;
