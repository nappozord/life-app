import { View } from "react-native";
import React from "react";
import {
  useSharedValue,
  withTiming,
  useDerivedValue,
} from "react-native-reanimated";
import { Canvas, Path, Skia, Text, useFont } from "@shopify/react-native-skia";
import { calculatePercentage } from "~/utils/calculatePercentage";
import DonutPathComponent from "./DonutPathComponent";
import { themeColors } from "~/theme";

const RADIUS = 100;
const STROKE_WIDTH = 40;
const OUTER_STROKE_WIDTH = 50;
const GAP = 0.07;

export default function DonutChartComponent({ item, showTotal }) {
  const path = Skia.Path.Make();
  const innerRadius = RADIUS - OUTER_STROKE_WIDTH / 2;
  path.addCircle(RADIUS, RADIUS, innerRadius);

  const totalValue = useSharedValue(0);
  const decimals = useSharedValue([]);

  const difference = Math.abs(item.forecast) - Math.abs(item.real);

  const generateNumbers = [
    Math.round(item.real),
    difference >= 0 ? Math.round(difference) : 0,
  ];
  const total = item.forecast;

  const generatePercentages = calculatePercentage(generateNumbers, total);
  const generateDecimals = generatePercentages.map(
    (number) => Number(number.toFixed(0)) / 100
  );

  const chartText = showTotal
    ? Math.abs(item.real)
    : item.income
    ? -difference
    : difference;

  totalValue.value = withTiming(chartText, { duration: 1000 });
  decimals.value = [...generateDecimals];

  const targetText = useDerivedValue(
    () => `€${Math.round(totalValue.value)}`,
    []
  );

  const font = useFont(require("~/assets/fonts/Roboto-Bold.ttf"), 30);
  const fontSize = font ? font.getTextWidth(`€${Math.round(chartText)}`) : 0;

  let color;

  if (item.income)
    color = -difference >= 0 ? themeColors.chartGreen(1) : themeColors.chartRed(1);
  else color = difference >= 0 ? themeColors.chartBlue(1) : themeColors.chartRed(1);

  return (
    <View>
      <Canvas
        className="flex-1"
        style={{ width: RADIUS * 2, height: RADIUS * 2 }}
      >
        <Path
          path={path}
          color={themeColors.bgGrey(1)}
          style="stroke"
          strokeJoin="round"
          strokeWidth={OUTER_STROKE_WIDTH}
          strokeCap="round"
          start={0}
          end={1}
        />
        <DonutPathComponent
          key={0}
          radius={RADIUS}
          strokeWidth={STROKE_WIDTH}
          outerStrokeWidth={OUTER_STROKE_WIDTH}
          color={color}
          decimals={decimals}
          index={0}
          gap={
            Math.abs(item.forecast) - Math.abs(item.real) > 0
              ? decimals.value[0] < 0.9
                ? 0
                : GAP
              : 0
          }
        />
        <Text
          color={themeColors.bgBlack(1)}
          text={targetText}
          x={RADIUS - fontSize / 2}
          y={RADIUS + 10}
          font={font}
        />
      </Canvas>
    </View>
  );
}
