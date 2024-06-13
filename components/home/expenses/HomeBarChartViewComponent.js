import { View } from "react-native";
import React, { useEffect, useState } from "react";

import { themeColors } from "~/theme";
import BarChartComponent from "~/components/budget/charts/BarChartComponent";
import { useSelector } from "react-redux";
import { getCurrentMonthCategory } from "~/app/categoriesSlice";
import { calculateMonthlyInOut } from "~/utils/calculateMoneyFlow";

export default function HomeBarChartViewComponent() {
  const categories = useSelector((state) => getCurrentMonthCategory(state));

  const [width, setWidth] = useState(0);
  const [monthly, setMonthly] = useState(null);

  console.log(monthly);

  useEffect(() => {
    calculateMonthlyInOut(categories).then((r) => setMonthly(r));
  }, []);

  return (
    <View
      className="mx-4"
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setWidth(width);
      }}
    >
      <View className="flex-row items-center justify-center">
        <BarChartComponent
          real={monthly ? monthly.real.out : 0}
          forecast={monthly ? monthly.forecast.out : 0}
          width={width - width * 0.05}
        />
      </View>
    </View>
  );
}
