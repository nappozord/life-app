import React, { useState, useEffect, useRef } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  getCategories,
  restoreBackup,
  saveCategories,
  getUser,
  updateUser,
  getGroceries,
  updateGroceries,
  getIngredients,
  updateIngredients,
  getRecipes,
  updateRecipes,
} from "~/api/apiManager";
import Animated, {
  withTiming,
  FadeIn,
  FadeOut,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import ChipListComponent from "~/components/groceries/chip/ChipListComponent";
import HeaderComponent from "~/components/header/HeaderComponent";
import GroceriesCarouselComponent from "~/components/groceries/carousel/GroceriesCarouselComponent";

export default function App() {
  const [groceries, setGroceries] = useState();
  const [ingredients, setIngredients] = useState();
  const [recipes, setRecipes] = useState();
  const [user, setUser] = useState({});
  const [activeChip, setActiveChip] = useState(0);
  const chipListRef = useRef(null);

  const categories = [
    {
      index: 0,
      title: "Meal Plan",
    },
    {
      index: 1,
      title: "Groceries",
    },
    {
      index: 2,
      title: "Recipes",
    },
    {
      index: 3,
      title: "Ingredients",
    },
  ];

  const searchBarHeight = useSharedValue(76);

  useEffect(() => {
    !user.email ? getUser().then((r) => setUser(r)) : updateUser(user);
  }, [user]);

  useEffect(() => {
    !groceries
      ? getGroceries().then((r) => setGroceries(r))
      : updateGroceries(groceries);
  }, [groceries]);

  useEffect(() => {
    !ingredients
      ? getIngredients().then((r) => setIngredients(r))
      : updateIngredients(ingredients);
  }, [ingredients]);

  useEffect(() => {
    !recipes
      ? getRecipes().then((r) => setRecipes(r))
      : updateRecipes(recipes);
  }, [recipes]);

  const searchBarAnimatedStyle = useAnimatedStyle(() => ({
    height: searchBarHeight.value,
  }));

  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <Image
        className="absolute h-full w-full"
        source={require("~/assets/bg.png")}
        blurRadius={80}
      />
      {user.email ? (
        <>
          <View className="mt-16 flex-1">
            <Animated.View style={searchBarAnimatedStyle} className="mx-5">
              <HeaderComponent user={user} setUser={setUser} />
            </Animated.View>
            <View className="mb-7 -mt-1">
              <ChipListComponent
                categories={categories}
                activeChip={activeChip}
                setActiveChip={setActiveChip}
                chipListRef={chipListRef}
              />
            </View>
            {groceries && ingredients && recipes ? (
              <Animated.View
                className="justify-end overflow-hidden flex-1"
                entering={FadeIn}
                exiting={FadeOut}
              >
                <View className="pb-24">
                  <GroceriesCarouselComponent
                    categories={categories}
                    groceries={groceries}
                    setGroceries={setGroceries}
                    ingredients={ingredients}
                    setIngredients={setIngredients}
                    recipes={recipes}
                    setRecipes={setRecipes}
                    activeChip={activeChip}
                    setActiveChip={setActiveChip}
                    user={user}
                    setUser={setUser}
                    chipListRef={chipListRef}
                  />
                </View>
              </Animated.View>
            ) : (
              <View
                className="justify-end mx-5 overflow-hidden flex-1"
                style={{
                  borderRadius: 25,
                }}
              />
            )}
          </View>
        </>
      ) : (
        <View></View>
      )}
    </View>
  );
}
