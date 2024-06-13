import {
  View,
  Image,
  Text,
  BackHandler,
  Alert,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "aws-amplify/auth";

import HeaderComponent from "~/components/header/HeaderComponent";
import HomeChipListComponent from "~/components/home/expenses/HomeChipListComponent";
import MealCardComponent from "~/components/home/meals/MealCardComponent";

const MemoizedHeaderComponent = React.memo(HeaderComponent);
const MemoizedHomeChipListComponent = React.memo(HomeChipListComponent);

export default function HomeScreen() {
  const user = useSelector((state) => state.user.user);
  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to log out?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "YES",
          onPress: () => {
            signOut()
              .then(() => navigation.push("Welcome"))
              .catch(() => navigation.push("Welcome"));
          },
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        className="absolute h-full w-full"
        source={require("~/assets/splash.png")}
      />
      {user.userId ? (
        <View className="mt-16">
          <View
            style={{
              height: 75,
            }}
            className="mx-5"
          >
            <MemoizedHeaderComponent />
          </View>
          <View>
            <View className="mb-4">
              <MemoizedHomeChipListComponent />
            </View>
            <View>
              <MealCardComponent />
            </View>
          </View>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}
