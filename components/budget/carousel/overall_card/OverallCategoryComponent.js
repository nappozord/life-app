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
          <Text className="text-3xl text-gray-800 font-semibold z-10">
            {item.title}
          </Text>
          <IconButton icon={item.icon} color={themeColors.bgBlack(1)} />
        </View>
        <View className="flex-row">
          <View className="space-y-1">
            <Text className="text-base text-gray-700 font-semibold">
              Total income:
            </Text>
            <View className="flex-row justify-between items-center">
              <BarChartComponent
                forecast={item.forecast.in}
                real={item.real.in}
              />
              <View
                className="p-1 px-3 rounded-full ml-3"
                style={{ backgroundColor: themeColors.bgWhite(0.3) }}
              >
                <Text className="text-base font-semibold text-gray-800">
                  {"€" + Math.ceil(item.real.in)}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View className="flex-row mb-2">
          <View className="space-y-1">
            <Text className="text-base text-gray-700 font-semibold">
              Total expenses:
            </Text>
            <View className="flex-row justify-between items-center">
              <BarChartComponent
                forecast={item.forecast.out}
                real={item.real.out}
              />
              <View
                className="p-1 px-3 rounded-full ml-3"
                style={{ backgroundColor: themeColors.bgWhite(0.3) }}
              >
                <Text className="text-base font-semibold text-gray-800">
                  {"€" + Math.ceil(item.real.out)}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View className="flex-row space-y-1 justify-between">
          
          <View className="flex-row space-x-1">
            <Text className="text-base text-gray-700 font-semibold">
              Daily budget
            </Text>
            <Text className="text-base text-gray-800 font-semibold">
              €{(-(item.real.out - item.real.in)/getRemainingDaysInMonth(date)).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
