import { View, Text } from "react-native";
import React, { useState } from "react";
import { ActivityIndicator, IconButton } from "react-native-paper";
import { themeColors } from "~/theme";
import Animated, {
  FadeIn,
  FadeOut,
  StretchInY,
  StretchOutY,
} from "react-native-reanimated";
import ForecastChartComponent from "~/components/year_stats/charts/ForecastChartComponent";

export default function ForecastSummaryComponent({ loading, yearCategories }) {
  const [showTip, setShowTip] = useState(true);

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
            Budget Adherence
          </Text>
          <IconButton
            icon={"information-outline"}
            color={themeColors.primary}
            onPress={() => setShowTip(!showTip)}
          />
        </View>
        {showTip ? (
          <Animated.View
            className="mx-5"
            entering={StretchInY}
            exiting={StretchOutY}
          >
            <Text
              className="text-xs"
              style={{ color: themeColors.onSecondaryContainer }}
            >
              Illustrates how closely monthly spending aligns with the budget.
            </Text>
          </Animated.View>
        ) : null}
      </View>
    </View>
  );
}
