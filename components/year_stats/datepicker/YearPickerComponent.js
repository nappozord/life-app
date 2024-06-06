import { View, Pressable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Animated, {
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
} from "react-native-reanimated";
import { IconButton } from "react-native-paper";
import { themeColors } from "~/theme";
import { useDispatch, useSelector } from "react-redux";
import { updateYear } from "~/app/statsSlice";

export default function YearPickerComponent() {
  const year = useSelector((state) => state.stats.year);

  const dispatch = useDispatch();

  const [animation, setAnimation] = useState("left");
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <View className="flex-row px-2 justify-between items-center">
      <TouchableOpacity
        onPress={() => {
          setAnimation("left");
          dispatch(updateYear(year - 1));
        }}
      >
        <IconButton
          icon="chevron-left"
          size={30}
          color={themeColors.onBackground}
        />
      </TouchableOpacity>
      <Pressable className="flex-row justify-between items-center -ml-6">
        <IconButton
          className="ml-0"
          icon="calendar-start"
          size={24}
          color={themeColors.primary}
        />
        <Animated.Text
          key={year}
          entering={animation === "left" ? SlideInLeft : SlideInRight}
          exiting={animation === "left" ? SlideOutRight : SlideOutLeft}
          className="font-semibold text-2xl"
          style={{ color: themeColors.onBackground }}
        >
          {(year === currentYear ? "Year to Date, " : "Full Year, ") + year}
        </Animated.Text>
      </Pressable>
      <TouchableOpacity
        onPress={() => {
          setAnimation("right");
          if (year < currentYear) dispatch(updateYear(year + 1));
        }}
      >
        <IconButton
          icon="chevron-right"
          size={30}
          color={themeColors.onBackground}
        />
      </TouchableOpacity>
    </View>
  );
}
