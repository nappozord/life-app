import { View, Text } from "react-native";
import React from "react";
import { themeColors } from "~/theme";
import { IconButton } from "react-native-paper";
import { calculatePercentage } from "~/utils/calculatePercentage";
import EditExpenseButtonComponent from "./EditExpenseButtonComponent";
import { useDispatch, useSelector } from "react-redux";

export default function UserCategorySummaryComponent({ item }) {
  const percentage = calculatePercentage([item.real], item.forecast);

  return (
    <View className="px-5 mt-2 space-y-3">
      <View className="flex-row items-center space-x-1 -mb-1">
        <Text
          className="text-3xl font-semibold z-10"
          style={{ color: themeColors.onSecondaryContainer }}
        >
          {item.title}
        </Text>
        <IconButton icon={item.icon} color={themeColors.primary} />
      </View>
      <View
        style={{ backgroundColor: themeColors.primary }}
        className="space-x-1 items-center rounded-3xl p-1 px-2 w-16 mb-1"
      >
        <Text
          className="text-base font-semibold"
          numberOfLines={1}
          style={{ color: themeColors.onPrimary }}
        >
          {percentage}%
        </Text>
      </View>
      <View className="flex-row space-x-1 z-10 mb-4">
        <Text
          className="text-base"
          style={{ color: themeColors.onSecondaryContainer }}
        >
          Budget
        </Text>
        <Text
          className="text-base font-semibold"
          style={{ color: themeColors.primary }}
        >
          €{Math.abs(item.forecast).toFixed(2)}
        </Text>
      </View>
      <View className="flex-row justify-between items-center">
        <View className="space-y-1">
          <Text
            className="text-base "
            style={{ color: themeColors.onSecondaryContainer }}
          >
            {"Total " + (item.id === 1 ? "income" : "expenses") + ":"}
          </Text>
          <Text
            className="text-3xl font-semibold"
            style={{ color: themeColors.primary }}
          >
            €{Math.abs(item.real).toFixed(2)}
          </Text>
        </View>
        <EditExpenseButtonComponent icon={item.icon} category={item.title} />
      </View>
    </View>
  );
}
