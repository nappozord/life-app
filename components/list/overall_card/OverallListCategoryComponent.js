import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { themeColors } from "~/theme";
import DonutChartComponent from "~/components/budget/charts/DonutChartComponent";
import { IconButton } from "react-native-paper";
import BarChartComponent from "~/components/budget/charts/BarChartComponent";
import { getRemainingDaysInMonth } from "~/utils/manageDate";
import { calculateTotalLists } from "~/utils/calculateMoneyFlow";

export default function OverallListCategoryComponent({
  date,
  item,
  categories,
  user,
}) {
  const [total, setTotal] = useState(() => getOverall());

  useEffect(() => {
    getOverall();
  }, [categories]);

  function getOverall() {
    calculateTotalLists(categories).then((inOut) => {
      setTotal(inOut);
    });
  }

  return (
    <Pressable>
      {total ? (
        <>
          <View className="flex-row justify-center -mt-12">
            <DonutChartComponent
              item={{
                id: item.id,
                title: item.title,
                real: total.realBought,
                forecast: total.real,
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
                <View className="flex-row items-center space-x-1">
                  <Text
                    className="text-base"
                    style={{ color: themeColors.onSecondaryContainer }}
                  >
                    Total spent
                  </Text>
                  <Text
                    className="text-xs font-semibold mt-0.5"
                    style={{ color: themeColors.primary }}
                  >
                    {"(of €" + Math.ceil(total.real) + ")"}
                  </Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <BarChartComponent
                    forecast={total.real}
                    real={total.realBought}
                  />
                  <View
                    className="p-1 px-3 rounded-full ml-3"
                    style={{ backgroundColor: themeColors.primary }}
                  >
                    <Text
                      className="text-base font-semibold"
                      style={{ color: themeColors.onPrimary }}
                    >
                      {"€" + Math.ceil(total.realBought)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View className="flex-row mb-2">
              <View className="space-y-1">
                <View className="flex-row items-center space-x-1">
                  <Text
                    className="text-base"
                    style={{ color: themeColors.onSecondaryContainer }}
                  >
                    Total items bought
                  </Text>
                  <Text
                    className="text-xs font-semibold mt-0.5"
                    style={{ color: themeColors.primary }}
                  >
                    {"(of " + Math.ceil(total.items) + ")"}
                  </Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <BarChartComponent
                    forecast={total.items}
                    real={total.itemsBought}
                  />
                  <View
                    className="p-1 px-3 rounded-2xl ml-3"
                    style={{ backgroundColor: themeColors.primary }}
                  >
                    <Text
                      className="text-base font-semibold"
                      style={{ color: themeColors.onPrimary }}
                    >
                      {Math.ceil(total.itemsBought)}
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
                  Impact on balance:
                </Text>
                <Text
                  className="text-base font-semibold"
                  style={{ color: themeColors.primary }}
                >
                  €{(user.balance - (total.real - total.realBought)).toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        </>
      ) : null}
    </Pressable>
  );
}
