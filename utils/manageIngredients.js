import { addLog } from "~/app/logsSlice";
import { checkMeal } from "~/app/mealsSlice";
import { updateRecipeUsage } from "~/app/recipesSlice";
import { incrementIngredient } from "~/app/ingredientsSlice";

export function getIngredientFromMeal(
  meal,
  type,
  ingredients,
  recipes,
  weeklyIngredients
) {
  if (meal) {
    meal[type].ingredients.forEach((ingredient) => {
      searchIngredients(ingredient, ingredients, weeklyIngredients);
    });

    meal[type].recipes.forEach((r) => {
      const recipe = recipes.find((obj) => obj.id === r);

      if (recipe) {
        recipe.ingredients.forEach((ingredient) => {
          searchIngredients(ingredient, ingredients, weeklyIngredients);
        });
      }
    });
  }
}

function searchIngredients(ingredient, ingredients, weeklyIngredients) {
  if (weeklyIngredients.find((i) => i.ingredient.id === ingredient.id)) {
    weeklyIngredients.find((i) => i.ingredient.id === ingredient.id).needed +=
      ingredient.quantity;
  } else {
    const ing = ingredients.find((i) => i.id === ingredient.id);

    if (ing) {
      weeklyIngredients.push({
        ingredient: { ...ing },
        needed: ingredient.quantity > 0 ? ingredient.quantity : 0.01,
        onCart: 0,
      });
    }
  }
}

function calculateIngredientCheck(date, recipes, ingredients, meals, dispatch) {
  if (meals) {
    let yesterday = new Date(date);
    yesterday.setDate(yesterday.getDate() - 1);
    const filteredMeals = meals.filter(
      (obj) => !obj.checked && new Date(obj.date) < yesterday
    );
    const weeklyIngredients = [];
    filteredMeals.forEach((meal) => {
      if (meal) {
        getIngredientFromMeal(
          meal,
          "breakfast",
          ingredients,
          recipes,
          weeklyIngredients
        );
        getIngredientFromMeal(
          meal,
          "snack",
          ingredients,
          recipes,
          weeklyIngredients
        );
        getIngredientFromMeal(
          meal,
          "lunch",
          ingredients,
          recipes,
          weeklyIngredients
        );
        getIngredientFromMeal(
          meal,
          "dinner",
          ingredients,
          recipes,
          weeklyIngredients
        );

        dispatch(checkMeal(meal.date));
        dispatch(updateRecipeUsage(meal.breakfast.recipes));
        dispatch(updateRecipeUsage(meal.snack.recipes));
        dispatch(updateRecipeUsage(meal.dinner.recipes));
        dispatch(updateRecipeUsage(meal.lunch.recipes));
      }
    });

    weeklyIngredients.forEach((i) => {
      const ingredient = ingredients.find((obj) => obj.id === i.ingredient.id);
      const quantity =
        ingredient.stock -
        parseFloat((i.needed / i.ingredient.quantity).toFixed(3));

      dispatch(
        incrementIngredient({ id: ingredient.id, quantity, auto: true })
      );
    });
  }
}

export function checkIngredientQuantity(date, state, dispatch) {
  const ingredients = state.ingredients.ingredients;
  const recipes = state.recipes.recipes;
  const meals = state.meals.meals;

  calculateIngredientCheck(date, recipes, ingredients, meals, dispatch);
}
