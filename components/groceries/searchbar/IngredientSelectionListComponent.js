import { View } from "react-native";
import React from "react";
import IngredientSelectionComponent from "./IngredientSelectionComponent";
import { FlashList } from "@shopify/flash-list";

export default function IngredientSelectionListComponent({
  items,
  ingredients,
  selected,
  setSelected,
}) {
  items.sort((a, b) => (a.title > b.title ? 1 : b.title > a.title ? -1 : 0));

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
        data={[...items, { id: -1 }]}
        renderItem={({ item }) => {
          return (
            <IngredientSelectionComponent
              item={item}
              selected={selected}
              setSelected={setSelected}
              ingredients={ingredients}
            />
          );
        }}
      />
    </View>
  );
}
