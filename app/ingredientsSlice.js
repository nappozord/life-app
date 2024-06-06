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
  async () => {
    const response = await getIngredients();
    return response;
  }
);

export const addIngredient = createAsyncThunk(
  "ingredients/addIngredient",
  async (payload, { dispatch, getState }) => {
    dispatch(_addIngredient(payload));
    const state = getState().ingredients;
    updateIngredients(state.ingredients);
  }
);

export const updateIngredient = createAsyncThunk(
  "ingredients/updateIngredient",
  async (payload, { dispatch, getState }) => {
    dispatch(_updateIngredient(payload));
    const state = getState().ingredients;
    updateIngredients(state.ingredients);
  }
);

export const deleteIngredient = createAsyncThunk(
  "ingredients/deleteIngredient",
  async (payload, { dispatch, getState }) => {
    dispatch(_deleteIngredient(payload));
    const state = getState().ingredients;
    updateIngredients(state.ingredients);
    //deleteIngredientFromRecipe
    //deleteIngredientFromMeal
  }
);

export const incrementIngredient = createAsyncThunk(
  "ingredients/incrementIngredient",
  async (payload, { dispatch }) => {
    dispatch(_incrementIngredient(payload));
    updateIngredients(state.ingredients);
  }
);

export const decrementIngredient = createAsyncThunk(
  "ingredients/decrementIngredient",
  async (payload, { dispatch }) => {
    dispatch(_decrementIngredient(payload));
    updateIngredients(state.ingredients);
  }
);

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    _addIngredient(state, action) {
      const { cost, quantity, name, calories } = action.payload;

      if (cost === "" || cost === null) cost = 0.0;

      if (quantity === "" || quantity === null) quantity = 1;

      if (name === "" || name === null) name = "New Ingredient";

      if (calories === "" || calories === null) calories = 0;

      const ids = state.ingredients.map((object) => {
        return object.id;
      });

      const max = ids.length > 0 ? Math.max(...ids) : 0;

      state.ingredients.push({
        id: max + 1,
        title: name,
        cost: parseFloat(cost),
        quantity: parseFloat(quantity),
        calories: parseFloat(calories),
        stock: 0,
        duration: 7,
        lastUpdate: new Date().toLocaleDateString("it-IT"),
        history: [
          {
            id: 0,
            date: new Date().toLocaleDateString("it-IT"),
            cost: parseFloat(cost),
          },
        ],
      });
    },
    _deleteIngredient(state, action) {
      state.ingredients = state.ingredients.filter(
        (obj) => obj.id !== action.payload
      );
    },
    _updateIngredient(state, action) {
      const { cost, quantity, name, calories, ingredientId } = action.payload;

      const ingredient = state.ingredients.find(
        (obj) => obj.id === ingredientId
      );

      if (cost === "" || cost === null) cost = 0.0;

      if (quantity === "" || quantity === null) quantity = 1;

      if (name === "" || name === null) name = "New Ingredient";

      if (calories === "" || calories === null) calories = 0;

      ingredient.title = name;
      ingredient.cost = parseFloat(cost);
      ingredient.quantity = parseFloat(quantity);
      ingredient.lastUpdate = new Date().toLocaleDateString("it-IT");
      ingredient.calories = parseFloat(calories);
      if (ingredient.history) {
        if (
          ingredient.history.find((i) => i.id === ingredient.history.length - 1)
        )
          if (
            ingredient.history.find(
              (i) => i.id === ingredient.history.length - 1
            ).cost !== parseFloat(cost)
          )
            ingredient.history.push({
              id: ingredient.history.length,
              date: new Date().toLocaleDateString("it-IT"),
              cost: parseFloat(cost),
            });
      } else {
        ingredient.history = [
          {
            id: 0,
            date: new Date().toLocaleDateString("it-IT"),
            cost: parseFloat(cost),
          },
        ];
      }
    },
    _incrementIngredient(state, action) {
      const ingredient = state.ingredients.find((i) => action.payload === i.id);
      ingredient.stock += 1;
    },
    _decrementIngredient(state, action) {
      const ingredient = state.ingredients.find((i) => action.payload === i.id);
      ingredient.stock >= 1 ? (ingredient.stock -= 1) : (ingredient.stock = 0);
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

export const {
  _addIngredient,
  _deleteIngredient,
  _updateIngredient,
  _incrementIngredient,
  _decrementIngredient,
} = ingredientsSlice.actions;

export const getIngredient = (state, id) =>
  state.ingredients.ingredients.find((i) => i.id === id);

export default ingredientsSlice.reducer;
