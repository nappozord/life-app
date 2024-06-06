import { View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BudgetScreen from "~/screens/BudgetScreen";
import GroceryScreen from "~/screens/GroceryScreen";
import SettingsScreen from "~/screens/SettingsScreen";
import CustomBottomTabComponent from "./CustomBottomTabComponent";
import YearStatsScreen from "~/screens/YearStatsScreen";
import ListScreen from "~/screens/ListScreen";

const Tab = createBottomTabNavigator();

const MemoizedBudgetScreen = React.memo(BudgetScreen);
const MemoizedYearStatsScreen = React.memo(YearStatsScreen);
const MemoizedGroceryScreen = React.memo(GroceryScreen);
const MemoizedListScreen = React.memo(ListScreen);
const MemoizedSettingsScreen = React.memo(SettingsScreen);

const Budget = () => <MemoizedBudgetScreen />;
const Year = () => <MemoizedYearStatsScreen />;
const Grocery = () => <MemoizedGroceryScreen />;
const List = () => <MemoizedListScreen />;
const Settings = () => <MemoizedSettingsScreen />;

export default function BottomTabNavigatorComponent() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}
      tabBar={(props) => (
        <View>
          <CustomBottomTabComponent {...props} />
        </View>
      )}
    >
      <Tab.Screen name="chart-donut" children={Budget} />
      <Tab.Screen name="chart-line" children={Year} />
      <Tab.Screen name="cart" children={Grocery} />
      <Tab.Screen name="format-list-bulleted" children={List} />
      <Tab.Screen name="cog-outline" children={Settings} />
    </Tab.Navigator>
  );
}
