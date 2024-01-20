import React from "react";
import { View, Image, Dimensions, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BudgetScreen from "~/screens/BudgetScreen";
import WelcomeScreen from "~/screens/WelcomeScreen";
import { themeColors } from "~/theme";
import { IconButton } from "react-native-paper";
import BottomTabNavigatorComponent from "~/components/bottom_tab/BottomTabNavigatorComponent";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          contentStyle: { backgroundColor: "transparent" },
        }}
      >
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={BottomTabNavigatorComponent}
        />
        <Stack.Screen
          name="Welcome"
          options={{ headerShown: false }}
          component={WelcomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
