import { View, Text, KeyboardAvoidingView } from "react-native";
import React, {useState} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BudgetScreen from "~/screens/BudgetScreen";
import GroceryScreen from "~/screens/GroceryScreen";
import CustomBottomTabComponent from "./CustomBottomTabComponent";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigatorComponent() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarHideOnKeyboard : true }}
      tabBar={(props) => (
        <View>
          <CustomBottomTabComponent {...props} />
        </View>
      )}
    >
      <Tab.Screen name="chart-donut" component={BudgetScreen} />
      <Tab.Screen name="chart-line" component={BudgetScreen} />
      <Tab.Screen name="cart" component={GroceryScreen} />
      <Tab.Screen name="cog-outline" component={BudgetScreen} />
    </Tab.Navigator>
  );
}
