import { getMeals, updateMeals } from "~/api/apiMeals";
import { getIngredients, updateIngredients } from "~/api/apiIngredients";
import { getRecipes, updateRecipes } from "~/api/apiRecipes";
import { updateLogs } from "~/api/apiLogs";

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

function calculateIngredientCheck(
  date,
  recipes,
  ingredients,
  meals,
  setFutureIngredients
) {
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

        meal.breakfast.recipes.forEach((r) => {
          recipes.find((obj) => obj.id === r)
            ? (recipes.find((obj) => obj.id === r).used += 1)
            : null;
        });

        meal.snack.recipes.forEach((r) => {
          recipes.find((obj) => obj.id === r)
            ? (recipes.find((obj) => obj.id === r).used += 1)
            : null;
        });

        meal.dinner.recipes.forEach((r) => {
          recipes.find((obj) => obj.id === r)
            ? (recipes.find((obj) => obj.id === r).used += 1)
            : null;
        });

        meal.lunch.recipes.forEach((r) => {
          recipes.find((obj) => obj.id === r)
            ? (recipes.find((obj) => obj.id === r).used += 1)
            : null;
        });

        meals.find((o) => o.date === meal.date).checked = true;
      }
    });

    logs = [];

    weeklyIngredients.forEach((i) => {
      ingredients.find((obj) => obj.id === i.ingredient.id).stock -= parseFloat(
        (i.needed / i.ingredient.quantity).toFixed(3)
      );

      if (ingredients.find((obj) => obj.id === i.ingredient.id).stock < 0)
        ingredients.find((obj) => obj.id === i.ingredient.id).stock = 0;

      logs.push({
        text:
          "REMOVE " +
          ingredients.find((obj) => obj.id === i.ingredient.id).title,
        description:
          "Automatic remove of item " +
          ingredients.find((obj) => obj.id === i.ingredient.id).title +
          " for a total of " +
          ingredients.find((obj) => obj.id === i.ingredient.id).stock +
          ".",
        icon: "minus",
        auto: true,
      });
    });

    if (!setFutureIngredients) {
      updateLogs(logs);
      updateRecipes([...recipes]);
      updateMeals([...meals]);
      updateIngredients([...ingredients]);
    } else {
      setFutureIngredients([...ingredients]);
    }
  }
}

export function checkIngredientQuantity(
  date,
  futureIngredients,
  setFutureIngredients,
  ingredients,
  recipes,
  meals
) {
  if (!futureIngredients) {
    getIngredients().then((_ingredients) => {
      if (_ingredients) {
        getRecipes().then((_recipes) => {
          if (_recipes) {
            getMeals().then((_meals) => {
              calculateIngredientCheck(date, _recipes, _ingredients, _meals);
            });
          }
        });
      }
    });
  } else {
    calculateIngredientCheck(
      date,
      recipes,
      ingredients,
      meals,
      setFutureIngredients
    );
  }
}
