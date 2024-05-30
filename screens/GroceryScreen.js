import React, { useState, useRef } from "react";
import { View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import Animated, {
  FadeIn,
  FadeOut,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useSelector } from "react-redux";

import ChipListComponent from "~/components/groceries/chip/ChipListComponent";
import HeaderComponent from "~/components/header/HeaderComponent";
import GroceriesCarouselComponent from "~/components/groceries/carousel/GroceriesCarouselComponent";

export default function GroceryScreen() {
  const user = useSelector((state) => state.user.user);
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const meals = useSelector((state) => state.meals.meals);
  const recipes = useSelector((state) => state.recipes.recipes);

  const [activeChip, setActiveChip] = useState(0);
  const chipListRef = useRef(null);

  const categories = [
    {
      index: 0,
      title: "Meal Plan",
    },
    {
      index: 1,
      title: "Groceries",
    },
    {
      index: 2,
      title: "Recipes",
    },
    {
      index: 3,
      title: "Ingredients",
    },
    {
      index: 4,
      title: "General",
    },
  ];

  const searchBarHeight = useSharedValue(76);

  const searchBarAnimatedStyle = useAnimatedStyle(() => ({
    height: searchBarHeight.value,
  }));

  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <Image
        className="absolute h-full w-full"
        source={require("~/assets/splash.png")}
        //blurRadius={80}
      />
      {user.userId ? (
        <>
          <View className="mt-16 flex-1">
            <Animated.View style={searchBarAnimatedStyle} className="mx-5">
              <HeaderComponent />
            </Animated.View>
            <View className="mb-4 -mt-1">
              <ChipListComponent
                categories={categories}
                activeChip={activeChip}
                setActiveChip={setActiveChip}
                chipListRef={chipListRef}
              />
            </View>
            {meals && ingredients && recipes ? (
              <Animated.View
                className="justify-end flex-1"
                entering={FadeIn}
                exiting={FadeOut}
              >
                <View className="pb-24">
                  <GroceriesCarouselComponent
                    categories={categories}
                    activeChip={activeChip}
                    setActiveChip={setActiveChip}
                    chipListRef={chipListRef}
                  />
                </View>
              </Animated.View>
            ) : (
              <View
                className="justify-end mx-5 flex-1"
                style={{
                  borderRadius: 25,
                }}
              />
            )}
          </View>
        </>
      ) : (
        <View></View>
      )}
    </View>
  );
}
