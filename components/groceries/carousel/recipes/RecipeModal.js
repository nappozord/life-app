import {
  View,
  Text,
  TextInput,
  Image,
  Modal,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import { themeColors } from "~/theme";
import { IconButton } from "react-native-paper";
import Animated, { SlideInDown } from "react-native-reanimated";
import IngredientSearchComponent from "~/components/groceries/searchbar/IngredientSearchComponent";
import { useDispatch, useSelector } from "react-redux";
import { getRecipe } from "~/app/recipesSlice";
import { addRecipe, deleteRecipe, updateRecipe } from "~/app/recipesSlice";

export default function RecipeModal({
  recipeId,
  modalVisible,
  setModalVisible,
}) {
  const recipe = useSelector((state) => getRecipe(state, recipeId));
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  const dispatch = useDispatch();

  const inputRef = useRef(null);

  const name = useRef(recipe ? recipe.title.toString() : null);
  const [icon, setIcon] = useState(recipe ? recipe.icon.toString() : "food");
  const [selected, setSelected] = useState(
    recipe ? [...recipe.ingredients] : []
  );

  function handleAddRecipe() {
    dispatch(addRecipe({ name: name.current, icon, selected: [...selected] }));
  }

  function handleUpdateRecipe() {
    dispatch(
      updateRecipe({
        name: name.current,
        icon,
        selected: [...selected],
        recipeId,
      })
    );
  }

  function handleDeleteRecipe() {
    dispatch(deleteRecipe(recipeId));
  }

  function deleteRecipeFromMeals() {
    meals.forEach((m) => {
      m["breakfast"].recipes.filter((obj) => obj !== recipe.id);
      m["lunch"].recipes.filter((obj) => obj !== recipe.id);
      m["dinner"].recipes.filter((obj) => obj !== recipe.id);
      m["snack"].recipes.filter((obj) => obj !== recipe.id);
    });

    setMeals([...meals]);
  }

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
                className="px-4 py-3 rounded-3xl -mt-16 items-center"
                style={{
                  backgroundColor: themeColors.background,
                  borderColor: themeColors.onSecondary,
                  borderWidth: 5,
                }}
              >
                {recipe ? (
                  <>
                    <Text
                      className="text-sm mb-1 "
                      style={{ color: themeColors.onBackground }}
                    >
                      You prepared:
                    </Text>
                    <Text
                      className=" text-5xl font-semibold "
                      style={{ color: themeColors.onBackground }}
                    >
                      {recipe.used}
                    </Text>
                    <Text
                      className="text-xl font-semibold -mt-2 "
                      style={{ color: themeColors.onBackground }}
                    >
                      {recipe.title}
                    </Text>
                  </>
                ) : (
                  <>
                    <View className="flex-row">
                      <IconButton
                        icon={"plus"}
                        color={themeColors.onBackground}
                        size={30}
                        className="-mr-2"
                      />
                      <IconButton
                        icon={"food"}
                        color={themeColors.onBackground}
                        size={30}
                        className="-ml-2"
                      />
                    </View>
                    <Text
                      className="text-xl font-semibold -mt-4 mb-4 "
                      style={{ color: themeColors.onBackground }}
                    >
                      Recipe
                    </Text>
                  </>
                )}
              </View>
              <View />
            </View>
            <View className="-mt-7">
              <View className="p-5">
                <View className="flex-row justify-between">
                  <Text
                    className="font-semibold text-lg ml-2"
                    style={{ color: themeColors.onSecondaryContainer }}
                  >
                    Name
                  </Text>
                  <Text
                    className="font-semibold text-lg mr-2"
                    style={{ color: themeColors.onSecondaryContainer }}
                  >
                    Icon
                  </Text>
                </View>
                <View className="flex-row justify-between space-x-2">
                  <View className="flex-1">
                    <TextInput
                      ref={inputRef}
                      className="p-3 rounded-2xl mb-2 text-base"
                      style={{
                        backgroundColor: themeColors.onSecondaryContainer,
                        height: 50,
                      }}
                      placeholder="E.g. Hot-Dog!"
                      selectionColor={themeColors.background}
                      defaultValue={name.current}
                      onChangeText={(text) => {
                        name.current = text;
                      }}
                    />
                  </View>
                  <View className="flex-1">
                    <View
                      className="flex-row items-center rounded-2xl p-1 -mb-1"
                      style={{
                        backgroundColor: themeColors.onSecondaryContainer,
                        height: 50,
                      }}
                    >
                      <TextInput
                        placeholder="E.g. food"
                        className="px-2 flex-1 text-base"
                        style={{
                          backgroundColor: themeColors.onSecondaryContainer,
                          color: themeColors.background,
                        }}
                        defaultValue={icon}
                        onChangeText={(text) => {
                          setIcon(text.split(" ").join("-").toLowerCase());
                        }}
                      />
                      <Pressable
                        className="rounded-2xl"
                        style={{ backgroundColor: themeColors.background }}
                      >
                        <IconButton
                          size={20}
                          icon={icon}
                          color={themeColors.onBackground}
                        />
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
              <IngredientSearchComponent
                ingredients={[...ingredients]}
                selected={selected}
                setSelected={setSelected}
                recipes={[]}
                items={[]}
              />
              {recipe ? (
                <View className="flex-row justify-between items-center">
                  <View className="flex-1">
                    <TouchableOpacity
                      className="py-5 px-5 mt-1"
                      style={{
                        backgroundColor: themeColors.primary,
                        borderRightColor: themeColors.secondaryContainer,
                        borderRightWidth: 1,
                        borderTopLeftRadius: 24,
                      }}
                      onPress={() => {
                        handleUpdateRecipe();
                        setModalVisible(false);
                      }}
                    >
                      <Text
                        className=" font-bold text-center text-xl"
                        style={{ color: themeColors.onPrimary }}
                      >
                        Edit
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View className="flex-1">
                    <TouchableOpacity
                      className="py-5 px-5 mt-1"
                      style={{
                        backgroundColor: themeColors.errorContainer,
                        borderLeftColor: themeColors.secondaryContainer,
                        borderLeftWidth: 1,
                        borderTopRightRadius: 24,
                      }}
                      onPress={() => {
                        handleDeleteRecipe();
                        setModalVisible(false);
                      }}
                    >
                      <Text
                        className="font-bold text-center text-xl"
                        style={{ color: themeColors.onErrorContainer }}
                      >
                        Delete
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  className="py-5 mt-2"
                  style={{
                    backgroundColor: themeColors.primary,
                    borderTopRightRadius: 24,
                    borderTopLeftRadius: 24,
                  }}
                  onPress={() => {
                    handleAddRecipe();
                    setModalVisible(false);
                  }}
                >
                  <Text
                    className="font-bold text-center text-xl"
                    style={{ color: themeColors.onPrimary }}
                  >
                    Add Recipe
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
