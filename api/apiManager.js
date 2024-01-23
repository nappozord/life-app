import {
  defaultCategories,
  realCategories,
  mealsDefault,
  ingredientsDefault,
  recipesDefault,
} from "~/data";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getCategories(date) {
  let jsonValue = await AsyncStorage.getItem(date.title);
  if (jsonValue === null) {
    jsonValue = await AsyncStorage.getItem("defaultCategories");
    if (jsonValue === null) {
      AsyncStorage.setItem(
        "defaultCategories",
        JSON.stringify(defaultCategories)
      );
      return defaultCategories;
    }
    return JSON.parse(jsonValue);
  }
  return JSON.parse(jsonValue);
}

export async function saveCategories(categories, date) {
  let jsonValue = await AsyncStorage.getItem("defaultCategories");

  const defCategories = jsonValue ? JSON.parse(jsonValue) : defaultCategories;

  if (
    categories.length === 0 ||
    (categories[0].real.in === defCategories[0].real.in &&
      categories[0].real.out === defCategories[0].real.out &&
      categories[0].forecast.in === defCategories[0].forecast.in &&
      categories[0].forecast.out === defCategories[0].forecast.out)
  )
    return;
  jsonValue = JSON.stringify(categories);
  await AsyncStorage.setItem(date.title, jsonValue);
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
