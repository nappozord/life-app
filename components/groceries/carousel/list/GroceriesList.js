import {
  View,
  Text,
  RefreshControl,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { getCurrentWeek } from "~/utils/manageDate";
import { FlashList, MasonryFlashList } from "@shopify/flash-list";
import { getIngredientFromMeal } from "~/utils/manageIngredients";
import { themeColors } from "~/theme";
import GroceryComponent from "./GroceryComponent";
import { IconButton } from "react-native-paper";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideInLeft,
  SlideInUp,
  SlideOutUp,
} from "react-native-reanimated";

export default function GroceriesList({
  meals,
  setMeals,
  ingredients,
  setIngredients,
  recipes,
  setRecipes,
  week,
  groceryList,
  setGroceryList,
}) {
  const [refreshing, setRefreshing] = useState(false);
  const [ingredientList, setIngredientList] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
    setIngredientList(calculateNewList);
  }, [meals, ingredients, recipes, week, groceryList]);

  useEffect(() => {
    setIngredientList([]);
    setIngredientList(calculateNewList);
  }, [meals, ingredients, recipes, week, groceryList]);

  useEffect(() => {
    let count = 0;

    ingredientList.forEach((item) => {
      count +=
        parseFloat(item.ingredient.cost) *
        Math.ceil(item.needed / parseFloat(item.ingredient.quantity));
    });

    setTotalCost(count);
  }, [ingredientList]);

  const calculateNewList = () => {
    let ingredientList = [];

    week.forEach((day) => {
      const meal = meals.find((obj) => obj.date === day.dateString);
      if (meal) {
        getIngredientFromMeal(
          meal,
          "breakfast",
          ingredients,
          recipes,
          ingredientList
        );
        getIngredientFromMeal(
          meal,
          "snack",
          ingredients,
          recipes,
          ingredientList
        );
        getIngredientFromMeal(
          meal,
          "lunch",
          ingredients,
          recipes,
          ingredientList
        );
        getIngredientFromMeal(
          meal,
          "dinner",
          ingredients,
          recipes,
          ingredientList
        );
      }
    });

    ingredientList = ingredientList.filter(
      (obj) => obj.needed > obj.ingredient.stock * obj.ingredient.quantity
    );

    ingredientList = mergeLists(ingredientList);

    return ingredientList.sort((a, b) =>
      a.ingredient.title > b.ingredient.title
        ? 1
        : b.ingredient.title > a.ingredient.title
        ? -1
        : 0
    );
  };

  function mergeLists(ingredientList) {
    ingredientList = setAdded(ingredientList);
    ingredientList = setExcluded(ingredientList);
    ingredientList = setChecked(ingredientList);

    return ingredientList;
  }

  function setAdded(ingredientList) {
    groceryList.added.forEach((obj) => {
      if (ingredientList.find((i) => i.ingredient.id === obj.id)) {
        ingredientList.find((i) => i.ingredient.id === obj.id).needed =
          obj.quantity;
      } else {
        ingredientList.push({
          ingredient: ingredients.find((i) => i.id === obj.id),
          needed: obj.quantity,
          onCart: 0,
        });
      }
    });

    return ingredientList;
  }

  function setExcluded(ingredientList) {
    groceryList.excluded.forEach((obj) => {
      if (ingredientList.find((i) => i.ingredient.id === obj.id)) {
        ingredientList.find((i) => i.ingredient.id === obj.id).needed -=
          obj.quantity;
        if (
          ingredientList.find((i) => i.ingredient.id === obj.id).needed <= 0
        ) {
          ingredientList = ingredientList.filter(
            (i) => i.ingredient.id !== obj.id
          );
        }
      }
    });

    return ingredientList;
  }

  function setChecked(ingredientList) {
    groceryList.checked.forEach((obj) => {
      if (ingredientList.find((i) => i.ingredient.id === obj.id)) {
        ingredientList.find((i) => i.ingredient.id === obj.id).onCart =
          obj.quantity;
      } else {
        ingredientList.push({
          ingredient: ingredients.find((i) => i.id === obj.id),
          needed: obj.quantity,
          onCart: obj.quantity,
        });
      }
    });

    return ingredientList;
  }

  return (
    <View className="flex-1 overflow-hidden" key={week[0].dateString}>
      <>
        <Animated.View
          entering={SlideInUp.duration(500)}
          exiting={SlideOutUp.duration(500)}
          style={{ backgroundColor: "rgba(0, 0, 0, 0)", elevation: 10 }}
        >
          <View
            className="px-4 py-1"
            style={{ backgroundColor: themeColors.chartGreen(0.6) }}
            needsOffscreenAlphaCompositing={true}
          >
            <Text className="text-gray-200 text-lg font-semibold">
              {"Total: €" + parseFloat(totalCost).toFixed(2)}
            </Text>
          </View>
        </Animated.View>
        <View className="flex-1 px-1">
          {ingredientList && ingredientList.length > 0 ? (
            <MasonryFlashList
              numColumns={2}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  progressBackgroundColor={themeColors.chartBlue(1)}
                  colors={[themeColors.bgWhite(0.3)]}
                />
              }
              estimatedItemSize={600}
              fadingEdgeLength={50}
              showsVerticalScrollIndicator={false}
              data={[
                ...ingredientList,
                ...Array.from(
                  { length: ingredientList.length % 2 === 0 ? 2 : 1 },
                  (_, i) => {
                    return {
                      ingredient: { id: -i - 1, title: "Add Ingredient" },
                    };
                  }
                ),
              ]}
              keyExtractor={(item) => item.ingredient.id}
              renderItem={({ item }) => {
                return (
                  <GroceryComponent
                    item={item}
                    ingredientList={ingredientList}
                    setIngredientList={setIngredientList}
                    groceryList={groceryList}
                    setGroceryList={setGroceryList}
                    ingredients={ingredients}
                    setIngredients={setIngredients}
                  />
                );
              }}
            />
          ) : (
            <Animated.View entering={FadeIn} className="p-2">
              <TouchableOpacity
                className="m-1 rounded-2xl p-10 overflow-hidden"
                style={{ backgroundColor: themeColors.bgWhite(0.3) }}
              >
                <View className="justify-between items-center space-y-1">
                  <View className="">
                    <TouchableOpacity
                      className="rounded-full"
                      style={{ backgroundColor: themeColors.bgBlack(0.1) }}
                    >
                      <IconButton
                        icon="emoticon-happy-outline"
                        size={28}
                        color={themeColors.bgBlack(0.9)}
                      />
                    </TouchableOpacity>
                  </View>
                  <View className="">
                    <Text className="text-gray-800 text-lg text-center">
                      You are all set up!
                    </Text>
                    <Text className="text-gray-800 text-sm text-center">
                      No more things to buy this week
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>
      </>
    </View>
  );
}
