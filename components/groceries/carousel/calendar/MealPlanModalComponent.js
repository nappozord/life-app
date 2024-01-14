import {
  View,
  Text,
  TextInput,
  Image,
  Modal,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { themeColors } from "~/theme";
import { Divider, IconButton } from "react-native-paper";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import SearchComponent from "~/components/groceries/searchbar/SearchComponent";
import RecipesIngredientsListComponent from "./RecipesIngredientsListComponent";

export default function MealPlanModalComponent({
  item,
  modalVisible,
  setModalVisible,
  recipes,
  setRecipes,
  ingredients,
  setIngredients,
  meals,
  setMeals,
}) {
  const [search, setSearch] = useState([...recipes, ...ingredients]);
  const [selected, setSelected] = useState({
    ingredients: [...item.selected.ingredients],
    recipes: [...item.selected.recipes],
  });
  const [onlySelected, setOnlySelected] = useState(false);

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
    <View>
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
          source={require("~/assets/bg.png")}
          blurRadius={80}
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
                backgroundColor: themeColors.bgWhite(0.6),
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
              }}
            >
              <View className="flex-row justify-between align-center">
                <View />
                <View
                  className="p-5 rounded-full -mt-20 items-center"
                  style={{
                    backgroundColor: themeColors.bgBlack(1),
                    borderColor: themeColors.bgGrey(1),
                    borderWidth: 5,
                  }}
                >
                  <View className="flex-row">
                    <IconButton
                      icon={"plus"}
                      color={themeColors.bgGrey(1)}
                      size={30}
                      className="-mr-2"
                    />
                    <IconButton
                      icon={item ? item.icon : ""}
                      color={themeColors.bgGrey(1)}
                      size={30}
                      className="-ml-2"
                    />
                  </View>
                  <Text className="text-xl font-semibold -mt-4 mb-4 text-gray-400">
                    {item
                      ? item.type[0].toUpperCase() + item.type.slice(1)
                      : ""}
                  </Text>
                </View>
                <View />
              </View>
              <View className="-mt-7">
                <View className="space-y-1 p-5">
                  <Text className="text-gray-700 font-semibold text-lg ml-2">
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
                      style={{ backgroundColor: themeColors.bgWhite(0.6) }}
                      onPress={() => {
                        setOnlySelected(!onlySelected);
                      }}
                    >
                      <IconButton
                        size={35}
                        icon={onlySelected ? "select-inverse" : "select-group"}
                        color={themeColors.bgBlack(0.9)}
                        className="p-0 m-0"
                      />
                    </TouchableOpacity>
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
                    backgroundColor: themeColors.chartBlue(1),
                    borderTopRightRadius: 24,
                    borderTopLeftRadius: 24,
                  }}
                  onPress={() => {
                    saveButton();
                    setModalVisible(false);
                  }}
                >
                  <Text className="text-gray-200 font-bold text-center text-xl">
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
    </View>
  );
}
