import { View, TouchableOpacity, Text } from "react-native";
import React, { useEffect, useState } from "react";
import HomeChipComponent from "./HomeChipComponent";
import { themeColors } from "~/theme";
import {
  calculateWeeklyInOut,
  calculateDailyInOut,
} from "~/utils/calculateMoneyFlow";
import { useSelector } from "react-redux";
import { IconButton } from "react-native-paper";
import { getCurrentMonthCategory } from "~/app/categoriesSlice";

export default function HomeChipListComponent() {
  const categories = useSelector((state) => getCurrentMonthCategory(state));

  const [data, setData] = useState([]);

  useEffect(() => {
    setData([]);
    const today = new Date();
    const yesterday = today.setDate(today.getDate() - 1);

    calculateDailyInOut(categories, new Date()).then((r) => {
      setData((prev) => [
        ...prev,
        {
          title: "Today",
          description: r.out,
          color: themeColors.primary,
          textColor: themeColors.onPrimary,
        },
      ]);
    });

    calculateDailyInOut(categories, new Date(yesterday)).then((r) => {
      setData((prev) => [
        ...prev,
        {
          title: "Yesterday",
          description: r.out,
          color: themeColors.primary,
          textColor: themeColors.onPrimary,
        },
      ]);
    });

    calculateWeeklyInOut(categories, new Date()).then((r) => {
      setData((prev) => [
        ...prev,
        {
          title: "This Week",
          description: r.out,
          color: themeColors.primary,
          textColor: themeColors.onPrimary,
        },
      ]);
    });
  }, [categories]);

  return (
    <View
      className="mx-3 pb-3 rounded-2xl"
      style={[
        {
          backgroundColor: themeColors.onSecondary,
          elevation: 5,
        },
      ]}
    >
      <View className="mx-3 mb-2 flex-row items-center justify-between space-x-1">
        <View className="flex-row items-center space-x-1">
          <Text
            className="text-xl font-semibold z-10"
            style={{ color: themeColors.onSecondaryContainer }}
          >
            Expenses Summary
          </Text>
          <IconButton icon={"cash-multiple"} color={themeColors.primary} />
        </View>
        <TouchableOpacity className="-mx-4 -mb-3 -mt-2">
          <IconButton
            size={32}
            icon={"plus-circle-outline"}
            color={themeColors.primary}
          />
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between mx-3 space-x-3">
        {data.map((item) => {
          return (
            <View className="flex-1" key={item.title + item.description}>
              <TouchableOpacity
                className="px-3 py-1 rounded-2xl"
                style={{ backgroundColor: item.color, elevation: 5 }}
              >
                <Text
                  className="text-base font-semibold"
                  style={{ color: item.textColor }}
                >
                  {item.title}
                </Text>
                <HomeChipComponent item={item} />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
}
