import React from "react";
import AppNavigation from "./navigation/AppNavigation";
import { Amplify } from "aws-amplify";
import awsmobile from "./src/aws-exports";
import { Provider } from "react-redux";

import { store } from "./app/store";
import { fetchUser } from "./app/userSlice";
import { fetchCategories, fetchDefaultCategories } from "./app/categoriesSlice";

Amplify.configure(awsmobile);

export default function App() {

  store.dispatch(fetchUser());
  store.dispatch(fetchCategories(new Date()));
  store.dispatch(fetchDefaultCategories());

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
