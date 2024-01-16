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
  SlideInLeft,
} from "react-native-reanimated";

export default function GroceriesList({
  meals,
  setMeals,
  ingredients,
  setIngredients,
  recipes,
  setRecipes,
  week,
}) {
  const [groceryList, setGroceryList] = useState(calculateList);
  const [refreshing, setRefreshing] = useState(false);
  const totalCost = useRef(0);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
    setGroceryList(calculateList);
  }, [meals, ingredients, recipes, week]);

  useEffect(() => {
    console.log(week[0].dateString);
    setGroceryList(calculateList);
  }, [week]);

  const calculateList = () => {
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

    totalCost.current = 0;

    ingredientList.forEach(item => {
      totalCost.current += item.ingredient.cost;
    })

    return ingredientList.sort((a, b) =>
      a.ingredient.title > b.ingredient.title
        ? 1
        : b.ingredient.title > a.ingredient.title
        ? -1
        : 0
    );
  };

  return (
    <View className="flex-1">
      {groceryList && groceryList.length > 0 ? (
        <>
         <View className="mb-1" style={{backgroundColor: "rgba(0, 0, 0, 0)", elevation: 10}}>
          <View className="px-4 py-1" style={{backgroundColor: themeColors.chartGreen(0.5)}} needsOffscreenAlphaCompositing={true} >
            <Text className="text-gray-200 text-lg font-semibold">
              {"Total: €" + totalCost.current}
            </Text>
          </View></View>
          <MasonryFlashList
            numColumns={3}
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
              ...groceryList,
              { ingredient: { id: -1, title: "Add Ingredient" } },
            ]}
            keyExtractor={(item) => item.ingredient.id}
            renderItem={({ item }) => {
              return <GroceryComponent item={item} />;
            }}
          />
        </>
      ) : (
        <Animated.View entering={FadeIn}>
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
  );
}
