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
