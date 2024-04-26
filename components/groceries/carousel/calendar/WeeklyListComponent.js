import { View, Text } from "react-native";
import React, { useEffect } from "react";
import ReservationCardComponent from "./ReservationCardComponent";
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
  weekListRef,
  initialIndex,
  defaultWeek,
  currentWeek,
}) {
  function setDefaultMeals(day, defaultMeal) {
    if (defaultMeal) {
      meals.push({
        date: day,
        breakfast: {
          ingredients: [],
          recipes: [],
        },
        lunch: {
          ingredients: [],
          recipes: [],
        },
        dinner: {
          ingredients: [],
          recipes: [],
        },
        snack: {
          ingredients: [],
          recipes: [],
        },
      });

      meals.find((obj) => obj.date === day)["breakfast"] = {
        ...defaultMeal["breakfast"],
      };
      meals.find((obj) => obj.date === day)["lunch"] = {
        ...defaultMeal["lunch"],
      };
      meals.find((obj) => obj.date === day)["dinner"] = {
        ...defaultMeal["dinner"],
      };
      meals.find((obj) => obj.date === day)["snack"] = {
        ...defaultMeal["snack"],
      };
      setMeals([...meals]);
    }
  }

  useEffect(() => {
    if (
      !defaultWeek &&
      !meals.find((obj) => obj.date === currentWeek[0].dateString) &&
      !meals.find((obj) => obj.date === currentWeek[1].dateString) &&
      !meals.find((obj) => obj.date === currentWeek[2].dateString) &&
      !meals.find((obj) => obj.date === currentWeek[3].dateString) &&
      !meals.find((obj) => obj.date === currentWeek[4].dateString) &&
      !meals.find((obj) => obj.date === currentWeek[5].dateString) &&
      !meals.find((obj) => obj.date === currentWeek[6].dateString)
    ) {
      setDefaultMeals(
        currentWeek[0].dateString,
        meals.find((obj) => obj.date === "Default_Mon")
      );
      setDefaultMeals(
        currentWeek[1].dateString,
        meals.find((obj) => obj.date === "Default_Tue")
      );
      setDefaultMeals(
        currentWeek[2].dateString,
        meals.find((obj) => obj.date === "Default_Wed")
      );
      setDefaultMeals(
        currentWeek[3].dateString,
        meals.find((obj) => obj.date === "Default_Thu")
      );
      setDefaultMeals(
        currentWeek[4].dateString,
        meals.find((obj) => obj.date === "Default_Fri")
      );
      setDefaultMeals(
        currentWeek[5].dateString,
        meals.find((obj) => obj.date === "Default_Sat")
      );
      setDefaultMeals(
        currentWeek[6].dateString,
        meals.find((obj) => obj.date === "Default_Sun")
      );
    }
  }, [currentWeek]);

  return (
    <View className="flex-1">
      <FlashList
        ref={weekListRef}
        initialScrollIndex={initialIndex}
        estimatedItemSize={600}
        fadingEdgeLength={50}
        showsVerticalScrollIndicator={false}
        data={currentWeek}
        keyExtractor={(item) => item.date}
        renderItem={({ index, item }) => {
          let meal = meals.find((obj) => obj.date === item.dateString);
          return (
            <View
              className={"m-5 my-2 flex-row " + (index === 0 ? "mt-4" : "")}
            >
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
                  {defaultWeek
                    ? item.date.split("_")[0]
                    : item.date.toLocaleString("default", { month: "short" })}
                </Text>
                {meal && meal.checked ? (
                  <IconButton
                    icon={"check-circle-outline"}
                    size={24}
                    className="m-0 p-0"
                    color={themeColors.primary}
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
                  defaultWeek={defaultWeek}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
