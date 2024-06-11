import { View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";

import YearPickerComponent from "~/components/year_stats/datepicker/YearPickerComponent";
import HeaderComponent from "~/components/header/HeaderComponent";
import StatsChipListComponent from "~/components/year_stats/chip/StatsChipListComponent";
import StatsCarouselComponent from "~/components/year_stats/carousel/StatsCarouselComponent";
import { updateYear } from "~/app/statsSlice";

export default function YearStatsScreen() {
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateYear(new Date().getFullYear()));
  }, []);

  const searchBarHeight = useSharedValue(76);

  const searchBarAnimatedStyle = useAnimatedStyle(() => ({
    height: searchBarHeight.value,
  }));

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
            <HeaderComponent />
          </Animated.View>
          <View className="mb-4 -mt-4">
            <YearPickerComponent />
          </View>
          <View className="mb-14">
            <StatsChipListComponent />
          </View>
          <StatsCarouselComponent />
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}
