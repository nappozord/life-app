import { View, TouchableOpacity, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { IconButton } from "react-native-paper";
import { themeColors } from "~/theme";
import { FlashList } from "@shopify/flash-list";
import Animated, { SlideInRight } from "react-native-reanimated";
import SearchComponent from "~/components/groceries/searchbar/SearchComponent";
import { getCurrentWeek } from "~/utils/manageDate";
import GroceriesList from "./GroceriesList";

export default function GroceriesCard({
  meals,
  setMeals,
  ingredients,
  setIngredients,
  recipes,
  setRecipes,
}) {
  const [week, setWeek] = useState(getCurrentWeek(new Date()));
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState([...ingredients]);
  const [onlySelected, setOnlySelected] = useState(false);

  function offsetDate(offset) {
    const currentDate = new Date(week[0].date);
    currentDate.setDate(currentDate.getDate() + offset);

    setWeek(getCurrentWeek(currentDate));
  }

  return (
    <>
      <View className="flex-1">
        <View
          className="flex-row items-center justify-between py-4 px-3"
          style={{ backgroundColor: themeColors.chartBlue(1), elevation: 10 }}
        >
          <View className="flex-row items-center space-x-2">
            <TouchableOpacity
              className="rounded-full"
              style={{ backgroundColor: themeColors.bgBlack(0.4) }}
              onPress={() => setModalVisible(true)}
            >
              <IconButton
                icon="check"
                size={24}
                color={themeColors.bgWhite(0.7)}
              />
            </TouchableOpacity>
            <View>
              <View className="flex-row items-center">
                <Text className="text-xl font-semibold text-gray-300">
                  Grocery List
                </Text>
                <IconButton
                  className="p-0 m-0"
                  icon="basket"
                  size={24}
                  color={themeColors.bgWhite(0.7)}
                />
              </View>
              <Text className="text-gray-400">
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
          <View className="flex-row items-center space-x-0">
            <TouchableOpacity
              className="rounded-full"
              style={{
                backgroundColor: themeColors.bgWhite(0.7),
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
                backgroundColor: themeColors.bgWhite(0.7),
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
        <GroceriesList
          meals={meals}
          setMeals={setMeals}
          ingredients={ingredients}
          setIngredients={setIngredients}
          recipes={recipes}
          setRecipes={setRecipes}
          week={week}
        />
      </View>
    </>
  );
}
