import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Animated, { SlideInRight, SlideOutRight } from "react-native-reanimated";
import React from "react";
import { themeColors } from "~/theme";
import { IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { deleteMeal } from "~/app/mealsSlice";

export default function MealListComponent({ day, type, recipe }) {
  const meals = useSelector((state) => state.meals.meals);
  const recipes = useSelector((state) => state.recipes.recipes);
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  const dispatch = useDispatch();

  const meal = meals.find((obj) => obj.date === day);

  function handleDeleteItem(item) {
    dispatch(
      deleteMeal({
        recipe,
        type,
        day,
        mealId: item.id,
      })
    );
  }

  const data = meal[type][recipe ? "recipes" : "ingredients"];

  return (
    <View className="flex-1 overflow-hidden">
      <ScrollView showsVerticalScrollIndicator={false}>
        {data.map((id) => {
          const item = recipe
            ? recipes.find((obj) => obj.id === id)
            : ingredients.find((obj) => obj.id === id.id);

          return item ? (
            <Animated.View
              key={day + "_" + type + "_" + (item.id ? item.id : item)}
              className="flex-1"
              entering={SlideInRight}
              exiting={SlideOutRight}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: themeColors.secondaryContainer,
                }}
                className="mt-2 px-2 py-1 rounded-lg"
              >
                <View className="flex-row justify-between -my-1 -mx-1 p-0">
                  <View className="flex-row items-center">
                    <IconButton
                      icon={recipe ? "food" : "apple"}
                      color={themeColors.onSecondaryContainer}
                      size={18}
                      className="m-0 p-0"
                    />
                    <Text
                      className="text-base ml-2"
                      style={{ color: themeColors.onSecondaryContainer }}
                    >
                      {item.title}
                    </Text>
                  </View>
                  <TouchableOpacity
                    className="rounded-3xl p-0 -mr-1 pl-5"
                    style={{
                      backgroundColor: themeColors.errorContainer,
                      borderTopLeftRadius: 50,
                      borderBottomLeftRadius: 50,
                    }}
                    onPress={() => {
                      handleDeleteItem(item);
                    }}
                  >
                    <IconButton
                      icon="delete-sweep"
                      color={themeColors.onErrorContainer}
                      size={24}
                      className="m-0 p-0"
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ) : null;
        })}
      </ScrollView>
    </View>
  );
}
