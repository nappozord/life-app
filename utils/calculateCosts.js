export function calculateRecipeCosts(recipe, ingredients) {
  let total = 0;

  recipe.ingredients.forEach((item) => {
    const ingredient = ingredients.filter((obj) => obj.id === item.id);

    total +=
      (parseFloat(ingredient[0].cost) / parseFloat(ingredient[0].quantity)) *
      (parseFloat(item.quantity) > 0 ? parseFloat(item.quantity) : 0.01);
  });
  return total.toFixed(2);
}

export function calculateMealCosts(meal, type, ingredients, recipes) {
  let total = 0;

  if (meal) {
    meal[type].ingredients.forEach((ingredient) => {
      const ing = ingredients.find((i) => i.id === ingredient.id);
      if (ing) {
        total +=
          (parseFloat(ingredients.find((i) => i.id === ingredient.id).cost) /
            parseFloat(
              ingredients.find((i) => i.id === ingredient.id).quantity
            )) *
          (parseFloat(ingredient.quantity) > 0 ? parseFloat(ingredient.quantity) : 0.01);
      }
    });

    meal[type].recipes.forEach((recipe) => {
      total += parseFloat(
        calculateRecipeCosts(
          recipes.find((r) => r.id === recipe),
          ingredients
        )
      );
    });
  }

  return total.toFixed(2);
}
