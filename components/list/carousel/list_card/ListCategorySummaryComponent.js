import { View, Text } from "react-native";
import React from "react";
import { themeColors } from "~/theme";
import { IconButton } from "react-native-paper";
import { calculatePercentage } from "~/utils/calculatePercentage";
import { useSelector } from "react-redux";
import { getList } from "~/app/listsSlice";
import EditItemButtonComponent from "./EditItemButtonComponent";

export default function ListCategorySummaryComponent({ listId }) {
  const user = useSelector((state) => state.user.user);
  const list = useSelector((state) => getList(state, listId));

  const total = list.expenses.reduce((total, e) => total + e.total, 0);
  const bought = list.expenses.reduce((total, e) => {
    return e.dateBought ? total + e.total : total;
  }, 0);
  const totalToBuy = total ? total - bought : 0;
  const percentage = calculatePercentage([totalToBuy], user.balance);
  const itemBought = list.expenses.filter((obj) => obj.dateBought);

  return (
    <View className="px-5 mt-2 space-y-3">
      <View className="flex-row items-center space-x-1 -mb-1">
        <Text
          className="text-3xl font-semibold z-10"
          style={{ color: themeColors.onSecondaryContainer }}
        >
          {list.title}
        </Text>
        <IconButton icon={list.icon} color={themeColors.primary} />
      </View>
      {list.expenses.length > 0 ? (
        <View
          style={{ backgroundColor: themeColors.primary }}
          className="flex-row space-x-1 items-center justify-center rounded-3xl p-1 px-2 mb-1"
        >
          <Text
            className="text-base font-semibold"
            numberOfLines={1}
            style={{ color: themeColors.onPrimary }}
          >
            {"Items "}
          </Text>
          <Text
            className="text-lg font-bold -my-1"
            numberOfLines={1}
            style={{ color: themeColors.onPrimary }}
          >
            {itemBought.length + "/" + list.expenses.length}
          </Text>
          <Text
            className="text-base font-semibold"
            numberOfLines={1}
            style={{ color: themeColors.onPrimary }}
          >
            {" bought"}
          </Text>
        </View>
      ) : (
        <View
          style={{ backgroundColor: themeColors.primary }}
          className="flex-row space-x-1 items-center justify-center rounded-3xl p-1 px-2 mb-1"
        >
          <Text
            className="text-base font-semibold"
            numberOfLines={1}
            style={{ color: themeColors.onPrimary }}
          >
            The list is empty!
          </Text>
        </View>
      )}
      <View className="flex-row space-x-1 z-10 mb-4">
        <Text
          className="text-base"
          style={{ color: themeColors.onSecondaryContainer }}
        >
          Impact on balance:
        </Text>
        <Text
          className="text-base font-semibold"
          style={{ color: themeColors.primary }}
        >
          {percentage}%
        </Text>
      </View>
      <View className="flex-row justify-between items-center">
        <View className="space-y-1">
          <Text
            className="text-base "
            style={{ color: themeColors.onSecondaryContainer }}
          >
            {"Full price of list:"}
          </Text>
          <Text
            className="text-3xl font-semibold"
            style={{ color: themeColors.primary }}
          >
            €{Math.abs(total).toFixed(2)}
          </Text>
        </View>
        <EditItemButtonComponent listId={listId} />
      </View>
    </View>
  );
}
