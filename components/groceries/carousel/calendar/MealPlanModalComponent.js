import {
  View,
  Text,
  Image,
  Modal,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { themeColors } from "~/theme";
import { IconButton } from "react-native-paper";
import Animated, { SlideInDown } from "react-native-reanimated";
import SearchComponent from "~/components/groceries/searchbar/SearchComponent";
import RecipesIngredientsListComponent from "./RecipesIngredientsListComponent";

export default function MealPlanModalComponent({
  item,
  modalVisible,
  setModalVisible,
  recipes,
  ingredients,
  meals,
  setMeals,
}) {
  const [search, setSearch] = useState([...recipes, ...ingredients]);
  const [selected, setSelected] = useState({
    ingredients: [...item.selected.ingredients],
    recipes: [...item.selected.recipes],
  });
  const [onlySelected, setOnlySelected] = useState(false);
  const [useRecipes, setUseRecipes] = useState(0);

  useEffect(() => {
    if (onlySelected) {
      const itemsToShow = [];

      selected.ingredients.forEach((sel) => {
        itemsToShow.push(ingredients.find((obj) => obj.id === sel.id));
      });

      selected.recipes.forEach((sel) => {
        itemsToShow.push(recipes.find((obj) => obj.id === sel));
      });

      setSearch(itemsToShow);
    } else {
      setSearch([...recipes, ...ingredients]);
    }
  }, [onlySelected]);

  useEffect(() => {
    if (useRecipes === 0) {
      setSearch([...recipes, ...ingredients]);
    } else if (useRecipes === 1) {
      setSearch([...ingredients]);
    } else if (useRecipes === 2) {
      setSearch([...recipes]);
    }
  }, [useRecipes]);

  const saveButton = () => {
    if (!meals.find((obj) => obj.date === item.day)) {
      meals.push({
        date: item.day,
        breakfast: {
          ingredients: [],
          recipes: [],
        },
        lunch: {
          ingredients: [],
          recipes: [],
        },
        dinner: {
          ingredients: [],
          recipes: [],
        },
        snack: {
          ingredients: [],
          recipes: [],
        },
      });
    }

    meals.find((obj) => obj.date === item.day)[item.type] = selected;
    setMeals([...meals]);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      statusBarTranslucent
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <Image
        className="absolute h-full w-full"
        source={require("~/assets/splash.png")}
        //blurRadius={80}
        style={{ opacity: 0.9 }}
      />
      <Pressable
        onPress={() => setModalVisible(false)}
        className="flex-1 justify-end"
      >
        <Pressable>
          <Animated.View
            entering={SlideInDown.duration(500)}
            style={{
              backgroundColor: themeColors.onSecondary,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
            }}
          >
            <View className="flex-row justify-between align-center">
              <View />
              <View
                className="p-5 rounded-full -mt-20 items-center"
                style={{
                  backgroundColor: themeColors.background,
                  borderColor: themeColors.onSecondary,
                  borderWidth: 5,
                }}
              >
                <View className="flex-row">
                  <IconButton
                    icon={"plus"}
                    color={themeColors.onBackground}
                    size={30}
                    className="-mr-2"
                  />
                  <IconButton
                    icon={item ? item.icon : ""}
                    color={themeColors.onBackground}
                    size={30}
                    className="-ml-2"
                  />
                </View>
                <Text
                  className="text-xl font-semibold -mt-4 mb-4 "
                  style={{ color: themeColors.onBackground }}
                >
                  {item ? item.type[0].toUpperCase() + item.type.slice(1) : ""}
                </Text>
              </View>
              <View />
            </View>
            <View className="-mt-7">
              <View className="space-y-1 p-5">
                <Text
                  className="font-semibold text-lg ml-2"
                  style={{ color: themeColors.onSecondaryContainer }}
                >
                  Search
                </Text>
                <View className="flex-row justify-between items-center">
                  <View className="flex-1 mr-2">
                    <SearchComponent
                      items={[...ingredients, ...recipes]}
                      setSearch={setSearch}
                      onlyIngredients={false}
                      setOnlySelected={setOnlySelected}
                    />
                  </View>
                  <TouchableOpacity
                    className="rounded-2xl p-0 m0"
                    style={{
                      backgroundColor: themeColors.secondary,
                    }}
                    onPress={() => {
                      setOnlySelected(!onlySelected);
                    }}
                  >
                    <IconButton
                      size={35}
                      icon={onlySelected ? "select-inverse" : "select-group"}
                      color={themeColors.onSecondary}
                      className="p-0 m-0"
                    />
                  </TouchableOpacity>
                </View>
                <View className="flex-row py-1">
                  <View className="flex-1">
                    <TouchableOpacity
                      className="flex-row items-center"
                      style={{
                        backgroundColor:
                          useRecipes === 1
                            ? themeColors.primary
                            : themeColors.secondary,
                        borderTopLeftRadius: 24,
                        borderBottomLeftRadius: 24,
                      }}
                      onPress={() => {
                        useRecipes === 0 ? setUseRecipes(1) : setUseRecipes(0);
                      }}
                    >
                      <IconButton
                        size={24}
                        icon="apple"
                        color={
                          useRecipes === 1
                            ? themeColors.onPrimary
                            : themeColors.onSecondary
                        }
                      />
                      <Text
                        className="text-base"
                        style={{
                          color:
                            useRecipes === 1
                              ? themeColors.onPrimary
                              : themeColors.onSecondary,
                        }}
                      >
                        Ingredients
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View className="flex-1">
                    <TouchableOpacity
                      className="flex-row items-center"
                      style={{
                        backgroundColor:
                          useRecipes === 2
                            ? themeColors.primary
                            : themeColors.secondary,
                        borderTopRightRadius: 24,
                        borderBottomRightRadius: 24,
                      }}
                      onPress={() => {
                        useRecipes === 0 ? setUseRecipes(2) : setUseRecipes(0);
                      }}
                    >
                      <IconButton
                        size={24}
                        icon="food"
                        color={
                          useRecipes === 2
                            ? themeColors.onPrimary
                            : themeColors.onSecondary
                        }
                      />
                      <Text
                        className="text-base"
                        style={{
                          color:
                            useRecipes === 2
                              ? themeColors.onPrimary
                              : themeColors.onSecondary,
                        }}
                      >
                        Recipes
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View>
                  <RecipesIngredientsListComponent
                    items={search}
                    ingredients={ingredients}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </View>
              </View>
              <TouchableOpacity
                className="py-5 -mt-4"
                style={{
                  backgroundColor: themeColors.primary,
                  borderTopRightRadius: 24,
                  borderTopLeftRadius: 24,
                }}
                onPress={() => {
                  saveButton();
                  setModalVisible(false);
                }}
              >
                <Text
                  className="font-bold text-center text-xl"
                  style={{ color: themeColors.onPrimary }}
                >
                  {"Save " +
                    (item
                      ? item.type[0].toUpperCase() + item.type.slice(1)
                      : "")}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
