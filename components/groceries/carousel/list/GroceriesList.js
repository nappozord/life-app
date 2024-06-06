import { View, Text, RefreshControl, TouchableOpacity } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { MasonryFlashList } from "@shopify/flash-list";
import { getIngredientFromMeal } from "~/utils/manageIngredients";
import { themeColors } from "~/theme";
import GroceryComponent from "./GroceryComponent";
import { IconButton } from "react-native-paper";
import Animated, {
  FadeIn,
  SlideInUp,
  SlideOutUp,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { updateList } from "~/app/groceriesSlice";

export default function GroceriesList() {
  const { ingredientList, totalCost, groceryList } = useSelector(
    (state) => state.groceries.list
  );
  const meals = useSelector((state) => state.meals.meals);
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const recipes = useSelector((state) => state.recipes.recipes);
  const items = useSelector((state) => state.items.items);
  const week = useSelector((state) => state.groceries.week);

  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  useEffect(() => {
    dispatch(updateList({ meals, ingredients, recipes, items }));
  }, [meals, ingredients, recipes, items, week, groceryList]);

  return (
    <View className="flex-1 overflow-hidden" key={week[0].dateString}>
      <>
        <Animated.View
          entering={SlideInUp.duration(500)}
          exiting={SlideOutUp.duration(500)}
          style={{ elevation: 5 }}
        >
          <View
            className="px-4 py-1"
            style={{ backgroundColor: themeColors.success }}
            needsOffscreenAlphaCompositing={true}
          >
            <Text
              className=" text-lg font-semibold"
              style={{ color: themeColors.onSuccess }}
            >
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
                  progressBackgroundColor={themeColors.primaryContainer}
                  colors={[themeColors.onPrimaryContainer]}
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
                      ingredient: { id: -i - 1, title: "Add to List" },
                    };
                  }
                ),
              ]}
              keyExtractor={(item) => item.ingredient.id}
              renderItem={({ item }) => {
                return <GroceryComponent item={item} />;
              }}
            />
          ) : (
            <Animated.View entering={FadeIn} className="p-2">
              <TouchableOpacity
                className="m-1 rounded-2xl p-10 overflow-hidden"
                style={{
                  backgroundColor: themeColors.secondary,
                  elevation: 5,
                }}
              >
                <View className="justify-between items-center space-y-1">
                  <View className="">
                    <TouchableOpacity
                      className="rounded-full"
                      style={{ backgroundColor: themeColors.onSecondary }}
                    >
                      <IconButton
                        icon="emoticon-happy-outline"
                        size={28}
                        color={themeColors.secondary}
                      />
                    </TouchableOpacity>
                  </View>
                  <View className="">
                    <Text
                      className="text-lg text-center"
                      style={{ color: themeColors.onSecondary }}
                    >
                      You are all set up!
                    </Text>
                    <Text
                      className="text-sm text-center"
                      style={{ color: themeColors.onSecondary }}
                    >
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
