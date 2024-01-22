import { View, Text } from "react-native";
import React from "react";
import ReservationCardComponent from "./ReservationCardComponent";
import { getCurrentWeek } from "~/utils/manageDate";
import { FlashList } from "@shopify/flash-list";
import { themeColors } from "~/theme";

export default function WeeklyListComponent({
  meals,
  setMeals,
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
                <Text style={{ color: themeColors.onSecondaryContainer }}>
                  {item.dayName}
                </Text>
                <Text
                  className="text-4xl"
                  style={{ color: themeColors.onSecondaryContainer }}
                >
                  {item.dayNumber}
                </Text>
                <Text
                  className="-mt-1"
                  style={{ color: themeColors.onSecondaryContainer }}
                >
                  {item.date.toLocaleString("default", { month: "short" })}
                </Text>
              </View>
              <View className="flex-1">
                <ReservationCardComponent
                  meals={meals}
                  setMeals={setMeals}
                  ingredients={ingredients}
                  setIngredients={setIngredients}
                  recipes={recipes}
                  setRecipes={setRecipes}
                  day={item.dateString}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
