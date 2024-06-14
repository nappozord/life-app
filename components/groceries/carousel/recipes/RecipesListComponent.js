import {
  View,
  TouchableOpacity,
  Text,
  RefreshControl,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { IconButton } from "react-native-paper";
import { themeColors } from "~/theme";
import RecipeComponent from "./RecipeComponent";
import RecipeModal from "./RecipeModal";
import { FlashList } from "@shopify/flash-list";
import SearchComponent from "~/components/groceries/searchbar/SearchComponent";
import { sortByName, sortByUsage } from "~/utils/sortItems";
import { useSelector } from "react-redux";

export default function RecipesListComponent() {
  const recipes = useSelector((state) => state.recipes.recipes);

  const [sort, setSort] = useState("alphabetical");
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [search, setSearch] = useState(recipes);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  useEffect(() => {
    setSearch([...recipes]);
  }, [recipes]);

  return (
    <View className="flex-1">
      {modalVisible ? (
        <RecipeModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      ) : null}
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
              icon="plus"
              size={40}
              color={themeColors.onPrimary}
              className="p-0 m-0.5"
              onPress={() => setModalVisible(!modalVisible)}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        className="py-3 px-4"
        style={{
          backgroundColor: themeColors.onSecondary,
          elevation: 5,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center space-x-2">
            <View>
              <View className="flex-row items-center">
                <Text
                  className="text-xl font-semibold "
                  style={{ color: themeColors.onBackground }}
                >
                  Recipes
                </Text>
                <IconButton
                  className="p-0 m-0"
                  icon="food"
                  size={24}
                  color={themeColors.onBackground}
                />
              </View>
              <View className="flex-row items-center">
                <IconButton
                  className="p-0 m-0 -ml-1"
                  icon="sort"
                  size={15}
                  color={themeColors.secondary}
                />
                <Text
                  className="text-sm"
                  style={{ color: themeColors.secondary }}
                >
                  {sort === "alphabetical" ? "A-Z order" : "Usage order"}
                </Text>
              </View>
            </View>
          </View>
          <View className="flex-row items-center space-x-0">
            <TouchableOpacity
              className="rounded-full"
              style={{
                backgroundColor:
                  sort === "alphabetical"
                    ? themeColors.primary
                    : themeColors.onPrimaryContainer,
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
                    ? themeColors.primary
                    : themeColors.onPrimaryContainer,
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
        <View className="mt-2">
          <SearchComponent
            items={[]}
            ingredients={recipes}
            setSearch={setSearch}
            onlyIngredients={false}
            setOnlySelected={() => {}}
            placeholderText={"Search Recipes"}
          />
        </View>
      </View>
      <View className="mx-4 flex-1">
        <FlatList
          key={"recipes_" + sort}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              progressBackgroundColor={themeColors.primaryContainer}
              colors={[themeColors.onPrimaryContainer]}
            />
          }
          keyExtractor={(item) => "recipes_" + item.id}
          fadingEdgeLength={50}
          showsVerticalScrollIndicator={false}
          data={
            sort === "alphabetical"
              ? sortByName([...search])
              : sortByUsage([...search])
          }
          renderItem={({ index, item }) => {
            return (
              <View
                className={
                  (index === 0 ? "mt-3 " : "") +
                  (index === recipes.length - 1 ? "mb-2 " : "")
                }
              >
                <RecipeComponent recipeId={item.id} />
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}
