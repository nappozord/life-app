import { View, Text } from "react-native";
import React from "react";
import { themeColors } from "~/theme";
import { IconButton } from "react-native-paper";
import { calculatePercentage } from "~/utils/calculatePercentage";
import EditExpenseButtonComponent from "~/components/budget/carousel/user_card/EditExpenseButtonComponent";
import { useSelector } from "react-redux";

export default function ListCategorySummaryComponent({
  item,
  categories,
  setCategories,
  date,
}) {
  const user = useSelector((state) => state.user.user);

  const totalToBuy = item.real ? item.real - item.realBought : 0;
  const percentage = calculatePercentage([totalToBuy], user.balance);
  const itemBought = item.expenses.filter((obj) => obj.bought);

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
      {item.expenses.length > 0 ? (
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
            {itemBought.length + "/" + item.expenses.length}
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
            €{Math.abs(item.real).toFixed(2)}
          </Text>
        </View>
        <EditExpenseButtonComponent
          icon={item.icon}
          category={item.title}
          categories={categories}
          setCategories={setCategories}
          date={date}
          isList={true}
        />
      </View>
    </View>
  );
}
