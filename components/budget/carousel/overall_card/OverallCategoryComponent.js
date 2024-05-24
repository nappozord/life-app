import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { themeColors } from "~/theme";
import DonutChartComponent from "~/components/budget/charts/DonutChartComponent";
import { IconButton } from "react-native-paper";
import BarChartComponent from "~/components/budget/charts/BarChartComponent";
import { getRemainingDaysInMonth } from "~/utils/manageDate";
import { calculateMonthlyInOut } from "~/utils/calculateMoneyFlow";

export default function OverallCategoryComponent({ item }) {
  const { categories, date } = useSelector(
    (state) => state.categories
  );

  const dispatch = useDispatch();

  const [total, setTotal] = useState(() => getOverall());

  useEffect(() => {
    getOverall();
  }, [dispatch]);

  function getOverall() {
    calculateMonthlyInOut(categories).then((inOut) => {
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
                real: total.real.out,
                forecast: total.real.in,
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
                    Total income
                  </Text>
                  <Text
                    className="text-xs font-semibold mt-0.5"
                    style={{ color: themeColors.primary }}
                  >
                    {"(bdgt. €" + Math.ceil(total.forecast.in) + ")"}
                  </Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <BarChartComponent
                    forecast={total.forecast.in}
                    real={total.real.in}
                  />
                  <View
                    className="p-1 px-3 rounded-full ml-3"
                    style={{ backgroundColor: themeColors.primary }}
                  >
                    <Text
                      className="text-base font-semibold"
                      style={{ color: themeColors.onPrimary }}
                    >
                      {"€" + Math.ceil(total.real.in)}
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
                    Total expenses
                  </Text>
                  <Text
                    className="text-xs font-semibold mt-0.5"
                    style={{ color: themeColors.primary }}
                  >
                    {"(bdgt. €" + Math.ceil(total.forecast.out) + ")"}
                  </Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <BarChartComponent
                    forecast={total.forecast.out}
                    real={total.real.out}
                  />
                  <View
                    className="p-1 px-3 rounded-2xl ml-3"
                    style={{ backgroundColor: themeColors.primary }}
                  >
                    <Text
                      className="text-base font-semibold"
                      style={{ color: themeColors.onPrimary }}
                    >
                      {"€" + Math.ceil(total.real.out)}
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
                    -(total.real.out - total.real.in) /
                    getRemainingDaysInMonth(date)
                  ).toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        </>
      ) : null}
    </Pressable>
  );
}
