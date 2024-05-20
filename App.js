import React from "react";
import AppNavigation from "./navigation/AppNavigation";
import { Amplify } from "aws-amplify";
import awsmobile from "./src/aws-exports";
import { Provider } from "react-redux";

import { store } from "./app/store";
import { fetchUser } from "./app/userSlice";

Amplify.configure(awsmobile);

export default function App() {

  store.dispatch(fetchUser());

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
