import { View, Text, ScrollView } from "react-native";
import React from "react";
import { IconButton } from "react-native-paper";
import { themeColors } from "~/theme";
import ExpenseComponent from "./ExpenseComponent";
import EditExpenseButtonComponent from "./EditExpenseButtonComponent";
import { sortByName } from "~/utils/sortItems";
import { getCategory } from "~/app/categoriesSlice";
import { useSelector } from "react-redux";

export default function ExpensesListComponent({ categoryId }) {
  const category = useSelector((state) => getCategory(state, categoryId));

  let sortedList = sortByName([...category.expenses]);

  return (
    <View className="px-5 mt-2 space-y-3">
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center space-x-1 -mb-1">
          <Text
            className="text-3xl font-semibold z-10"
            style={{ color: themeColors.onSecondaryContainer }}
          >
            {category.title}
          </Text>
          <IconButton icon={category.icon} color={themeColors.primary} />
        </View>
        <EditExpenseButtonComponent categoryId={categoryId} />
      </View>
      <View style={{ height: 336 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="mt-3"
          fadingEdgeLength={30}
        >
          {sortedList.map((item) => {
            return (
              <ExpenseComponent
                key={item.id + "_" + item.title}
                expenseId={item.id}
                categoryId={categoryId}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}
