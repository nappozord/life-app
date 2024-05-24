import { View, Image, BackHandler, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useRef, useEffect } from "react";
import ChipCategoryListComponent from "~/components/budget/chip/ChipCategoryListComponent";
import BudgetCarouselComponent from "~/components/budget/carousel/BudgetCarouselComponent";
import DatePickerComponent from "~/components/budget/datepicker/DatePickerComponent";
import Animated, {
  withTiming,
  FadeIn,
  FadeOut,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { formatDate } from "~/utils/manageDate";
import { getCategories, saveCategories } from "~/api/apiManager";
import HeaderComponent from "~/components/header/HeaderComponent";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "aws-amplify/auth";
import { useDispatch, useSelector } from "react-redux";

import { updateActiveCategory } from "~/app/categorySlice";

export default function BudgetScreen() {
  const user = useSelector((state) => state.user.user);
  const { date, categories, activeCategory, cardPressed } = useSelector(
    (state) => state.categories
  );

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const categoryListRef = useRef(null);
  const searchBarHeight = useSharedValue(76);
  const searchBarAnimatedStyle = useAnimatedStyle(() => ({
    height: searchBarHeight.value,
  }));

  if (!categories.find((obj) => obj.index === activeCategory))
    dispatch(updateActiveCategory(0));

  cardPressed
    ? (searchBarHeight.value = withTiming(0, { duration: 500 }))
    : (searchBarHeight.value = withTiming(76, { duration: 500 }));

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
              .catch((e) => navigation.push("Welcome"));
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
  }, []);

  if (activeCategory === 0) dispatch(updateActiveCategory(false));

  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        className="absolute h-full w-full"
        source={require("~/assets/splash.png")}
      />
      {user.userId ? (
        <View className="mt-16">
          <Animated.View style={searchBarAnimatedStyle} className="mx-5">
            {cardPressed ? <View></View> : <HeaderComponent />}
          </Animated.View>
          <View className="mb-3 -mt-4">
            <DatePickerComponent />
          </View>
          <View>
            <ChipCategoryListComponent categoryListRef={categoryListRef} />
          </View>
          <Animated.View
            className="mt-1 py-2"
            key={date.date}
            entering={FadeIn}
            exiting={FadeOut}
          >
            <BudgetCarouselComponent categoryListRef={categoryListRef} />
          </Animated.View>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}
