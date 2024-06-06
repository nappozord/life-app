import { View, Text, ScrollView } from "react-native";
import React from "react";
import { IconButton } from "react-native-paper";
import { themeColors } from "~/theme";
import EditItemButtonComponent from "./EditItemButtonComponent";
import ItemComponent from "./ItemComponent";
import { sortByBought, sortByName } from "~/utils/sortItems";
import { getList } from "~/app/listsSlice";
import { useSelector } from "react-redux";

export default function ItemsListComponent({ listId }) {
  const list = useSelector((state) => getList(state, listId));

  let sortedList = sortByName([...list.expenses]);

  return (
    <View className="px-5 mt-2 space-y-3">
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center space-x-1 -mb-1">
          <Text
            className="text-3xl font-semibold z-10"
            style={{ color: themeColors.onSecondaryContainer }}
          >
            {list.title}
          </Text>
          <IconButton icon={list.icon} color={themeColors.primary} />
        </View>
        <EditItemButtonComponent listId={listId} />
      </View>
      <View style={{ height: 324 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="mt-3"
          fadingEdgeLength={30}
        >
          {sortByBought(sortedList).map((item) => (
            <ItemComponent
              key={item.id + "_" + item.title}
              expenseId={item.id}
              listId={listId}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
