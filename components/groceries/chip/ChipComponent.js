import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { themeColors } from "~/theme";

export default function ChipComponent({
  item,
  isActive,
  setActiveChip,
  chipListRef,
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        chipListRef.current.scrollToIndex({
          animated: true,
          index: item.index,
        });
        setActiveChip(item.index);
      }}
      className="p-3 px-5 rounded-full mr-2 shadow"
      style={{
        marginLeft: item.index === 0 ? 18 : 0,
        backgroundColor: isActive ? themeColors.primary : themeColors.secondary,
      }}
    >
      <Text
        className="font-bold "
        style={{
          color: isActive ? themeColors.onPrimary : themeColors.onSecondary,
        }}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );
}
