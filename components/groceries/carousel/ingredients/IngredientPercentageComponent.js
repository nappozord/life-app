import React from "react";
import { ProgressBar } from "react-native-paper";
import { themeColors } from "~/theme";
import { View } from "react-native";
import { calculateIngredientUsage } from "~/utils/calculateUsage";

export default function IngredientPercentageComponent({
  item,
  recipes,
  groceries,
}) {
  const progress = calculateIngredientUsage(item, groceries, recipes, new Date(), 7);

  return (
    <ProgressBar
      style={{ height: 6 }}
      progress={progress}
      color={
        progress > 0.5 ? themeColors.chartBlue(1) : themeColors.chartRed(1)
      }
    />
  );
}
