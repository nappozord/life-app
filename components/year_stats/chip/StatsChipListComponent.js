import { View, TouchableOpacity, Text } from "react-native";
import React, { useEffect, useState } from "react";
import StatsChipComponent from "./StatsChipComponent";
import { themeColors } from "~/theme";

export default function StatsChipListComponent({ items }) {
  let [totalIncome, setTotalIncome] = useState(0);
  let [totalOutcome, setTotalOutcome] = useState(0);

  useEffect(() => {
    calculateTotals();
  }, [items]);

  function calculateTotals() {
    totalIncome = 0;
    totalOutcome = 0;

    items.forEach((i) => {
      totalIncome += i.categories[0].real.in;
      totalOutcome += i.categories[0].real.out;
      setTotalIncome(totalIncome);
      setTotalOutcome(totalOutcome);
    });
  }

  const data = [
    {
      title: "Income",
      description: totalIncome,
      color: themeColors.success,
      textColor: themeColors.onSuccess,
    },
    {
      title: "Difference",
      description: totalIncome - totalOutcome,
      color: themeColors.primary,
      textColor: themeColors.onPrimary,
    },
    {
      title: "Outcome",
      description: totalOutcome,
      color: themeColors.errorContainer,
      textColor: themeColors.onErrorContainer,
    },
  ];

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
