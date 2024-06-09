
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getLogs() {
  let jsonValue = await AsyncStorage.getItem("logs");
  return jsonValue ? JSON.parse(jsonValue) : [];
}

export async function updateLogs(log) {
  let logs = await getLogs();

  const date = new Date();

  // Get the hours and minutes from the Date object
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format the hours and minutes
  const formattedTime =
    hours.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0");

  for (l of log) {
    logs.push({
      id: logs.length,
      date: date.toISOString().split("T")[0],
      time: formattedTime,
      ...l,
    });
  }

  await AsyncStorage.setItem("logs", JSON.stringify(logs));
}
