import { View, FlatList } from "react-native";
import React, { useRef, useEffect, useCallback, useMemo } from "react";
import ChipListCategoryComponent from "./ChipListCategoryComponent";
import { useSelector } from "react-redux";

const MemoizedChipCategoryComponent = React.memo(ChipListCategoryComponent);

export default function ChipListCategoryListComponent() {
  const lists = useSelector((state) => state.lists.lists);

  const activeCategory = useSelector((state) => state.lists.activeCategory);

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
        isActive={activeCategory === item.id}
      />
    ),
    [activeCategory, lists]
  );

  const keyExtractor = useCallback((item) => item.id, [activeCategory, lists]);

  const data = useMemo(
    () => [{ id: -1, title: "Add", index: -1 }, ...lists],
    [lists]
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
