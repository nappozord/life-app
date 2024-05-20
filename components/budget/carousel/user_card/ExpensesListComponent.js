import { View, Text, ScrollView } from "react-native";
import React from "react";
import { IconButton } from "react-native-paper";
import { themeColors } from "~/theme";
import ExpenseComponent from "./ExpenseComponent";
import EditExpenseButtonComponent from "./EditExpenseButtonComponent";
import ItemComponent from "~/components/list/list_card/ItemComponent";
import { sortByBought, sortByName } from "~/utils/sortItems";

export default function UserCategoryExpensesComponent({
  item,
  categories,
  setCategories,
  date,
  isList,
}) {
  const icon = item.icon;
  const category = item.title;

  if (isList) {
    item.expenses = sortByBought(item.expenses);
  }

  return (
    <View className="px-5 mt-2 space-y-3">
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center space-x-1 -mb-1">
          <Text
            className="text-3xl font-semibold z-10"
            style={{ color: themeColors.onSecondaryContainer }}
          >
            {item.title}
          </Text>
          <IconButton icon={item.icon} color={themeColors.primary} />
        </View>
        <EditExpenseButtonComponent
          date={date}
          icon={item.icon}
          category={item.title}
          categories={categories}
          setCategories={setCategories}
          isList={isList}
        />
      </View>
      <View style={{ height: isList ? 324 : 336 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="mt-3"
          fadingEdgeLength={30}
        >
          {sortByBought(sortByName(item.expenses)).map((item) => {
            return !isList ? (
              <ExpenseComponent
                key={item.id + "_" + item.title}
                categories={categories}
                setCategories={setCategories}
                item={item}
                itemIcon={icon}
                itemCategory={category}
                date={date}
              />
            ) : (
              <ItemComponent
                key={item.id + "_" + item.title}
                categories={categories}
                setCategories={setCategories}
                item={item}
                itemIcon={icon}
                itemCategory={category}
                date={date}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}
