import { View, FlatList } from "react-native";
import React, { useRef, useEffect, useCallback, useMemo } from "react";
import ChipCategoryComponent from "./ChipCategoryComponent";
import { useSelector } from "react-redux";

const MemoizedChipCategoryComponent = React.memo(ChipCategoryComponent);

export default function ChipCategoryListComponent({ isList }) {
  const categories = useSelector((state) => state.categories.categories);

  const activeCategory = useSelector(
    (state) => state.categories.activeCategory
  );

  const currentIndex = useRef(activeCategory);

  const chipsRef = useRef(null);

  useEffect(() => {
    if (chipsRef.current && activeCategory !== currentIndex.current) {
      chipsRef.current.scrollToIndex({
        animated: true,
        index: activeCategory,
      });
      currentIndex.current = activeCategory;
    }
  }, [activeCategory]);

  const renderItem = useCallback(
    ({ item }) => (
      <MemoizedChipCategoryComponent
        item={item}
        isList={isList}
        isActive={activeCategory === item.id}
      />
    ),
    [activeCategory, isList, categories]
  );

  const keyExtractor = useCallback(
    (item) => item.id,
    [activeCategory, isList, categories]
  );

  const data = useMemo(
    () => [{ id: -1, title: "Add", index: -1 }, ...categories],
    [categories]
  );

  return (
    <View>
      <FlatList
        ref={chipsRef}
        horizontal
        fadingEdgeLength={50}
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={keyExtractor}
        className="overflow-visible"
        renderItem={renderItem}
      />
    </View>
  );
}
