import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import SearchComponent from "~/components/groceries/searchbar/SearchComponent";
import { IconButton } from "react-native-paper";
import { themeColors } from "~/theme";
import IngredientSelectionListComponent from "./IngredientSelectionListComponent";

export default function IngredientSearchComponent({
  ingredients,
  selected,
  setSelected,
  items,
}) {
  const [search, setSearch] = useState([...ingredients, ...items]);
  const [onlySelected, setOnlySelected] = useState(false);

  useEffect(() => {
    if (onlySelected) {
      const ingredientsToShow = [];

      selected.forEach((sel) => {
        ingredientsToShow.push(ingredients.find((obj) => obj.id === sel.id));
      });

      setSearch(ingredientsToShow);
    } else {
      setSearch([...ingredients, ...items]);
    }
  }, [onlySelected]);

  return (
    <View className="mx-5 -mt-5">
      <Text
        className=" font-semibold text-lg ml-2 mb-1"
        style={{ color: themeColors.onSecondaryContainer }}
      >
        Search
      </Text>
      <View className="flex-row justify-between items-center">
        <View className="flex-1 mr-2">
          <SearchComponent
            items={[...items]}
            ingredients={[...ingredients]}
            setSearch={setSearch}
            onlyIngredients={true}
            setOnlySelected={setOnlySelected}
          />
        </View>
        <TouchableOpacity
          className="rounded-2xl p-0 m0"
          style={{ backgroundColor: themeColors.onSecondaryContainer }}
          onPress={() => {
            setOnlySelected(!onlySelected);
          }}
        >
          <IconButton
            size={35}
            icon={onlySelected ? "select-inverse" : "select-group"}
            color={themeColors.background}
            className="p-0 m-0"
          />
        </TouchableOpacity>
      </View>
      <View>
        <IngredientSelectionListComponent
          style={{ height: 450 }}
          search={search}
          items={items}
          ingredients={ingredients}
          selected={selected}
          setSelected={setSelected}
        />
      </View>
    </View>
  );
}
