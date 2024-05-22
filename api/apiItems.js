import { itemsDefault } from "~/data";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getItems() {
  let jsonValue = await AsyncStorage.getItem("items");
  return jsonValue ? JSON.parse(jsonValue) : itemsDefault;
}

export async function updateItems(items) {
  await AsyncStorage.setItem("items", JSON.stringify(items));
}
