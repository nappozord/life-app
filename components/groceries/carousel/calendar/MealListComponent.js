import { View, Text, FlatList, TouchableOpacity } from "react-native";
import Animated, { SlideInRight, SlideOutRight } from "react-native-reanimated";
import React from "react";
import { themeColors } from "~/theme";
import { IconButton } from "react-native-paper";

export default function MealListComponent({
  meals,
  setMeals,
  ingredients,
  setIngredients,
  recipes,
  setRecipes,
  day,
  type,
  recipe,
}) {
  const meal = meals.find((obj) => obj.date === day);

  function deleteItem(item) {
    if (recipe) {
      meal[type]["recipes"] = meal[type]["recipes"].filter(
        (obj) => obj !== item.id
      );
    } else {
      meal[type]["ingredients"] = meal[type]["ingredients"].filter(
        (obj) => obj.id !== item.id
      );
    }

    setMeals([...meals]);
  }

  return (
    <View className="flex-1 overflow-hidden">
      <FlatList
        keyExtractor={(item) =>
          day + "_" + type + "_" + (item.id ? item.id : item)
        }
        showsVerticalScrollIndicator={false}
        data={meal[type][recipe ? "recipes" : "ingredients"]}
        renderItem={(id) => {
          const item = recipe
            ? recipes.find((obj) => obj.id === id.item)
            : ingredients.find((obj) => obj.id === id.item.id);

          return (
            <Animated.View
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
                      deleteItem(item, id);
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
          );
        }}
      />
    </View>
  );
}
