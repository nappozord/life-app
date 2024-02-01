import React from "react";
import { ProgressBar } from "react-native-paper";
import { themeColors } from "~/theme";
import { calculateIngredientUsage } from "~/utils/calculateUsage";

export default function IngredientPercentageComponent({
  item,
  recipes,
  meals,
}) {
  const progress = calculateIngredientUsage(
    item,
    meals,
    recipes,
    new Date(),
    7
  );

  return (
    <ProgressBar
      style={{ height: 6 }}
      progress={progress}
      color={
        progress > 0.5
          ? themeColors.primary
          : themeColors.errorContainer
      }
    />
  );
}
