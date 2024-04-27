import { View, TouchableOpacity, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { IconButton } from "react-native-paper";
import { themeColors } from "~/theme";
import { FlashList } from "@shopify/flash-list";
import Animated, { FadeIn } from "react-native-reanimated";
import { getCurrentWeek } from "~/utils/manageDate";
import GroceriesList from "./GroceriesList";
import { getGroceryList, updateGroceryList } from "~/api/apiManager";

export default function GroceriesCard({
  meals,
  setMeals,
  ingredients,
  setIngredients,
  recipes,
  setRecipes,
  items,
  setItems,
}) {
  const [week, setWeek] = useState(getCurrentWeek(new Date()));
  const [groceryList, setGroceryList] = useState(null);

  function offsetDate(offset) {
    const currentDate = new Date(week[0].date);
    currentDate.setDate(currentDate.getDate() + offset);

    setWeek(getCurrentWeek(currentDate));
  }

  useEffect(() => {
    if (
      groceryList &&
      (groceryList.added.length > 0 ||
        groceryList.checked.length > 0 ||
        groceryList.excluded.length > 0)
    )
      updateGroceryList(groceryList);
  }, [groceryList]);

  useEffect(() => {
    setGroceryList(null);
    getGroceryList().then((r) => {
      if (r && r.find((obj) => obj.date === week[0].dateString)) {
        setGroceryList(r.find((obj) => obj.date === week[0].dateString));
      } else {
        setGroceryList({
          date: week[0].dateString,
          checked: [],
          added: [],
          excluded: [],
        });
      }
    });
  }, [week]);

  return (
    <View className="flex-1">
      <View className="absolute w-full -mt-10 z-10">
        <View className="flex-row justify-center">
          <TouchableOpacity
            className="rounded-full"
            style={{
              backgroundColor: themeColors.primary,
              borderColor: themeColors.onSecondary,
              borderWidth: 8,
            }}
          >
            <IconButton
              icon="basket-check"
              size={40}
              color={themeColors.onPrimary}
              className="p-0 m-0.5"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        className="flex-row items-center justify-between py-3 px-4"
        style={{
          backgroundColor: themeColors.onSecondary,
          elevation: 5,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
      >
        <View className="flex-row items-center space-x-2">
          <View>
            <View className="flex-row items-center">
              <Text
                className="text-xl font-semibold"
                style={{ color: themeColors.onBackground }}
              >
                Grocery List
              </Text>
              <IconButton
                className="p-0 m-0"
                icon="blank"
                size={24}
                color={themeColors.onBackground}
              />
            </View>
            <View className="flex-row items-center">
              <IconButton
                className="p-0 m-0 -ml-1"
                icon="calendar-week-begin"
                size={15}
                color={themeColors.secondary}
              />
              <Text
                className="text-sm"
                style={{ color: themeColors.secondary }}
              >
                {week[0].dateString === getCurrentWeek(new Date())[0].dateString
                  ? "This week"
                  : week[0].date.toLocaleString("default", {
                      month: "long",
                    }) ===
                    week[6].date.toLocaleString("default", { month: "long" })
                  ? "From " +
                    week[0].dayNumber +
                    " to " +
                    week[6].dayNumber +
                    ", " +
                    week[0].date.toLocaleString("default", {
                      month: "long",
                    })
                  : "From " +
                    week[0].dayNumber +
                    ", " +
                    week[0].date.toLocaleString("default", {
                      month: "short",
                    }) +
                    " to " +
                    week[6].dayNumber +
                    ", " +
                    week[6].date.toLocaleString("default", {
                      month: "short",
                    })}
              </Text>
            </View>
          </View>
        </View>
        <View className="flex-row items-center space-x-0">
          <TouchableOpacity
            className="rounded-full"
            style={{
              backgroundColor: themeColors.onPrimaryContainer,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }}
            onPress={() => {
              offsetDate(-7);
            }}
          >
            <IconButton size={24} icon="menu-left" />
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-full"
            style={{
              backgroundColor: themeColors.onPrimaryContainer,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderLeftWidth: 1,
            }}
            onPress={() => {
              offsetDate(7);
            }}
          >
            <IconButton size={24} icon="menu-right" />
          </TouchableOpacity>
        </View>
      </View>
      {groceryList ? (
        <GroceriesList
          meals={meals}
          setMeals={setMeals}
          ingredients={ingredients}
          setIngredients={setIngredients}
          recipes={recipes}
          setRecipes={setRecipes}
          groceryList={groceryList}
          setGroceryList={setGroceryList}
          week={week}
          items={items}
          setItems={setItems}
        />
      ) : null}
    </View>
  );
}
