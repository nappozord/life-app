import { View, Text } from "react-native";
import React from "react";
import ReservationCardComponent from "./ReservationCardComponent";
import { getCurrentWeek } from "~/utils/manageDate";
import { FlashList } from "@shopify/flash-list";
import { themeColors } from "~/theme";
import { IconButton } from "react-native-paper";

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
          let meal = meals.find((obj) => obj.date === item.dateString);
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
                {meal && meal.checked ? (
                  <IconButton
                    icon={"check-circle-outline"}
                    size={24}
                    className="m-0 p-0"
                    color={themeColors.onSecondaryContainer}
                  />
                ) : null}
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
