import { View, Text } from "react-native";
import React from "react";
import { ActivityIndicator, IconButton } from "react-native-paper";
import { themeColors } from "~/theme";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import ForecastChartComponent from "~/components/year_stats/charts/ForecastChartComponent";

export default function ForecastSummaryComponent({ loading, yearCategories }) {
  return (
    <View className="space-y-2">
      <View style={{ height: 250 }}>
        {loading ? (
          <Animated.View className="items-center mt-20">
            <ActivityIndicator size={"large"} color={themeColors.primary} />
          </Animated.View>
        ) : (
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <ForecastChartComponent items={yearCategories} />
          </Animated.View>
        )}
      </View>
      <View>
        <View className="flex-row items-center space-x-1 mx-5">
          <Text
            className="text-3xl font-semibold z-10"
            style={{ color: themeColors.onSecondaryContainer }}
          >
            Budget Summary
          </Text>
          <IconButton icon={"calendar-check"} color={themeColors.primary} />
        </View>
        <View className="flex-row items-center space-x-1 mx-5">
          <Text
            className="text-lg font-semibold z-10"
            style={{ color: themeColors.onSecondaryContainer }}
          >
            {"Real Income: €" + yearCategories[0].categories[0].real.in}
          </Text>
          <Text
            className="text-lg font-semibold z-10"
            style={{ color: themeColors.onSecondaryContainer }}
          >
            {"Budget Income: €" + yearCategories[0].categories[0].forecast.in}
          </Text>
        </View>
        <View className="flex-row items-center space-x-1 mx-5">
          <Text
            className="text-lg font-semibold z-10"
            style={{ color: themeColors.onSecondaryContainer }}
          >
            {"Real Outcome: €" + yearCategories[0].categories[0].real.out}
          </Text>
          <Text
            className="text-lg font-semibold z-10"
            style={{ color: themeColors.onSecondaryContainer }}
          >
            {"Budget Outcome: €" + yearCategories[0].categories[0].forecast.out}
          </Text>
        </View>
      </View>
    </View>
  );
}
