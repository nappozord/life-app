import { useRef, useState } from "react";
import { View, FlatList } from "react-native";
import ReservationTypeComponent from "./ReservationTypeComponent";
import { FlashList } from "@shopify/flash-list";
import Animated, { SlideInRight } from "react-native-reanimated";

export default function ReservationCardComponent({
  groceries,
  setGroceries,
  ingredients,
  setIngredients,
  recipes,
  setRecipes,
  day,
}) {
  const types = [
    {
      type: "breakfast",
      icon: "coffee",
    },
    {
      type: "snack",
      icon: "candy",
    },
    {
      type: "lunch",
      icon: "food-fork-drink",
    },
    {
      type: "dinner",
      icon: "bowl-mix",
    },
  ];

  return (
    <View className="flex-1 ml-4">
      <Animated.View entering={SlideInRight} className="flex-1 mb-1">
        <ReservationTypeComponent
          groceries={groceries}
          setGroceries={setGroceries}
          ingredients={ingredients}
          setIngredients={setIngredients}
          recipes={recipes}
          setRecipes={setRecipes}
          day={day}
          type={types[0]}
        />
      </Animated.View>
      <Animated.View entering={SlideInRight} className="flex-1 mb-1">
        <ReservationTypeComponent
          groceries={groceries}
          setGroceries={setGroceries}
          ingredients={ingredients}
          setIngredients={setIngredients}
          recipes={recipes}
          setRecipes={setRecipes}
          day={day}
          type={types[1]}
        />
      </Animated.View>
      <Animated.View entering={SlideInRight} className="flex-1 mb-1">
        <ReservationTypeComponent
          groceries={groceries}
          setGroceries={setGroceries}
          ingredients={ingredients}
          setIngredients={setIngredients}
          recipes={recipes}
          setRecipes={setRecipes}
          day={day}
          type={types[2]}
        />
      </Animated.View>
      <Animated.View entering={SlideInRight} className="flex-1 mb-1">
        <ReservationTypeComponent
          groceries={groceries}
          setGroceries={setGroceries}
          ingredients={ingredients}
          setIngredients={setIngredients}
          recipes={recipes}
          setRecipes={setRecipes}
          day={day}
          type={types[3]}
        />
      </Animated.View>
    </View>
  );
}
