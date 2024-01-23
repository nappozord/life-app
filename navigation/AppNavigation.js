import React from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "~/screens/WelcomeScreen";
import BottomTabNavigatorComponent from "~/components/bottom_tab/BottomTabNavigatorComponent";
import { themeColors } from "~/theme";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const config = {
  animation: "timing",
  config: {
    duration: 1000
  },
};

const MyTheme = {
  dark: false,
  colors: {
    primary: themeColors.background,
    background: themeColors.background,
    card: themeColors.background,
    text: themeColors.background,
    border: themeColors.background,
    notification: themeColors.background,
  },
};

export default function AppNavigation() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          contentStyle: { backgroundColor: "#000000" },
        }}
      >
        <Stack.Screen
          name="Home"
          component={BottomTabNavigatorComponent}
          options={{
            presentation: "transparentModal",
            headerShown: false,
            transitionSpec: {
              open: config,
              close: config,
            },
          }}
        />
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            presentation: "transparentModal",
            headerShown: false,
            transitionSpec: {
              open: config,
              close: config,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
