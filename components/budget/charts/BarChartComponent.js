import { View } from "react-native";
import React from "react";
import { Canvas, RoundedRect, Text, useFont } from "@shopify/react-native-skia";
import {
  useSharedValue,
  withTiming,
  useDerivedValue,
} from "react-native-reanimated";
import { calculatePercentageDifference } from "~/utils/calculatePercentage";
import { themeColors } from "~/theme";

const WIDTH = 180;
const HEIGHT = 30;

export default function BarChartComponent({ forecast, real }) {
  const totalValue = useSharedValue(0);

  let percentage = real / forecast;
  percentage.toString() === "NaN" ? (percentage = 1) : null;

  const innerWidth = useSharedValue(0);
  innerWidth.value = withTiming(
    WIDTH * (percentage > 1 ? 1 : percentage) - (percentage > 0.9 ? 6 : 0),
    { duration: 1000 }
  );

  const diffPercentage = calculatePercentageDifference(real, forecast);

  totalValue.value = withTiming(percentage, { duration: 1000 });

  const targetText = useDerivedValue(
    () => `${Math.round(totalValue.value * 100)}%`,
    []
  );

  const font = useFont(require("~/assets/fonts/Roboto-Bold.ttf"), 16);
  const fontSize = font ? font.getTextWidth(`${Math.round(percentage * 100)}%`) : 0;

  return (
    <View>
      <Canvas className="flex-1" style={{ width: WIDTH, height: HEIGHT }}>
        <RoundedRect
          x={0}
          y={0}
          width={WIDTH}
          height={HEIGHT}
          r={10}
          color={themeColors.bgGrey(1)}
          opacity={0.8}
        />
        <RoundedRect
          x={3}
          y={3}
          width={innerWidth}
          height={HEIGHT - 6}
          r={6}
          color={themeColors.chartBlue(1)}
        />
        <Text
          color={themeColors.bgBlack(1)}
          text={targetText}
          x={WIDTH / 2 - fontSize / 2}
          y={HEIGHT / 2 + 6}
          font={font}
        />
      </Canvas>
    </View>
  );
}
