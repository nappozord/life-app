import { defaultCategories } from "~/data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMonthNumber, sortDatesDescending } from "~/utils/manageDate";
import { calculateMonthlyInOut } from "~/utils/calculateMoneyFlow";

async function calculateMonthStartingBalance(totalCategories, date) {
  const jsonValue = await AsyncStorage.getItem("user");
  const user = JSON.parse(jsonValue);
  let balance = user.balance;

  if (totalCategories) {
    const month = date.month;
    const year = date.year;

    for (obj of sortDatesDescending(totalCategories)) {
      if (obj.year > year || (obj.year === year && obj.month >= month)) {
        const monthlyBalance = await calculateMonthlyInOut(obj.categories);
        balance -= monthlyBalance.real.in - monthlyBalance.real.out;
      }
    }
  }

  return balance;
}

async function getMonthCategories(totalCategories, date) {
  const month = date.month;
  const year = date.year;

  const item = {
    title: date.title,
    month,
    year,
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

export async function getDefaultCategories(date, item) {
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

export async function addDefaultCategory(category) {
  const jsonValue = await AsyncStorage.getItem("defaultCategories");
  const defCategories = JSON.parse(jsonValue);
  defCategories.push({
    ...category,
    id: defCategories.length,
  });

  await AsyncStorage.setItem(
    "defaultCategories",
    JSON.stringify(defCategories)
  );
}

export async function deleteDefaultCategory(category) {
  const jsonValue = await AsyncStorage.getItem("defaultCategories");
  let defCategories = JSON.parse(jsonValue);
  defCategories = defCategories.filter((obj) => obj.title !== category.title);

  let i = 0;

  defCategories.forEach((c) => {
    c.id = i;
    i++;
  });

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

  await AsyncStorage.setItem(
    "defaultCategories",
    JSON.stringify(defCategories)
  );
}

export async function getCategories(range) {
  const jsonValue = await AsyncStorage.getItem("categories");
  const totalCategories = JSON.parse(jsonValue);

  if (!range.title) {
    const categories = [];

    for (const m of range) {
      const monthCategories = await getMonthCategories(totalCategories, {
        title: m.fullName + ", " + m.year,
        month: m.index,
        year: m.year,
      });
      categories.push(monthCategories);
    }

    return categories;
  } else {
    return getMonthCategories(totalCategories, range);
  }
}

export async function updateCategories(categories, date) {
  let jsonValue = await AsyncStorage.getItem("defaultCategories");

  const defCategories = jsonValue ? JSON.parse(jsonValue) : defaultCategories;

  const defTotals = await calculateMonthlyInOut(defCategories);
  const catTotals = await calculateMonthlyInOut(categories);

  if (
    categories.length === 0 ||
    (categories.length === defCategories.length &&
      catTotals.real.in === defTotals.real.in &&
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
    const month = date.month;
    const year = date.year;

    totalCategories.push({
      title: date.title,
      categories: categories,
      month,
      year,
    });
  }

  await AsyncStorage.setItem("categories", JSON.stringify(totalCategories));
}
