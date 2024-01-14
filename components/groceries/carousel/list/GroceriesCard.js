import { View, TouchableOpacity, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { IconButton } from "react-native-paper";
import { themeColors } from "~/theme";
import { FlashList } from "@shopify/flash-list";
import Animated, { SlideInRight } from "react-native-reanimated";
import SearchComponent from "~/components/groceries/searchbar/SearchComponent";

export default function GroceriesCard({
  groceries,
  setGroceries,
  ingredients,
  setIngredients,
  recipes,
  setRecipes,
}) {
  const [sort, setSort] = useState("alphabetical");
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState([...ingredients]);
  const [onlySelected, setOnlySelected] = useState(false);

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
                icon="plus"
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
                {sort === "alphabetical" ? "A-Z order" : "Usage order"}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center space-x-0">
            <TouchableOpacity
              className="rounded-full"
              style={{
                backgroundColor:
                  sort === "alphabetical"
                    ? themeColors.bgWhite(0.7)
                    : themeColors.bgWhite(0.6),
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
              onPress={() => {
                setSort("alphabetical");
              }}
            >
              <IconButton
                size={sort === "alphabetical" ? 25 : 24}
                icon={"sort-alphabetical-variant"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              className="rounded-full"
              style={{
                backgroundColor:
                  sort === "use"
                    ? themeColors.bgWhite(0.7)
                    : themeColors.bgWhite(0.6),
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderLeftWidth: 1,
              }}
              onPress={() => {
                setSort("use");
              }}
            >
              <IconButton
                size={sort === "use" ? 25 : 24}
                icon={"sort-variant"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="flex-1 justify-end">
      <View className="p-1" style={{backgroundColor: themeColors.bgWhite(0.2)}}>
        <SearchComponent
          items={[...ingredients]}
          setSearch={setSearch}
          onlyIngredient={true}
          setOnlySelected={setOnlySelected}
          placeholderText={"Add something to your grocery list!"}
        />
      </View>
      </View>
    </>
  );
}
