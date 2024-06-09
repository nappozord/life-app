import { recipesDefault } from "~/data";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getRecipes() {
  let jsonValue = await AsyncStorage.getItem("recipes");
  return jsonValue ? JSON.parse(jsonValue) : recipesDefault;
}

export async function updateRecipes(recipes) {
  await AsyncStorage.setItem("recipes", JSON.stringify(recipes));
}
