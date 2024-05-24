import { View, FlatList } from "react-native";
import React from "react";
import ChipCategoryComponent from "./ChipCategoryComponent";
import { useSelector } from "react-redux";

export default function ChipCategoryListComponent({ categoryListRef, isList }) {
  const { categories, activeCategory } = useSelector(
    (state) => state.categories
  );

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
          const isActive = item.id == activeCategory;
          return (
            <ChipCategoryComponent
              item={item}
              isActive={isActive}
              categoryListRef={categoryListRef}
              isList={isList}
            />
          );
        }}
      />
    </View>
  );
}
