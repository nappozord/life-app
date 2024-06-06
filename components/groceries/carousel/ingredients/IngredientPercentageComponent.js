import React from "react";
import { ProgressBar } from "react-native-paper";
import { useSelector } from "react-redux";
import { themeColors } from "~/theme";
import { calculateIngredientUsage } from "~/utils/calculateUsage";
import { getIngredient } from "~/app/ingredientsSlice";

export default function IngredientPercentageComponent({ ingredientId }) {
  const ingredient = useSelector((state) => getIngredient(state, ingredientId));
  const meals = useSelector((state) => state.meals.meals);
  const recipes = useSelector((state) => state.recipes.recipes);

  const progress = calculateIngredientUsage(
    ingredient,
    meals,
    recipes,
    new Date(),
    7
  );

  return (
    <ProgressBar
      style={{ height: 6 }}
      progress={progress}
      color={progress > 0.5 ? themeColors.primary : themeColors.errorContainer}
    />
  );
}
