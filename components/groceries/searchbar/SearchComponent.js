import { TextInput, Pressable } from "react-native";
import React from "react";
import { themeColors } from "~/theme";
import Animated from "react-native-reanimated";
import { IconButton } from "react-native-paper";

export default function SearchComponent({
  items,
  setSearch,
  onlyIngredients,
  setOnlySelected,
  placeholderText,
}) {
  function searchItems(text) {
    const subset = items.filter((obj) =>
      obj.title.toLowerCase().includes(text.toLowerCase())
    );
    setSearch(subset);
  }

  return (
    <Animated.View
      className="flex-row items-center rounded-2xl p-1"
      style={{ backgroundColor: themeColors.bgWhite(0.6), height: 50 }}
    >
      <TextInput
        placeholder={
          placeholderText
            ? placeholderText
            : onlyIngredients
            ? "Type an ingredient"
            : "Type a recipe or ingredient"
        }
        className="px-2 flex-1 text-gray-700 text-base"
        selectionColor={themeColors.bgBlack(1)}
        onChangeText={(text) => {
          searchItems(text);
          setOnlySelected(false);
        }}
      />
      <Pressable
        className="rounded-2xl p-0"
        style={{ backgroundColor: themeColors.bgBlack(1) }}
      >
        <IconButton size={20} icon="magnify" color={themeColors.bgGrey(1)} />
      </Pressable>
    </Animated.View>
  );
}
