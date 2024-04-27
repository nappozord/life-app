import { TextInput, Pressable } from "react-native";
import React from "react";
import { themeColors } from "~/theme";
import Animated from "react-native-reanimated";
import { IconButton } from "react-native-paper";

export default function SearchComponent({
  items,
  ingredients,
  setSearch,
  onlyIngredients,
  setOnlySelected,
  placeholderText,
}) {
  function searchItems(text) {
    const subset = [
      ...items.filter((obj) =>
        obj.title.toLowerCase().includes(text.toLowerCase())
      ),
      ...ingredients.filter((obj) =>
        obj.title.toLowerCase().includes(text.toLowerCase())
      ),
    ];
    setSearch(subset);
  }

  return (
    <Animated.View
      className="flex-row items-center rounded-2xl p-1"
      style={{ backgroundColor: themeColors.onSecondaryContainer, height: 50 }}
    >
      <TextInput
        placeholder={
          placeholderText
            ? placeholderText
            : onlyIngredients
            ? "Type an ingredient"
            : "Type a recipe or ingredient"
        }
        className="px-2 flex-1 text-base"
        style={{ color: themeColors.background }}
        selectionColor={themeColors.background}
        onChangeText={(text) => {
          searchItems(text);
          setOnlySelected(false);
        }}
      />
      <Pressable
        className="rounded-2xl p-0"
        style={{ backgroundColor: themeColors.background }}
      >
        <IconButton size={20} icon="magnify" color={themeColors.onBackground} />
      </Pressable>
    </Animated.View>
  );
}
