import { getNextDays } from "./manageDate";
import { sortByDate } from "./sortItems";

function countIngredients(ingredient, meal) {
  let count = 0;

  const calculate = (obj) => {
    if (obj.id === ingredient.id) {
      count += obj.quantity > 0 ? obj.quantity : 0.01;
    }
  };

  meal.breakfast.ingredients.forEach((obj) => {
    calculate(obj);
  });
  meal.dinner.ingredients.forEach((obj) => {
    calculate(obj);
  });
  meal.lunch.ingredients.forEach((obj) => {
    calculate(obj);
  });
  meal.snack.ingredients.forEach((obj) => {
    calculate(obj);
  });

  return count;
}

function countIngredientInRecipes(ingredient, meal, recipes) {
  let count = 0;

  const calculate = (obj) => {
    const recipe = recipes.find((r) => r.id === obj);
    if (recipe) {
      const ing = recipe.ingredients.find((i) => i.id === ingredient.id);
      count += ing ? (ing.quantity > 0 ? ing.quantity : 0.01) : 0;
    }
  };

  meal.breakfast.recipes.forEach((obj) => {
    calculate(obj);
  });

  meal.dinner.recipes.forEach((obj) => {
    calculate(obj);
  });

  meal.lunch.recipes.forEach((obj) => {
    calculate(obj);
  });

  meal.snack.recipes.forEach((obj) => {
    calculate(obj);
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

  if (totalCount > 0 && ingredient.stock === 0) percentage = 0;

  return percentage;
}

export function calculateItemUsage(item, date) {
  const durationDays = item.duration * 7;

  let totalDays = item.buyingDate.length * durationDays;

  item.buyingDate = sortByDate(item.buyingDate);

  const differenceDays =
    (Date.parse(date) - Date.parse(item.buyingDate[0])) / (1000 * 60 * 60 * 24);

  totalDays -= differenceDays;

  if (totalDays < 0 || !totalDays) totalDays = 0;

  return totalDays / durationDays;
}
