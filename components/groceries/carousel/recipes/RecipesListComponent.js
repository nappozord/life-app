import {
  View,
  TouchableOpacity,
  Text,
  RefreshControl,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { IconButton } from "react-native-paper";
import { themeColors } from "~/theme";
import RecipeComponent from "./RecipeComponent";
import RecipeModal from "./RecipeModal";
import { FlashList } from "@shopify/flash-list";
import Animated, { SlideInRight } from "react-native-reanimated";

export default function RecipesListComponent({
  meals,
  setMeals,
  ingredients,
  setIngredients,
  recipes,
  setRecipes,
}) {
  const [sort, setSort] = useState("alphabetical");
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
    setRecipes([...recipes]);
  }, []);

  return (
    <View className="flex-1">
      {modalVisible ? (
        <RecipeModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          ingredients={ingredients}
          setIngredients={setIngredients}
          recipes={recipes}
          setRecipes={setRecipes}
        />
      ) : null}
      <View
        className="flex-row items-center justify-between py-4 px-3"
        style={{ backgroundColor: themeColors.primaryContainer, elevation: 10 }}
      >
        <View className="flex-row items-center space-x-2">
          <TouchableOpacity
            className="rounded-full"
            style={{ backgroundColor: themeColors.onPrimary }}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <IconButton
              icon="plus"
              size={24}
              color={themeColors.onPrimaryContainer}
            />
          </TouchableOpacity>
          <View>
            <View className="flex-row items-center">
              <Text
                className="text-xl font-semibold "
                style={{ color: themeColors.onPrimaryContainer }}
              >
                Recipes
              </Text>
              <IconButton
                className="p-0 m-0"
                icon="food"
                size={24}
                color={themeColors.onPrimaryContainer}
              />
            </View>
            <Text style={{ color: themeColors.secondary }}>
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
            <IconButton size={sort === "use" ? 25 : 24} icon={"sort-variant"} />
          </TouchableOpacity>
        </View>
      </View>
      <View className="mx-5 mt-2 -mb-2 flex-1">
        <FlashList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              progressBackgroundColor={themeColors.primaryContainer}
              colors={[themeColors.onPrimaryContainer]}
            />
          }
          estimatedItemSize={45}
          keyExtractor={(item) => "recipes_" + item.id}
          fadingEdgeLength={50}
          removeClippedSubviews={false}
          showsVerticalScrollIndicator={false}
          data={
            sort === "alphabetical"
              ? recipes.sort((a, b) =>
                  a.title > b.title ? 1 : b.title > a.title ? -1 : 0
                )
              : recipes.sort((a, b) => b.used - a.used)
          }
          renderItem={({ item }) => {
            return (
              <RecipeComponent
                item={item}
                meals={meals}
                setMeals={setMeals}
                ingredients={ingredients}
                setIngredients={setIngredients}
                recipes={recipes}
                setRecipes={setRecipes}
              />
            );
          }}
        />
      </View>
    </View>
  );
}
