import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { themeColors } from "~/theme";
import DonutChartComponent from "~/components/budget/charts/DonutChartComponent";
import { IconButton } from "react-native-paper";
import BarChartComponent from "~/components/budget/charts/BarChartComponent";
import { getRemainingDaysInMonth } from "~/utils/manageDate";

export default function OverallCategoryComponent({ item, date }) {
  return (
    <Pressable>
      <View className="flex-row justify-center -mt-12">
        <DonutChartComponent
          item={{
            id: item.id,
            title: item.title,
            real: item.real.out,
            forecast: item.real.in,
          }}
        />
      </View>
      <View className="px-5 mt-2 space-y-2">
        <View className="flex-row items-center space-x-1 -mb-2">
          <Text
            className="text-3xl font-semibold z-10"
            style={{ color: themeColors.onSecondaryContainer }}
          >
            {item.title}
          </Text>
          <IconButton icon={item.icon} color={themeColors.primary} />
        </View>
        <View className="flex-row">
          <View className="space-y-1">
            <Text
              className="text-base"
              style={{ color: themeColors.onSecondaryContainer }}
            >
              Total income:
            </Text>
            <View className="flex-row justify-between items-center">
              <BarChartComponent
                forecast={item.forecast.in}
                real={item.real.in}
              />
              <View
                className="p-1 px-3 rounded-full ml-3"
                style={{ backgroundColor: themeColors.primary }}
              >
                <Text
                  className="text-base font-semibold"
                  style={{ color: themeColors.onPrimary }}
                >
                  {"€" + Math.ceil(item.real.in)}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View className="flex-row mb-2">
          <View className="space-y-1">
            <Text
              className="text-base"
              style={{ color: themeColors.onSecondaryContainer }}
            >
              Total expenses:
            </Text>
            <View className="flex-row justify-between items-center">
              <BarChartComponent
                forecast={item.forecast.out}
                real={item.real.out}
              />
              <View
                className="p-1 px-3 rounded-full ml-3"
                style={{ backgroundColor: themeColors.primary }}
              >
                <Text
                  className="text-base font-semibold"
                  style={{ color: themeColors.onPrimary }}
                >
                  {"€" + Math.ceil(item.real.out)}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View className="flex-row space-y-1 justify-between">
          <View className="flex-row space-x-1">
            <Text
              className="text-base"
              style={{ color: themeColors.onSecondaryContainer }}
            >
              Daily budget
            </Text>
            <Text
              className="text-base font-semibold"
              style={{ color: themeColors.primary }}
            >
              €
              {(
                -(item.real.out - item.real.in) / getRemainingDaysInMonth(date)
              ).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
