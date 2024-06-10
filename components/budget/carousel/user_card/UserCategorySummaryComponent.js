import { View, Text } from "react-native";
import React from "react";
import { themeColors } from "~/theme";
import { IconButton } from "react-native-paper";
import { calculatePercentage } from "~/utils/calculatePercentage";
import EditExpenseButtonComponent from "./EditExpenseButtonComponent";
import { useSelector } from "react-redux";
import { getCategory } from "~/app/categoriesSlice";

export default function UserCategorySummaryComponent({ categoryId }) {
  const category = useSelector((state) => getCategory(state, categoryId));

  const totalExpenses = category.expenses.reduce(
    (total, e) => total + e.total,
    0
  );

  const percentage = calculatePercentage(
    [totalExpenses],
    category.income ? -category.forecast : category.forecast
  );

  return (
    <View className="px-5 mt-2 space-y-3">
      <View className="flex-row items-center space-x-1 -mb-1">
        <Text
          className="text-3xl font-semibold z-10"
          style={{ color: themeColors.onSecondaryContainer }}
        >
          {category.title}
        </Text>
        <IconButton icon={category.icon} color={themeColors.primary} />
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
          €{Math.abs(category.forecast).toFixed(2)}
        </Text>
      </View>
      <View className="flex-row justify-between items-center">
        <View className="space-y-1">
          <Text
            className="text-base "
            style={{ color: themeColors.onSecondaryContainer }}
          >
            {"Total " + (category.id === 1 ? "income" : "expenses") + ":"}
          </Text>
          <Text
            className="text-3xl font-semibold"
            style={{ color: themeColors.primary }}
          >
            €{Math.abs(totalExpenses).toFixed(2)}
          </Text>
        </View>
        <EditExpenseButtonComponent categoryId={categoryId} />
      </View>
    </View>
  );
}
