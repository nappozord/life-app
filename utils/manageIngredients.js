import {
  getMeals,
  getIngredients,
  getRecipes,
  updateIngredients,
  updateMeals,
  updateRecipes,
  updateLogs,
} from "~/api/apiManager";

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

export function checkIngredientQuantity() {
  getIngredients().then((ingredients) => {
    if (ingredients) {
      getRecipes().then((recipes) => {
        if (recipes) {
          getMeals().then((r) => {
            if (r) {
              let yesterday = new Date();
              yesterday.setDate(yesterday.getDate() - 1);
              const meals = r.filter(
                (obj) => !obj.checked && new Date(obj.date) < yesterday
              );
              const weeklyIngredients = [];
              meals.forEach((meal) => {
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
                  recipes.find((obj) => obj.id === r).used += 1;
                });

                meal.snack.recipes.forEach((r) => {
                  recipes.find((obj) => obj.id === r).used += 1;
                });

                meal.dinner.recipes.forEach((r) => {
                  recipes.find((obj) => obj.id === r).used += 1;
                });

                meal.lunch.recipes.forEach((r) => {
                  recipes.find((obj) => obj.id === r).used += 1;
                });

                r.find((o) => o.date === meal.date).checked = true;
              });

              logs = [];

              weeklyIngredients.forEach((i) => {
                ingredients.find((obj) => obj.id === i.ingredient.id).stock -=
                  parseFloat((i.needed / i.ingredient.quantity).toFixed(3));

                if (
                  ingredients.find((obj) => obj.id === i.ingredient.id).stock <
                  0
                )
                  ingredients.find(
                    (obj) => obj.id === i.ingredient.id
                  ).stock = 0;

                logs.push({
                  text:
                    "REMOVE " +
                    ingredients.find((obj) => obj.id === i.ingredient.id).title,
                  description:
                    "Automatic remove of item " +
                    ingredients.find((obj) => obj.id === i.ingredient.id)
                      .title +
                    " for a total of " +
                    ingredients.find((obj) => obj.id === i.ingredient.id)
                      .stock +
                    ".",
                  icon: "minus",
                  auto: true,
                });
              });

              updateLogs(logs);
              updateRecipes([...recipes]);
              updateMeals([...r]);
              updateIngredients([...ingredients]);
            }
          });
        }
      });
    }
  });
}
