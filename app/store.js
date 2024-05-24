import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import categoriesSlice from "./categoriesSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    categories: categoriesSlice,
  },
});
