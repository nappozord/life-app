import { listsDefault } from "~/data";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getListCategories() {
  let jsonValue = await AsyncStorage.getItem("lists");
  return jsonValue ? JSON.parse(jsonValue) : listsDefault;
}

export async function updateListCategories(lists) {
  await AsyncStorage.setItem("lists", JSON.stringify(lists));
}
