import { mealsDefault } from "~/data";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getMeals() {
  let jsonValue = await AsyncStorage.getItem("meals");
  return jsonValue ? JSON.parse(jsonValue) : mealsDefault;
}

export async function updateMeals(meals) {
  await AsyncStorage.setItem("meals", JSON.stringify(meals));
}
