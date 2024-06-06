import React from "react";
import { ProgressBar } from "react-native-paper";
import { useSelector } from "react-redux";
import { themeColors } from "~/theme";
import { calculateItemUsage } from "~/utils/calculateUsage";
import { getItem } from "~/app/itemsSlice";

export default function ItemPercentageComponent({ itemId }) {
  const item = useSelector((state) => getItem(state, itemId));

  const progress = calculateItemUsage(item, new Date());

  return (
    <ProgressBar
      style={{ height: 6 }}
      progress={progress}
      color={progress > 0.5 ? themeColors.primary : themeColors.errorContainer}
    />
  );
}
