import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getUser() {
  let jsonValue = await AsyncStorage.getItem("user");
  return jsonValue ? JSON.parse(jsonValue) : null;
}

export async function updateUser(user) {
  await AsyncStorage.setItem("user", JSON.stringify(user));
}