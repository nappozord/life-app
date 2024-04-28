import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BudgetScreen from "~/screens/BudgetScreen";
import GroceryScreen from "~/screens/GroceryScreen";
import SettingsScreen from "~/screens/SettingsScreen";
import CustomBottomTabComponent from "./CustomBottomTabComponent";
import { getUser, updateUser } from "~/api/apiManager";
import YearStatsScreen from "~/screens/YearStatsScreen";
import ListScreen from "~/screens/ListScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigatorComponent() {
  const [user, setUser] = useState({});

  useEffect(() => {
    !user.userId ? getUser().then((r) => setUser(r)) : updateUser(user);
  }, [user]);

  const Budget = () => <BudgetScreen user={user} setUser={setUser} />;

  const Year = () => <YearStatsScreen user={user} setUser={setUser} />;

  const Grocery = () => <GroceryScreen user={user} setUser={setUser} />;

  const List = () => <ListScreen user={user} setUser={setUser} />;

  const Settings = () => <SettingsScreen user={user} setUser={setUser} />;

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
