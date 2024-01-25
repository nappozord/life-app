import {
  defaultCategories,
  realCategories,
  mealsDefault,
  ingredientsDefault,
  recipesDefault,
} from "~/data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMonthNumber, sortDatesDescending } from "~/utils/manageDate";
import { calculateMonthlyInOut } from "~/utils/calculateMoneyFlow";

async function calculateMonthStartingBalance(totalCategories, date) {
  const jsonValue = await AsyncStorage.getItem("user");
  const user = JSON.parse(jsonValue);
  let balance = user.balance;

  if (totalCategories) {
    const parts = date.title.split(", ");
    const month = getMonthNumber(parts[0]);
    const year = parseInt(parts[1]);

    for (obj of sortDatesDescending(totalCategories)) {
      if (obj.year > year || (obj.year === year && obj.month >= month)) {
        const monthlyBalance = await calculateMonthlyInOut(obj.categories);
        balance -= monthlyBalance.real.in - monthlyBalance.real.out;
      }
    }
  }

  return balance;
}

async function getDefaultCategories(date, item) {
  let jsonValue = await AsyncStorage.getItem(date.title);
  if (jsonValue === null) {
    jsonValue = await AsyncStorage.getItem("defaultCategories");
    if (jsonValue === null) {
      AsyncStorage.setItem(
        "defaultCategories",
        JSON.stringify(defaultCategories)
      );
      return {
        ...item,
        categories: defaultCategories,
      };
    }
    return {
      ...item,
      categories: JSON.parse(jsonValue),
    };
  }

  return {
    ...item,
    categories: JSON.parse(jsonValue),
  };
}

async function getMonthCategories(totalCategories, date) {
  const parts = date.title.split(", ");

  const month = parts[0];
  const year = parseInt(parts[1]);

  const item = {
    title: date.title,
    month: getMonthNumber(month),
    year: year,
    startingBalance: await calculateMonthStartingBalance(totalCategories, date),
  };

  if (totalCategories === null) {
    AsyncStorage.setItem("categories", JSON.stringify([]));
    const defaultCat = await getDefaultCategories(date, item);
    return defaultCat;
  }

  if (!totalCategories.find((obj) => obj.title === date.title)) {
    const defaultCat = await getDefaultCategories(date, item);
    return defaultCat;
  }

  return {
    ...item,
    categories: totalCategories.find((obj) => obj.title === date.title)
      .categories,
  };
}

export async function getCategories(range) {
  const jsonValue = await AsyncStorage.getItem("categories");
  const totalCategories = JSON.parse(jsonValue);

  if (!range.title) {
    const categories = [];

    for (const m of range) {
      const monthCategories = await getMonthCategories(totalCategories, {
        title: m.fullName + ", " + m.year,
      });
      categories.push(monthCategories);
    }

    return categories;
  } else {
    return getMonthCategories(totalCategories, range);
  }
}

export async function saveCategories(categories, date) {
  let jsonValue = await AsyncStorage.getItem("defaultCategories");

  const defCategories = jsonValue ? JSON.parse(jsonValue) : defaultCategories;

  const defTotals = await calculateMonthlyInOut(defCategories);
  const catTotals = await calculateMonthlyInOut(categories);

  if (
    categories.length === 0 ||
    (catTotals.real.in === defTotals.real.in &&
      catTotals.real.out === defTotals.real.out &&
      catTotals.forecast.in === defTotals.forecast.in &&
      catTotals.forecast.out === defTotals.forecast.out)
  )
    return;

  jsonValue = await AsyncStorage.getItem("categories");
  const totalCategories = JSON.parse(jsonValue);

  const startingBalance = await calculateMonthStartingBalance(
    totalCategories,
    date
  );

  if (totalCategories.find((obj) => obj.title === date.title)) {
    totalCategories.find((obj) => obj.title === date.title).categories =
      categories;
    totalCategories.find((obj) => obj.title === date.title).startingBalance =
      startingBalance;
  } else {
    const parts = date.title.split(", ");

    const month = parts[0];
    const year = parseInt(parts[1]);

    totalCategories.push({
      title: date.title,
      categories: categories,
      month: getMonthNumber(month),
      year: year,
    });
  }

  await AsyncStorage.setItem("categories", JSON.stringify(totalCategories));
}

