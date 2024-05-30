import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMeals, updateMeals } from "~/api/apiMeals";

const initialState = {
  meals: [],
  status: "idle",
  error: null,
};

// Async thunk for fetching meals
export const fetchMeals = createAsyncThunk(
  "meals/fetchMeals",
  async (range) => {
    const response = await getMeals(range);
    return response;
  }
);

const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    addMeal(state, action) {
      state.meals.push(action.payload);
      updateMeals(state.meals);
    },
    updateMeal(state, action) {
      const meal = action.payload;
      const index = state.meals.findIndex((i) => meal.id === i.id);
      if (index !== -1) {
        state.meals[index] = meal;
        updateMeals(state.meals, state.meals[index].date);
      }
    },
    deleteMeal(state, action) {
      const meal = action.payload;
      state.meals = state.meals.filter((i) => i.id !== meal.id);
      updateMeals(state.meals);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meals = action.payload;
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addMeal, updateMeal, deleteMeal } = mealsSlice.actions;

export default mealsSlice.reducer;
