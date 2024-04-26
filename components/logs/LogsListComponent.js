import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { getLogs } from "~/api/apiManager";
import { themeColors } from "~/theme";
import { IconButton } from "react-native-paper";

export default function LogsListComponent({ date }) {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);

  useEffect(() => {
    getLogs().then((r) => {
      setLogs(r);
      setFilteredLogs(
        r
          .filter((item) => (item.date === date.toISOString().split("T")[0]))
          .reverse()
      );
    });
  }, []);

  useEffect(() => {
    if (logs.length > 0)
      setFilteredLogs(
        logs
          .filter((item) => (item.date === date.toISOString().split("T")[0]))
          .reverse()
      );
  }, [date]);

  return (
    <View className="overflow-hidden" style={{height: 540}}>
      <FlashList
        estimatedItemSize={60}
        keyExtractor={(item) => "log_" + item.id}
        fadingEdgeLength={50}
        removeClippedSubviews={false}
        showsVerticalScrollIndicator={false}
        data={filteredLogs}
        renderItem={({ index, item }) => {
          return (
            <View
              className={
                (index === 0 ? "mt-3 " : "") +
                (index === filteredLogs.length - 1 ? "mb-2 " : "mb-1")
              }
            >
              <View
                className="flex-row items-center justify-between rounded-2xl"
                style={{ backgroundColor: themeColors.secondaryContainer }}
              >
                <View className="flex-row items-center">
                  <IconButton
                    icon={item.icon}
                    color={themeColors.onBackground}
                    onPress={() => setLogs(false)}
                  />
                  <View>
                    <Text
                      className="text-lg"
                      style={{ color: themeColors.onBackground, maxWidth: 250 }}
                    >
                      {item.time + " - " + item.text}
                    </Text>
                  </View>
                </View>
                <View className="flex-row justify-end">
                  <IconButton
                    className="pr-0 -mr-2"
                    icon={
                      item.auto
                        ? "alpha-a-circle-outline"
                        : "alpha-m-circle-outline"
                    }
                    color={themeColors.primary}
                    onPress={() => setLogs(false)}
                  />
                  <IconButton
                    className="pl-0 ml-0"
                    icon={"information-outline"}
                    color={themeColors.onBackground}
                    onPress={() => setLogs(false)}
                  />
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
