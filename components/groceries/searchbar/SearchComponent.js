import { TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { themeColors } from "~/theme";
import Animated from "react-native-reanimated";
import { IconButton } from "react-native-paper";
import { useSelector } from "react-redux";

export default function SearchComponent({
  items,
  ingredients,
  setSearch,
  onlyIngredients,
  setOnlySelected,
  placeholderText,
}) {
  const activeCategory = useSelector((state) => state.groceries.activeCategory);

  const [text, setText] = useState("");

  useEffect(() => {
    setText("");
    setSearch(ingredients);
  }, [activeCategory]);

  function searchItems(text) {
    setText(text);

    const lowerText = text.toLowerCase();
    const subset = [
      ...items.filter((obj) => obj.title.toLowerCase().includes(lowerText)),
      ...ingredients.filter((obj) =>
        obj.title.toLowerCase().includes(lowerText)
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
        value={text}
        className="px-2 flex-1 text-base"
        style={{ color: themeColors.background }}
        selectionColor={themeColors.background}
        onChangeText={(text) => {
          searchItems(text);
          setOnlySelected(false);
        }}
      />
      <TouchableOpacity
        className="rounded-2xl p-0"
        style={{ backgroundColor: themeColors.background }}
        onPress={() => {
          searchItems("");
          setOnlySelected(false);
        }}
      >
        <IconButton
          size={20}
          icon="magnify-close"
          color={themeColors.onBackground}
        />
      </TouchableOpacity>
    </Animated.View>
  );
}
