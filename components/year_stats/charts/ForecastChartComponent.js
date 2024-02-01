import { View, Text, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { BarChart } from "react-native-chart-kit";
import { hexToRGBA, themeColors } from "~/theme";
import { months } from "~/utils/manageDate";
import { calculateMonthlyInOut } from "~/utils/calculateMoneyFlow";

export default function ForecastChartComponent({ items }) {
  let [labels, setLabels] = useState([]);
  let [datasets, setDatasets] = useState([]);

  useEffect(() => {
    labels = [];
    datasets = [];

    const short = items.length > 4;

    items.forEach((i) => {
      calculateMonthlyInOut(i.categories).then((inOut) => {
        const differenceReal = inOut.real.in - inOut.real.out;
        const differenceForecast = inOut.forecast.in - inOut.forecast.out;

        const totalBalance = differenceReal - differenceForecast;

        labels.push(
          short ? months[i.month - 1].shortName : months[i.month - 1].fullName
        );
        datasets.push(Math.round(totalBalance));

        setDatasets([...datasets]);
        setLabels([...labels]);
      });
    });
  }, [items]);

  return (
    <View className="mr-5">
      {labels.length > 0 && datasets.length > 0 ? (
        <View>
          <BarChart
          fromZero={true}
            data={{
              labels: [...labels],
              datasets: [
                {
                  data: [...datasets],
                },
              ],
            }}
            width={Dimensions.get("window").width - 10}
            height={250}
            yAxisLabel="€"
            yAxisInterval={1}
            chartConfig={{
              backgroundGradientFrom: themeColors.onSecondary,
              backgroundGradientTo: themeColors.onSecondary,
              decimalPlaces: 0,
              color: (opacity = 1) => hexToRGBA(themeColors.primary, opacity),
              labelColor: (opacity = 1) =>
                hexToRGBA(themeColors.onBackground, opacity),
              barPercentage: 6.5 / labels.length,
            }}
            showValuesOnTopOfBars
            withOuterLines={false}
            segments={3}
            withVerticalLines={false}
          />
        </View>
      ) : null}
    </View>
  );
}
