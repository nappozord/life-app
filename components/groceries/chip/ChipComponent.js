import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { themeColors } from "~/theme";
import { useDispatch } from "react-redux";
import { updateActiveCategory } from "~/app/groceriesSlice";

export default function ChipComponent({ item, isActive }) {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(updateActiveCategory(item.id));
      }}
      className="p-3 px-5 rounded-full mr-2 shadow"
      style={{
        marginLeft: item.id === 0 ? 18 : 0,
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
