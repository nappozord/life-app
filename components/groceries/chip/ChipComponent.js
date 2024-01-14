import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { themeColors } from "~/theme";

export default function ChipComponent({
  item,
  isActive,
  setActiveChip,
  chipListRef,
}) {
  let activeTextClass = isActive ? "text-gray-300" : "text-gray-800";

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
        backgroundColor: isActive
          ? themeColors.bgWhite(0.1)
          : themeColors.bgWhite(0.4),
      }}
    >
      <Text className={"font-bold " + activeTextClass}>{item.title}</Text>
    </TouchableOpacity>
  );
}
