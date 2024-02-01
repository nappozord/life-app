import { View, TouchableOpacity, Text } from "react-native";
import React, { useEffect, useState } from "react";
import StatsChipComponent from "./StatsChipComponent";
import { themeColors } from "~/theme";
import { calculateYearlyInOut } from "~/utils/calculateMoneyFlow";

export default function StatsChipListComponent({ items }) {
  let [data, setData] = useState([]);

  useEffect(() => {
    calculateYearlyInOut(items).then((r) => {
      setData([
        {
          title: "Income",
          description: r.real.in,
          color: themeColors.success,
          textColor: themeColors.onSuccess,
        },
        {
          title: "Difference",
          description: r.real.in - r.real.out,
          color: themeColors.primary,
          textColor: themeColors.onPrimary,
        },
        {
          title: "Outcome",
          description: r.real.out,
          color: themeColors.errorContainer,
          textColor: themeColors.onErrorContainer,
        },
      ]);
    });
  }, [items]);

  return (
    <View className="flex-row justify-between mx-5 space-x-3">
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
              <StatsChipComponent item={item} />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}
