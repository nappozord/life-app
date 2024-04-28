import { View, Text, ScrollView } from "react-native";
import React from "react";
import { IconButton } from "react-native-paper";
import { themeColors } from "~/theme";
import ExpenseComponent from "./ExpenseComponent";
import EditExpenseButtonComponent from "./EditExpenseButtonComponent";
import ItemComponent from "../../../list/list_card/ItemComponent";

export default function UserCategoryExpensesComponent({
  item,
  categories,
  setCategories,
  user,
  setUser,
  date,
  isList,
}) {
  const icon = item.icon;
  const category = item.title;

  if(isList){
    item.expenses.sort((a, b) => {
      // If a is bought and b is not, a should come after b
      if (a.bought && !b.bought) {
        return 1;
      }
      // If b is bought and a is not, a should come before b
      else if (!a.bought && b.bought) {
        return -1;
      }
      // If both have the same value of 'bought', no change in order
      else {
        return 0;
      }
    });
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
          user={user}
          setUser={setUser}
          isList={isList}
        />
      </View>
      <View style={{ height: 336 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="mt-3"
          fadingEdgeLength={30}
        >
          {item.expenses.map((item) => {
            return !isList ? (
              <ExpenseComponent
                key={item.id + "_" + item.title}
                categories={categories}
                setCategories={setCategories}
                item={item}
                itemIcon={icon}
                itemCategory={category}
                user={user}
                setUser={setUser}
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
                user={user}
                setUser={setUser}
                date={date}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}
