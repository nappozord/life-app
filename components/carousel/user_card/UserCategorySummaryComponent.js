import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { themeColors } from "../../../theme";
import { IconButton } from "react-native-paper";
import { calculatePercentage } from "../../../utils/calculatePercentage";
import EditExpenseButtonComponent from "./EditExpenseButtonComponent";

export default function UserCategorySummaryComponent({
  item,
  categories,
  setCategories,
  user,
  setUser,
}) {
  const percentage = calculatePercentage([item.real], item.forecast);

  return (
    <View className="px-5 mt-2 space-y-3">
      <View className="flex-row items-center space-x-1 -mb-1">
        <Text className="text-3xl text-gray-800 font-semibold z-10">
          {item.title}
        </Text>
        <IconButton icon={item.icon} color={themeColors.bgBlack} />
      </View>
      <View
        style={{ backgroundColor: themeColors.bgWhite(0.3) }}
        className="space-x-1 items-center rounded-3xl p-1 px-2 w-16 mb-1"
      >
        <Text className="text-base font-semibold text-gray-800">
          {percentage}%
        </Text>
      </View>
      <View className="flex-row space-x-1 z-10 mb-4">
        <Text className="text-base text-gray-700 font-semibold">Forecast</Text>
        <Text className="text-base text-gray-800 font-semibold">
          €{Math.abs(item.forecast).toFixed(2)}
        </Text>
      </View>
      <View className="flex-row justify-between items-center">
        <View className="space-y-1">
          <Text className="text-base text-gray-700 font-semibold">
            {"Total " + (item.id === 1 ? "income" : "expenses") + ":"}
          </Text>
          <Text className="text-3xl text-gray-800 font-semibold">
            €{Math.abs(item.real).toFixed(2)}
          </Text>
        </View>
        <EditExpenseButtonComponent
          icon={item.icon}
          category={item.title}
          categories={categories}
          setCategories={setCategories}
          user={user}
          setUser={setUser}
        />
      </View>
    </View>
  );
}
