import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Animated, { SlideInRight, SlideOutRight } from "react-native-reanimated";
import React from "react";
import { themeColors } from "~/theme";
import { Divider, IconButton } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";

export default function MealListComponent({
  groceries,
  setGroceries,
  ingredients,
  setIngredients,
  recipes,
  setRecipes,
  day,
  type,
  recipe,
}) {
  const grocery = groceries.find((obj) => obj.date === day);

  function deleteItem(item) {
    if (recipe) {
      grocery[type]["recipes"] = grocery[type]["recipes"].filter(
        (obj) => obj !== item.id
      );
    } else {
      grocery[type]["ingredients"] = grocery[type]["ingredients"].filter(
        (obj) => obj.id !== item.id
      );
    }

    setGroceries([...groceries]);
  }

  return (
    <View className="flex-1 overflow-hidden">
      <FlatList
        //estimatedItemSize={40}
        keyExtractor={(item) => day + "_" + type + "_" + item.id}
        showsVerticalScrollIndicator={false}
        data={grocery[type][recipe ? "recipes" : "ingredients"]}
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
                  backgroundColor: themeColors.chartBlue(0.6),
                }}
                className="mt-2 px-2 py-1 rounded-lg"
              >
                <View className="flex-row justify-between -my-1 -mx-1 p-0">
                  <View className="flex-row items-center">
                    <IconButton
                      icon={recipe ? "food" : "apple"}
                      color={themeColors.bgWhite(0.7)}
                      size={18}
                      className="m-0 p-0"
                    />
                    <Text className="text-base text-gray-200 ml-2">
                      {item.title}
                    </Text>
                  </View>
                  <TouchableOpacity
                    className="rounded-3xl p-0 -mr-1 pl-5"
                    style={{
                      backgroundColor: themeColors.chartRed(1),
                      borderTopLeftRadius: 50,
                      borderBottomLeftRadius: 50,
                    }}
                    onPress={() => {
                      deleteItem(item, id);
                    }}
                  >
                    <IconButton
                      icon="delete-sweep"
                      color={themeColors.bgWhite(0.8)}
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
