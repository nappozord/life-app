import { View, Image, BackHandler, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "aws-amplify/auth";
import { useSelector } from "react-redux";
import Animated, {
  withTiming,
  FadeIn,
  FadeOut,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import ChipCategoryListComponent from "~/components/budget/chip/ChipCategoryListComponent";
import BudgetCarouselComponent from "~/components/budget/carousel/BudgetCarouselComponent";
import DatePickerComponent from "~/components/budget/datepicker/DatePickerComponent";
import HeaderComponent from "~/components/header/HeaderComponent";

const MemoizedHeaderComponent = React.memo(HeaderComponent);
const MemoizedDatePickerComponent = React.memo(DatePickerComponent);
const MemoizedChipCategoryListComponent = React.memo(ChipCategoryListComponent);
const MemoizedBudgetCarouselComponent = React.memo(BudgetCarouselComponent);

export default function BudgetScreen() {
  const user = useSelector((state) => state.user.user);
  const cardPressed = useSelector((state) => state.categories.cardPressed);

  const navigation = useNavigation();
  const searchBarHeight = useSharedValue(76);
  const searchBarAnimatedStyle = useAnimatedStyle(() => ({
    height: searchBarHeight.value,
  }));

  useEffect(() => {
    if (cardPressed) {
      searchBarHeight.value = withTiming(0, { duration: 500 });
    } else {
      searchBarHeight.value = withTiming(76, { duration: 500 });
    }
  }, [cardPressed]);

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

  const renderHeader = useMemo(() => {
    return cardPressed ? <View></View> : <MemoizedHeaderComponent />;
  }, [cardPressed]);

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
            {renderHeader}
          </Animated.View>
          <View className="mb-3 -mt-4">
            <MemoizedDatePickerComponent />
          </View>
          <View>
            <MemoizedChipCategoryListComponent />
          </View>
          <Animated.View
            className="mt-1 py-2"
            entering={FadeIn}
            exiting={FadeOut}
          >
            <MemoizedBudgetCarouselComponent />
          </Animated.View>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}
