import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import categoriesSlice from "./categoriesSlice";
import ingredientsSlice from "./ingredientsSlice";
import recipesSlice from "./recipesSlice";
import mealsSlice from "./mealsSlice";
import itemsSlice from "./itemsSlice";
import statsSlice from "./statsSlice";
import logsSlice from "./logsSlice";
import listsSlice from "./listsSlice";
import groceriesSlice from "./groceriesSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    categories: categoriesSlice,
    ingredients: ingredientsSlice,
    groceries: groceriesSlice,
    recipes: recipesSlice,
    meals: mealsSlice,
    items: itemsSlice,
    stats: statsSlice,
    logs: logsSlice,
    lists: listsSlice,
  },
});
