import { ingredientsDefault } from "~/data";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getIngredients() {
  let jsonValue = await AsyncStorage.getItem("ingredients");
  return jsonValue ? JSON.parse(jsonValue) : ingredientsDefault;
}

export async function updateIngredients(ingredients) {
  await AsyncStorage.setItem("ingredients", JSON.stringify(ingredients));
}
