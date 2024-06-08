import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getGroceryList() {
  let jsonValue = await AsyncStorage.getItem("groceries");
  return jsonValue ? JSON.parse(jsonValue) : null;
}

export async function updateGroceryList(groceries) {
  await AsyncStorage.setItem("groceries", JSON.stringify(groceries));
}
