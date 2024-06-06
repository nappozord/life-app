import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { themeColors } from "~/theme";
import DonutChartComponent from "~/components/budget/charts/DonutChartComponent";
import { IconButton } from "react-native-paper";
import BarChartComponent from "~/components/budget/charts/BarChartComponent";
import { calculateTotalLists } from "~/utils/calculateMoneyFlow";
import { useSelector } from "react-redux";

export default function OverallListCategoryComponent() {
  const lists = useSelector((state) => state.lists.lists);

  const user = useSelector((state) => state.user.user);

  const list = lists[0];

  const [total, setTotal] = useState(() => getOverall());

  useEffect(() => {
    getOverall();
  }, [lists]);

  function getOverall() {
    calculateTotalLists(lists).then((inOut) => {
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
                id: 0,
                real: total.bought,
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
                {list.title}
              </Text>
              <IconButton icon={list.icon} color={themeColors.primary} />
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
                    real={total.bought}
                  />
                  <View
                    className="p-1 px-3 rounded-full ml-3"
                    style={{ backgroundColor: themeColors.primary }}
                  >
                    <Text
                      className="text-base font-semibold"
                      style={{ color: themeColors.onPrimary }}
                    >
                      {"€" + Math.ceil(total.bought)}
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
                  €{(user.balance - (total.real - total.bought)).toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        </>
      ) : null}
    </Pressable>
  );
}
