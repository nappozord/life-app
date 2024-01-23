import { View } from "react-native";
import React from "react";
import ChipComponent from "./ChipComponent";
import { FlashList } from "@shopify/flash-list";

export default function ChipListComponent({
  categories,
  activeChip,
  setActiveChip,
  chipListRef,
}) {
  return (
    <View>
      <FlashList
        estimatedItemSize={50}
        ref={chipListRef}
        horizontal
        fadingEdgeLength={50}
        showsHorizontalScrollIndicator={false}
        data={[...categories]}
        keyExtractor={(item) => item.index}
        className="overflow-visible"
        renderItem={({ item }) => {
          let isActive = item.index == activeChip;
          return (
            <ChipComponent
              item={item}
              isActive={isActive}
              setActiveChip={setActiveChip}
              chipListRef={chipListRef}
            />
          );
        }}
      />
    </View>
  );
}
