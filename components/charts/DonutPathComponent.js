import React from "react";
import { Path, Skia } from "@shopify/react-native-skia";
import { useDerivedValue, withTiming } from "react-native-reanimated";

export default function DonutPathComponent({
  radius,
  strokeWidth,
  outerStrokeWidth,
  decimals,
  index,
  color,
  gap,
}) {
  const innerRadius = radius - outerStrokeWidth / 2;

  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);

  const start = useDerivedValue(() => {
    return 0;
  });

  const end = useDerivedValue(() => {
    const decimal = decimals.value.slice(0, index + 1);
    const sum = decimal.reduce((acc, currentValue) => acc + currentValue, 0);

    return withTiming(sum - gap, { duration: 1000 });
  });

  return (
    <Path
      path={path}
      color={color}
      style={"stroke"}
      strokeWidth={strokeWidth}
      strokeJoin={"round"}
      strokeCap={"round"}
      start={start}
      end={end}
    />
  );
}
