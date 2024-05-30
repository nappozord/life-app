import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import categoriesSlice from "./categoriesSlice";
import ingredientsSlice from "./ingredientsSlice";
import recipesSlice from "./recipesSlice";
import mealsSlice from "./mealsSlice";
import itemsSlice from "./itemsSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    categories: categoriesSlice,
    ingredients: ingredientsSlice,
    recipes: recipesSlice,
    meals: mealsSlice,
    items: itemsSlice,
  },
});
