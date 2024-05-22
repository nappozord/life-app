import AsyncStorage from "@react-native-async-storage/async-storage";

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
