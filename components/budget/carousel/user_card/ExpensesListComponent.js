import { View, Text, ScrollView } from "react-native";
import React from "react";
import { IconButton } from "react-native-paper";
import { themeColors } from "~/theme";
import ExpenseComponent from "./ExpenseComponent";
import EditExpenseButtonComponent from "./EditExpenseButtonComponent";

export default function UserCategoryExpensesComponent({
  item,
  categories,
  setCategories,
  user,
  setUser,
}) {
  const icon = item.icon;
  const category = item.title;

  return (
    <View className="px-5 mt-2 space-y-3">
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center space-x-1 -mb-1">
          <Text className="text-3xl text-gray-800 font-semibold z-10">
            {item.title}
          </Text>
          <IconButton icon={item.icon} color={themeColors.bgBlack(1)} />
        </View>
        <EditExpenseButtonComponent
          icon={item.icon}
          category={item.title}
          categories={categories}
          setCategories={setCategories}
          user={user}
          setUser={setUser}
        />
      </View>
      <View style={{height: 336}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="mt-3"
          fadingEdgeLength={30}
        >
          {item.expenses.map((item) => {
            return (
              <ExpenseComponent
                key={item.id + "_" + item.title}
                categories={categories}
                setCategories={setCategories}
                item={item}
                itemIcon={icon}
                itemCategory={category}
                user={user}
                setUser={setUser}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}
