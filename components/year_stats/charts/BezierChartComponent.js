import { View, Text, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { hexToRGBA, themeColors } from "~/theme";
import { months } from "~/utils/manageDate";
import { calculateMonthlyInOut } from "~/utils/calculateMoneyFlow";
import { useSelector } from "react-redux";

export default function BezierChartComponent() {
  const categories = useSelector((state) => state.stats.categories);

  let [labels, setLabels] = useState([]);
  let [datasets, setDatasets] = useState([]);

  useEffect(() => {
    labels = [];
    datasets = [];

    const short = categories.length > 4;

    categories.forEach((i) => {
      calculateMonthlyInOut(i.categories).then((inOut) => {
        const difference = inOut.real.in - inOut.real.out;

        const totalBalance = i.startingBalance + difference;

        labels.push(
          short ? months[i.month - 1].shortName : months[i.month - 1].fullName
        );
        datasets.push(totalBalance);

        setDatasets([...datasets]);
        setLabels([...labels]);
      });
    });
  }, [categories]);

  return (
    <View>
      {labels.length > 0 && datasets.length > 0 ? (
        <View>
          <LineChart
            data={{
              labels: [...labels],
              datasets: [
                {
                  data: [...datasets],
                },
              ],
            }}
            width={Dimensions.get("window").width}
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
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: themeColors.onBackground,
              },
            }}
            onDataPointClick={(dataPoint) => console.log(dataPoint)}
            bezier
            withOuterLines={false}
            segments={3}
            withVerticalLines={false}
          />
        </View>
      ) : null}
    </View>
  );
}
