import React from "react";
import AppNavigation from "./navigation/AppNavigation";
import { Amplify } from "aws-amplify";
import awsmobile from './src/aws-exports';
Amplify.configure(awsmobile);

export default function App() {
  return <AppNavigation />;
}
