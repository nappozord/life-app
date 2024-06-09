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
    if (
      groceryList.added.find((a) => a.id === obj.ingredient.id) ||
      obj.checked
    )
      return true;
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

  const defaultMeals = calculateDefaultMeal(meals, week);

  const filteredWeek = week.filter((day) => new Date(day.date) > new Date());

  filteredWeek.forEach((day) => {
    const meal =
      defaultMeals.length === 0
        ? meals.find((obj) => obj.date === day.dateString)
        : defaultMeals.find((obj) => obj.date === day.dateString);
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
      ingredientList.find((i) => i.ingredient.id === obj.id).needed +=
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
    const ingredient = ingredientList.find((i) => i.ingredient.id === obj.id);
    if (ingredient) {
      ingredient.onCart = obj.quantity;
      if (obj.quantity * ingredient.ingredient.quantity >= ingredient.needed)
        ingredient.checked = true;
    }
  });

  return ingredientList;
}

function setPreviousWeekIngredients(list, futureIngredients) {
  list.forEach((i) => {
    const totalRemaining = (
      Math.ceil(
        i.needed / (i.ingredient.quantity ? i.ingredient.quantity : 1) -
          i.ingredient.stock
      ) - parseFloat(i.reallyNeeded / i.ingredient.quantity)
    ).toFixed(4);

    const stock = (
      futureIngredients.find((obj) => obj.id === i.ingredient.id).stock +
      parseFloat(totalRemaining)
    ).toFixed(4);

    futureIngredients.find((obj) => obj.id === i.ingredient.id).stock =
      parseFloat(stock);
  });

  return futureIngredients;
}

const checkDefaultMeal = (meals, week) => {
  if (
    !meals.find((obj) => obj.date === week[0].dateString) &&
    !meals.find((obj) => obj.date === week[1].dateString) &&
    !meals.find((obj) => obj.date === week[2].dateString) &&
    !meals.find((obj) => obj.date === week[3].dateString) &&
    !meals.find((obj) => obj.date === week[4].dateString) &&
    !meals.find((obj) => obj.date === week[5].dateString) &&
    !meals.find((obj) => obj.date === week[6].dateString)
  )
    return true;
};

const calculateDefaultMeal = (meals, week) => {
  let defaultMeals = [];

  if (checkDefaultMeal(meals, week)) {
    const filteredMeals = meals.filter((obj) => obj.date.includes("Default"));
    filteredMeals.find((obj) => obj.date === "Default_Mon")
      ? defaultMeals.push({
          ...filteredMeals.find((obj) => obj.date === "Default_Mon"),
          date: week[0].dateString,
        })
      : null;
    filteredMeals.find((obj) => obj.date === "Default_Tue")
      ? defaultMeals.push({
          ...filteredMeals.find((obj) => obj.date === "Default_Tue"),
          date: week[1].dateString,
        })
      : null;
    filteredMeals.find((obj) => obj.date === "Default_Wed")
      ? defaultMeals.push({
          ...filteredMeals.find((obj) => obj.date === "Default_Wed"),
          date: week[2].dateString,
        })
      : null;
    filteredMeals.find((obj) => obj.date === "Default_Thu")
      ? defaultMeals.push({
          ...filteredMeals.find((obj) => obj.date === "Default_Thu"),
          date: week[3].dateString,
        })
      : null;
    filteredMeals.find((obj) => obj.date === "Default_Fry")
      ? defaultMeals.push({
          ...filteredMeals.find((obj) => obj.date === "Default_Fry"),
          date: week[4].dateString,
        })
      : null;
    filteredMeals.find((obj) => obj.date === "Default_Sat")
      ? defaultMeals.push({
          ...filteredMeals.find((obj) => obj.date === "Default_Sat"),
          date: week[5].dateString,
        })
      : null;
    filteredMeals.find((obj) => obj.date === "Default_Sun")
      ? defaultMeals.push({
          ...filteredMeals.find((obj) => obj.date === "Default_Sun"),
          date: week[6].dateString,
        })
      : null;
  }

  return defaultMeals;
};
