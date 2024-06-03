import React from "react";
import AppNavigation from "./navigation/AppNavigation";
import { Amplify } from "aws-amplify";
import awsmobile from "./src/aws-exports";
import { Provider } from "react-redux";

import { store } from "./app/store";
import { fetchUser } from "./app/userSlice";
import { fetchCategories, fetchDefaultCategories } from "./app/categoriesSlice";
import { fetchIngredients } from "./app/ingredientsSlice";
import { fetchRecipes } from "./app/recipesSlice";
import { fetchItems } from "./app/itemsSlice";
import { formatDate } from "./utils/manageDate";

Amplify.configure(awsmobile);

export default function App() {
  store.dispatch(fetchUser());
  store.dispatch(fetchCategories(formatDate(new Date())));
  store.dispatch(fetchDefaultCategories());
  /*store.dispatch(fetchIngredients());
  store.dispatch(fetchRecipes());
  store.dispatch(fetchItems());*/

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
