import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import ReservationCardComponent from "./ReservationCardComponent";
import { FlashList } from "@shopify/flash-list";
import { themeColors } from "~/theme";
import { IconButton } from "react-native-paper";
import { calculateMealCostsAndCalories } from "~/utils/calculateCostsAndCalories";

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
  const [totals, setTotals] = useState([]);

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
    } else {
    }
  }, [currentWeek]);

  useEffect(() => {
    setTotals([]);
    currentWeek.forEach((mealDate) => {
      const meal = meals.find((obj) => obj.date === mealDate.dateString);
      if (meal) {
        const breakfast = calculateMealCostsAndCalories(meal, "breakfast", ingredients, recipes);
        const lunch = calculateMealCostsAndCalories(meal, "lunch", ingredients, recipes);
        const dinner = calculateMealCostsAndCalories(meal, "dinner", ingredients, recipes);
        const snack = calculateMealCostsAndCalories(meal, "snack", ingredients, recipes)

        const costs = (
          parseFloat(
            breakfast.costs
          ) +
          parseFloat(lunch.costs) +
          parseFloat(dinner.costs) +
          parseFloat(snack.costs)
        ).toFixed(2);

        const calories = (
          parseFloat(
            breakfast.calories
          ) +
          parseFloat(lunch.calories) +
          parseFloat(dinner.calories) +
          parseFloat(snack.calories)
        ).toFixed(0);

        if (totals.find((obj) => obj.dayNumber === mealDate.dayNumber)) {
          totals.find((obj) => obj.dayNumber === mealDate.dayNumber).costs =
            costs;
          totals.find((obj) => obj.dayNumber === mealDate.dayNumber).calories =
            calories
        } else {
          totals.push({
            dayNumber: mealDate.dayNumber,
            costs: costs,
            calories: calories,
          });
        }
        setTotals([...totals]);
      }
    });
  }, [meals, currentWeek]);

  return (
    <View className="flex-1">
      <FlashList
        ref={weekListRef}
        initialScrollIndex={initialIndex}
        estimatedItemSize={600}
        fadingEdgeLength={50}
        showsVerticalScrollIndicator={false}
        data={currentWeek}
        extraData={totals}
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
                <View
                  className="px-2 rounded-xl flex-row items-center my-1"
                  style={{ backgroundColor: themeColors.primary, elevation: 5 }}
                >
                  <Text
                    className="text-base font-semibold"
                    style={{ color: themeColors.onPrimary }}
                  >
                    {"€" +
                      (totals.find((obj) => obj.dayNumber === item.dayNumber)
                        ? totals.find((obj) => obj.dayNumber === item.dayNumber)
                            .costs
                        : "0.00")}
                  </Text>
                </View>
                <View
                  className="px-2 rounded-xl items-center justify-center my-1"
                  style={{ backgroundColor: themeColors.primary, elevation: 5, maxWidth: 60, minWidth: 55  }}
                >
                
                  <Text
                    className="text-lg font-semibold"
                    style={{ color: themeColors.onPrimary }}
                  >
                    {(totals.find((obj) => obj.dayNumber === item.dayNumber)
                      ? totals.find((obj) => obj.dayNumber === item.dayNumber)
                          .calories
                      : "0")}
                  </Text>
                  <Text
                    className="text-sm font-semibold -mt-1 mb-1"
                    style={{ color: themeColors.onPrimary }}
                  >
                    {"Kcal"}
                  </Text>
                </View>
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
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
