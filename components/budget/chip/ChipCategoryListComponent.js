import { View, FlatList } from "react-native";
import React from "react";
import ChipCategoryComponent from "./ChipCategoryComponent";

export default function ChipCategoryListComponent({
  categories,
  setCategories,
  activeCategory,
  setActiveCategory,
  categoryListRef,
}) {
  return (
    <View>
      <FlatList
        ref={categoryListRef}
        horizontal
        fadingEdgeLength={50}
        showsHorizontalScrollIndicator={false}
        data={[
          {
            id: -1,
            title: "Add",
            index: -1,
          },
          ...categories,
        ]}
        keyExtractor={(item) => item.id}
        className="overflow-visible"
        renderItem={({ item }) => {
          let isActive = item.id == activeCategory;
          return (
            <ChipCategoryComponent
              item={item}
              isActive={isActive}
              setActiveCategory={setActiveCategory}
              categoryListRef={categoryListRef}
              categories={categories}
              setCategories={setCategories}
            />
          );
        }}
      />
    </View>
  );
}
