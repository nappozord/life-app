import { TouchableOpacity, View } from "react-native";
import React from "react";
import { themeColors } from "~/theme";
import {
  useSharedValue,
  withTiming,
  useDerivedValue,
} from "react-native-reanimated";
import { Canvas, Text, useFont } from "@shopify/react-native-skia";

export default function StatsChipComponent({ item }) {
  const totalValue = useSharedValue(0);

  totalValue.value = withTiming(item.description, { duration: 500 });

  const targetText = useDerivedValue(
    () => `€${totalValue.value.toFixed(2)}`,
    []
  );

  const font = useFont(require("~/assets/fonts/Roboto-Bold.ttf"), 20);
  const fontSize = font
    ? font.getTextWidth(`€${item.description.toFixed(2)}`)
    : 0;

  return (
    <View>
      <Canvas className="flex-1" style={{ width: fontSize, height: 30 }}>
        <Text
          color={item.textColor}
          text={targetText}
          x={0}
          y={22}
          font={font}
        />
      </Canvas>
    </View>
  );
}
