import { View, Text, FlatList } from "react-native";
import React from "react";
import ReservationCardComponent from "./ReservationCardComponent";
import { getCurrentWeek } from "~/utils/manageDate";
import { FlashList } from "@shopify/flash-list";

export default function WeeklyListComponent({
  groceries,
  setGroceries,
  ingredients,
  setIngredients,
  recipes,
  setRecipes,
  date,
  weekListRef,
  initialIndex,
}) {
  return (
    <View className="flex-1 mt-1">
      <FlashList
        ref={weekListRef}
        initialScrollIndex={initialIndex}
        estimatedItemSize={600}
        fadingEdgeLength={50}
        showsVerticalScrollIndicator={false}
        data={getCurrentWeek(date)}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => {
          return (
            <View className="m-5 my-2 flex-row">
              <View className="items-center">
                <Text className="text-gray-300">{item.dayName}</Text>
                <Text className="text-gray-300 text-4xl">{item.dayNumber}</Text>
              </View>
              <View className="flex-1">
                <ReservationCardComponent
                  groceries={groceries}
                  setGroceries={setGroceries}
                  ingredients={ingredients}
                  setIngredients={setIngredients}
                  recipes={recipes}
                  setRecipes={setRecipes}
                  day={item.date}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}