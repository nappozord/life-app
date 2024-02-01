import { View, Text } from "react-native";
import React from "react";
import BezierChartComponent from "~/components/year_stats/charts/BezierChartComponent";
import { ActivityIndicator, IconButton } from "react-native-paper";
import { themeColors } from "~/theme";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function IncomeSummaryComponent({ loading, yearCategories }) {
  return (
    <View className="space-y-2">
      <View style={{ height: 250 }}>
        {loading ? (
          <Animated.View className="items-center mt-20">
            <ActivityIndicator size={"large"} color={themeColors.primary} />
          </Animated.View>
        ) : (
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <BezierChartComponent items={yearCategories} />
          </Animated.View>
        )}
      </View>
      <View>
        <View className="flex-row items-center space-x-1 mx-5">
          <Text
            className="text-3xl font-semibold z-10"
            style={{ color: themeColors.onSecondaryContainer }}
          >
            Income Summary
          </Text>
          <IconButton icon={"calendar-check"} color={themeColors.primary} />
        </View>
      </View>
    </View>
  );
}
