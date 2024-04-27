import React from "react";
import { ProgressBar } from "react-native-paper";
import { themeColors } from "~/theme";
import { calculateItemUsage } from "~/utils/calculateUsage";

export default function ItemPercentageComponent({
  item,
}) {
  const progress = calculateItemUsage(
    item,
    new Date(),
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
