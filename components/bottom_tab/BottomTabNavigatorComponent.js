import { View, Text, KeyboardAvoidingView } from "react-native";
import React, {useState} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../screens/HomeScreen";
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
      <Tab.Screen name="chart-donut" component={HomeScreen} />
      <Tab.Screen name="chart-line" component={HomeScreen} />
      <Tab.Screen name="cart" component={HomeScreen} />
      <Tab.Screen name="cog-outline" component={HomeScreen} />
    </Tab.Navigator>
  );
}
