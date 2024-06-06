import { getPreviousWeeks } from "./manageDate";
import { sortByChecked } from "./sortItems";
import { getIngredientFromMeal } from "./manageIngredients";

export const calculateNewList = ({
  meals,
  ingredients,
  recipes,
  items,
  week,
  groceryList,
  groceries,
}) => {
  const weeks = getPreviousWeeks(week[0].dateString);

  let futureIngredients = [
    ...JSON.parse(JSON.stringify(ingredients)),
    ...JSON.parse(JSON.stringify(items)),
  ];

  let weeklyList = [];

  for (let w = 0; w < weeks.length; w++) {
    if (w != weeks.length - 1) {
      const weeklyList = calculateWeeklyList(
        weeks[w],
        futureIngredients,
        meals,
        recipes,
        groceries,
        ingredients,
        items
      );
      futureIngredients = setPreviousWeekIngredients(
        weeklyList,
        futureIngredients
      );
    } else {
      weeklyList = calculateWeeklyList(
        weeks[w],
        futureIngredients,
        meals,
        recipes,
        groceries,
        ingredients,
        items
      );
    }
  }

  weeklyList = weeklyList.filter((obj) => {
    if (groceryList.added.find((a) => a.id === obj.ingredient.id)) return true;
    return (
      obj.needed > obj.ingredient.stock * obj.ingredient.quantity || obj.checked
    );
  });

  return sortByChecked(weeklyList);
};

const calculateWeeklyList = (
  week,
  futureIngredients,
  meals,
  recipes,
  groceries,
  ingredients,
  items
) => {
  let ingredientList = [];

  const filteredWeek = week.filter((day) => new Date(day.date) > new Date());

  filteredWeek.forEach((day) => {
    const meal = meals.find((obj) => obj.date === day.dateString);
    if (meal) {
      getIngredientFromMeal(
        meal,
        "breakfast",
        futureIngredients,
        recipes,
        ingredientList
      );
      getIngredientFromMeal(
        meal,
        "snack",
        futureIngredients,
        recipes,
        ingredientList
      );
      getIngredientFromMeal(
        meal,
        "lunch",
        futureIngredients,
        recipes,
        ingredientList
      );
      getIngredientFromMeal(
        meal,
        "dinner",
        futureIngredients,
        recipes,
        ingredientList
      );
    }
  });

  ingredientList = mergeLists(
    ingredientList,
    week,
    groceries,
    ingredients,
    items
  );

  ingredientList.forEach((i) => (i.reallyNeeded = i.needed));

  return ingredientList.sort((a, b) =>
    a.ingredient.title > b.ingredient.title
      ? 1
      : b.ingredient.title > a.ingredient.title
      ? -1
      : 0
  );
};

function mergeLists(ingredientList, week, groceries, ingredients, items) {
  let list = {
    date: week[0].dateString,
    checked: [],
    added: [],
    excluded: [],
  };

  if (groceries && groceries.find((obj) => obj.date === week[0].dateString)) {
    list = groceries.find((obj) => obj.date === week[0].dateString);
  }

  ingredientList = setAdded(ingredientList, list, ingredients, items);
  ingredientList = setExcluded(ingredientList, list);
  ingredientList = setChecked(ingredientList, list, ingredients, items);

  return ingredientList;
}

function setAdded(ingredientList, list, ingredients, items) {
  total = [...ingredients, ...items];
  list.added.forEach((obj) => {
    if (ingredientList.find((i) => i.ingredient.id === obj.id)) {
      ingredientList.find((i) => i.ingredient.id === obj.id).needed =
        obj.quantity;
    } else if (total.find((i) => i.id === obj.id)) {
      ingredientList.push({
        ingredient: total.find((i) => i.id === obj.id),
        needed: obj.quantity,
        onCart: 0,
      });
    }
  });

  return ingredientList;
}

function setExcluded(ingredientList, list) {
  list.excluded.forEach((obj) => {
    if (ingredientList.find((i) => i.ingredient.id === obj.id)) {
      ingredientList.find((i) => i.ingredient.id === obj.id).needed -=
        obj.quantity;
      if (ingredientList.find((i) => i.ingredient.id === obj.id).needed <= 0) {
        ingredientList = ingredientList.filter(
          (i) => i.ingredient.id !== obj.id
        );
      }
    }
  });

  return ingredientList;
}

function setChecked(ingredientList, list, ingredients, items) {
  total = [...ingredients, ...items];
  list.checked.forEach((obj) => {
    if (ingredientList.find((i) => i.ingredient.id === obj.id)) {
      ingredientList.find((i) => i.ingredient.id === obj.id).onCart =
        obj.quantity;
      ingredientList.find((i) => i.ingredient.id === obj.id).checked = true;
    } else {
      const ing = total.find((i) => i.id === obj.id);
      ingredientList.push({
        ingredient: ing,
        needed: obj.quantity,
        onCart: obj.quantity,
        checked: true,
      });
    }
  });

  return ingredientList;
}

function setPreviousWeekIngredients(list, futureIngredients) {
  list.forEach((i) => {
    const total = (
      Math.ceil(
        i.needed / (i.ingredient.quantity ? i.ingredient.quantity : 1) -
          i.ingredient.stock
      ) - parseFloat(i.reallyNeeded / i.ingredient.quantity)
    ).toFixed(4);

    const stock = (
      futureIngredients.find((obj) => obj.id === i.ingredient.id).stock +
      parseFloat(total)
    ).toFixed(4);

    futureIngredients.find((obj) => obj.id === i.ingredient.id).stock =
      parseFloat(stock);
  });

  return futureIngredients;
}
