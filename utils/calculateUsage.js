import { getNextDays } from "./manageDate";

function countIngredients(ingredient, meal) {
  let count = 0;

  meal.breakfast.ingredients.forEach((obj) => {
    if (obj.id === ingredient.id) {
      count += obj.quantity;
    }
  });
  meal.dinner.ingredients.forEach((obj) => {
    if (obj.id === ingredient.id) {
      count += obj.quantity;
    }
  });
  meal.lunch.ingredients.forEach((obj) => {
    if (obj.id === ingredient.id) {
      count += obj.quantity;
    }
  });
  meal.snack.ingredients.forEach((obj) => {
    if (obj.id === ingredient.id) {
      count += obj.quantity;
    }
  });

  return count;
}

function countIngredientInRecipes(ingredient, meal, recipes) {
  let count = 0;

  meal.breakfast.recipes.forEach((obj) => {
    const recipe = recipes.find((r) => r.id === obj);
    if (recipe) {
      const ing = recipe.ingredients.find((i) => i.id === ingredient.id);
      count += ing ? ing.quantity : 0;
    }
  });

  meal.dinner.recipes.forEach((obj) => {
    const recipe = recipes.find((r) => r.id === obj);
    if (recipe) {
      const ing = recipe.ingredients.find((i) => i.id === ingredient.id);
      count += ing ? ing.quantity : 0;
    }
  });

  meal.lunch.recipes.forEach((obj) => {
    const recipe = recipes.find((r) => r.id === obj);
    if (recipe) {
      const ing = recipe.ingredients.find((i) => i.id === ingredient.id);
      count += ing ? ing.quantity : 0;
    }
  });

  meal.snack.recipes.forEach((obj) => {
    const recipe = recipes.find((r) => r.id === obj);
    if (recipe) {
      const ing = recipe.ingredients.find((i) => i.id === ingredient.id);
      count += ing ? ing.quantity : 0;
    }
  });

  return count;
}

export function calculateIngredientUsage(
  ingredient,
  meals,
  recipes,
  date,
  range
) {
  const daysInRange = getNextDays(date, range);

  totalCount = 0;

  daysInRange.forEach((day) => {
    meals.find((obj) => {
      if (obj.date === day) {
        totalCount += countIngredients(ingredient, obj);
        totalCount += countIngredientInRecipes(ingredient, obj, recipes);
      }
    });
  });

  let percentage = 1;

  if (totalCount > 0)
    percentage = (ingredient.quantity * ingredient.stock) / totalCount;

  if(totalCount > 0 && ingredient.stock === 0) percentage = 0;

  return percentage;
}
