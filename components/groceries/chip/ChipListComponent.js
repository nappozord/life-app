import { View, FlatList } from "react-native";
import React, { useRef, useEffect, useCallback } from "react";
import ChipComponent from "./ChipComponent";
import { useSelector } from "react-redux";

const MemoizedChipComponent = React.memo(ChipComponent);

export default function ChipListComponent() {
  const categories = useSelector((state) => state.groceries.categories);

  const activeCategory = useSelector((state) => state.groceries.activeCategory);

  const currentIndex = useRef(activeCategory);

  const chipsRef = useRef(null);

  useEffect(() => {
    if (chipsRef.current && activeCategory !== currentIndex.current) {
      chipsRef.current.scrollToIndex({
        animated: true,
        index: activeCategory,
        viewPosition: 0.1,
      });
      currentIndex.current = activeCategory;
    }
  }, [activeCategory]);

  const renderItem = useCallback(
    ({ item }) => (
      <MemoizedChipComponent
        item={item}
        isActive={activeCategory === item.id}
      />
    ),
    [activeCategory, categories]
  );

  const keyExtractor = useCallback(
    (item) => item.id,
    [activeCategory, categories]
  );

  return (
    <View>
      <FlatList
        ref={chipsRef}
        horizontal
        fadingEdgeLength={50}
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={keyExtractor}
        className="overflow-visible"
        renderItem={renderItem}
      />
    </View>
  );
}
