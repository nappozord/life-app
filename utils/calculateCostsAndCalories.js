export function calculateRecipeCostsAndCalories(recipe, ingredients) {
  let total = {
    costs: 0,
    calories: 0,
  };

  recipe.ingredients.forEach((item) => {
    const ingredient = ingredients.filter((obj) => obj.id === item.id);

    if (ingredient[0]) {
      total.costs +=
        (parseFloat(ingredient[0].cost) / parseFloat(ingredient[0].quantity)) *
        (parseFloat(item.quantity) > 0 ? parseFloat(item.quantity) : 0.01);

      total.calories +=
        (parseFloat(ingredient[0].calories)
          ? parseFloat(ingredient[0].calories)
          : 0) *
        (parseFloat(item.quantity) > 0 ? parseFloat(item.quantity) : 0.01);
    }
  });
  return {
    costs: total.costs.toFixed(2),
    calories: total.calories.toFixed(2),
  };
}

export function calculateMealCostsAndCalories(
  meal,
  type,
  ingredients,
  recipes
) {
  let total = {
    costs: 0,
    calories: 0,
  };

  if (meal) {
    meal[type].ingredients.forEach((ingredient) => {
      const ing = ingredients.find((i) => i.id === ingredient.id);
      if (ing) {
        total.costs +=
          (parseFloat(ing.cost) / parseFloat(ing.quantity)) *
          (parseFloat(ingredient.quantity) > 0
            ? parseFloat(ingredient.quantity)
            : 0.01);

        total.calories +=
          (parseFloat(ing.calories) ? parseFloat(ing.calories) : 0) *
          (parseFloat(ingredient.quantity) > 0
            ? parseFloat(ingredient.quantity)
            : 0.01);
      }
    });

    meal[type].recipes.forEach((recipe) => {
      let tot = { costs: 0, calories: 0 };
      const r = recipes.find((r) => r.id === recipe);
      if (r) tot = calculateRecipeCostsAndCalories(r, ingredients);

      total.costs += parseFloat(tot.costs);

      total.calories += parseFloat(tot.calories);
    });
  }

  return {
    costs: total.costs.toFixed(2),
    calories: total.calories.toFixed(2),
  };
}

export function calculateRecipeCosts(recipe, ingredients) {
  return calculateRecipeCostsAndCalories(recipe, ingredients).costs;
}

export function calculateMealCosts(meal, type, ingredients, recipes) {
  return calculateMealCostsAndCalories(meal, type, ingredients, recipes).costs;
}

export function calculateRecipeCalories(recipe, ingredients) {
  return calculateRecipeCostsAndCalories(recipe, ingredients).calories;
}

export function calculateMealCalories(meal, type, ingredients, recipes) {
  return calculateMealCostsAndCalories(meal, type, ingredients, recipes)
    .calories;
}
