import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getLogs() {
  let jsonValue = await AsyncStorage.getItem("logs");
  return jsonValue ? JSON.parse(jsonValue) : [];
}

export async function updateLogs(logs) {
  await AsyncStorage.setItem("logs", JSON.stringify(logs));
}
