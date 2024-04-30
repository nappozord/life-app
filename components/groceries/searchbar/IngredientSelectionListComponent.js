import { View } from "react-native";
import React from "react";
import IngredientSelectionComponent from "./IngredientSelectionComponent";
import { FlashList } from "@shopify/flash-list";
import { sortByName } from "~/utils/sortItems";

export default function IngredientSelectionListComponent({
  search,
  ingredients,
  selected,
  setSelected,
  items,
}) {
  return (
    <View
      style={{
        height: 450,
      }}
      className="mt-1"
    >
      <FlashList
        estimatedItemSize={50}
        keyExtractor={(item) => item.title + item.id}
        showsVerticalScrollIndicator={false}
        fadingEdgeLength={100}
        data={[...sortByName(search), { id: -1 }]}
        renderItem={({ item }) => {
          return (
            <IngredientSelectionComponent
              item={item}
              selected={selected}
              setSelected={setSelected}
              ingredients={ingredients}
              items={items}
            />
          );
        }}
      />
    </View>
  );
}
