import { View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import YearPickerComponent from "~/components/year_stats/datepicker/YearPickerComponent";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import HeaderComponent from "~/components/header/HeaderComponent";
import BezierChartComponent from "~/components/year_stats/charts/BezierChartComponent";
import { getYTDMonths } from "~/utils/manageDate";
import { getCategories } from "~/api/apiManager";
import StatsChipListComponent from "~/components/year_stats/chip/StatsChipListComponent";
import StatsCarouselComponent from "../components/year_stats/carousel/StatsCarouselComponent";

export default function YearStatsScreen({ user, setUser }) {
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  let [yearCategories, setYearCategories] = useState([]);

  const searchBarHeight = useSharedValue(76);

  const searchBarAnimatedStyle = useAnimatedStyle(() => ({
    height: searchBarHeight.value,
  }));

  console.log("RENDER SCREEN");

  useEffect(() => {
    if (loading)
      setTimeout(() => {
        setLoading(false);
      }, 700);
  }, [loading]);

  useEffect(() => {
    setLoading(true);

    yearCategories = [];
    const months = getYTDMonths(year);

    getCategories(months)
      .then((r) => {
        setYearCategories([...r]);
      })
      .catch((e) => console.log(e));
  }, [year]);

  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        className="absolute h-full w-full"
        source={require("~/assets/splash.png")}
        //blurRadius={80}
      />
      {user.userId ? (
        <View className="mt-16">
          <Animated.View style={searchBarAnimatedStyle} className="mx-5">
            <HeaderComponent user={user} setUser={setUser} />
          </Animated.View>
          <View className="mb-4 -mt-4">
            <YearPickerComponent year={year} setYear={setYear} />
          </View>
          <View className="mb-14">
            <StatsChipListComponent items={yearCategories} />
          </View>
          <StatsCarouselComponent
            yearCategories={yearCategories}
            loading={loading}
          />
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}
