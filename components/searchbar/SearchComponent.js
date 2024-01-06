import { View, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { themeColors } from "../../theme";
import { MagnifyingGlassIcon } from "react-native-heroicons/solid";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function SearchComponent({ cardPressed }) {
  return (
    <Animated.View
      className="flex-row items-center rounded-full p-1"
      style={{ backgroundColor: themeColors.bgWhite(0.2), height: 50 }}
      entering={FadeIn.duration(1000)}
      exiting={FadeOut.duration(300)}
    >
      <TextInput
        placeholder="Search"
        placeholderTextColor={"lightgray"}
        className="px-4 flex-1 font-semibold text-gray-300"
        selectionColor={"lightgray"}
      />
      <TouchableOpacity
        className="rounded-full p-2"
        style={{ backgroundColor: themeColors.bgWhite(0.3) }}
      >
        <MagnifyingGlassIcon size="25" strokeWidth={2} color={"lightgray"} />
      </TouchableOpacity>
    </Animated.View>
  );
}