export async function addDefaultCategory(category) {
  const jsonValue = await AsyncStorage.getItem("defaultCategories");
  const defCategories = JSON.parse(jsonValue);
  defCategories.push(category);

  await AsyncStorage.setItem(
    "defaultCategories",
    JSON.stringify(defCategories)
  );
}

export async function deleteDefaultCategory(category) {
  const jsonValue = await AsyncStorage.getItem("defaultCategories");
  let defCategories = JSON.parse(jsonValue);
  defCategories = defCategories.filter((obj) => obj.id !== category.id);

  await AsyncStorage.setItem(
    "defaultCategories",
    JSON.stringify(defCategories)
  );
}

export async function updateDeafultCategory(category) {
  const jsonValue = await AsyncStorage.getItem("defaultCategories");
  let defCategories = JSON.parse(jsonValue);

  if (defCategories.find((obj) => obj.id === category.id)) {
    defCategories.find((obj) => obj.id === category.id).title = category.title;
    defCategories.find((obj) => obj.id === category.id).icon = category.icon;
  }

  await AsyncStorage.setItem(
    "defaultCategories",
    JSON.stringify(defCategories)
  );
}

export async function setDefaultCategoryForecast(category) {
  const jsonValue = await AsyncStorage.getItem("defaultCategories");

  let defCategories = JSON.parse(jsonValue);

  defCategories.find((obj) => obj.id === category.id).forecast =
    category.forecast;

  if (category.income)
    defCategories[0].forecast.in =
      parseFloat(defCategories[0].forecast.in) - parseFloat(category.forecast);
  else
    defCategories[0].forecast.out =
      parseFloat(defCategories[0].forecast.out) + parseFloat(category.forecast);

  await AsyncStorage.setItem(
    "defaultCategories",
    JSON.stringify(defCategories)
  );
}

export function restoreBackup(date) {
  const save = realCategories.find((obj) => obj.title === date).categories;
  saveCategories(save, { title: date });
}

export async function getUser() {
  let jsonValue = await AsyncStorage.getItem("user");
  return jsonValue ? JSON.parse(jsonValue) : null;
}

export async function updateUser(user) {
  await AsyncStorage.setItem("user", JSON.stringify(user));
}

export async function getMeals() {
  let jsonValue = await AsyncStorage.getItem("meals");
  return jsonValue ? JSON.parse(jsonValue) : mealsDefault;
}

export async function updateMeals(meals) {
  await AsyncStorage.setItem("meals", JSON.stringify(meals));
}

export async function getIngredients() {
  let jsonValue = await AsyncStorage.getItem("ingredients");
  return jsonValue ? JSON.parse(jsonValue) : ingredientsDefault;
}

export async function updateIngredients(ingredients) {
  await AsyncStorage.setItem("ingredients", JSON.stringify(ingredients));
}

export async function getRecipes() {
  let jsonValue = await AsyncStorage.getItem("recipes");
  return jsonValue ? JSON.parse(jsonValue) : recipesDefault;
}

export async function updateRecipes(recipes) {
  await AsyncStorage.setItem("recipes", JSON.stringify(recipes));
}

export async function getGroceryList() {
  let jsonValue = await AsyncStorage.getItem("groceries");
  return jsonValue ? JSON.parse(jsonValue) : null;
}

export async function updateGroceryList(grocery) {
  let groceries = await getGroceryList();

  if (groceries) {
    let g = groceries.find((obj) => obj.date === grocery.date);
    if (g) {
      g.checked = grocery.checked;
      g.added = grocery.added;
      g.excluded = grocery.excluded;
    } else {
      groceries.push({ ...grocery });
    }
  } else {
    groceries = [{ ...grocery }];
  }

  await AsyncStorage.setItem("groceries", JSON.stringify(groceries));
}
