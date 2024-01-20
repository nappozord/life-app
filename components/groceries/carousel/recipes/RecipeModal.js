import {
  View,
  Text,
  TextInput,
  Image,
  Modal,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useRef, useState } from "react";
import { themeColors } from "~/theme";
import { Divider, IconButton } from "react-native-paper";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import IngredientSearchComponent from "~/components/groceries/searchbar/IngredientSearchComponent";

export default function RecipeModal({
  item,
  modalVisible,
  setModalVisible,
  ingredients,
  setIngredients,
  recipes,
  setRecipes,
}) {
  const inputRef = useRef(null);

  const name = useRef(item ? item.title.toString() : null);
  const [icon, setIcon] = useState(item ? item.icon.toString() : "food");
  const [selected, setSelected] = useState(item ? [...item.ingredients] : []);

  function addRecipe() {
    if (name.current === "" || name.current === null)
      name.current = "New Recipe";

    if (icon === "" || icon === null) icon = "food";

    const ids = recipes.map((object) => {
      return object.id;
    });

    const max = Math.max(...ids);

    recipes.push({
      id: max + 1,
      title: name.current,
      icon: icon,
      used: 0,
      ingredients: [...selected],
    });

    setRecipes([...recipes]);
  }

  function updateRecipe() {
    if (name.current === "" || name.current === null)
      name.current = "New Recipe";

    if (icon === "" || icon === null) icon = "food";

    const recipe = recipes.find((obj) => obj.id === item.id);

    recipe.title = name.current;
    recipe.icon = icon;
    recipe.ingredients = [...selected];

    setRecipes([...recipes]);
  }

  function deleteRecipe() {
    recipes = recipes.filter((obj) => obj.id !== item.id);
    setRecipes([...recipes]);
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
                className="px-4 py-3 rounded-3xl -mt-16 items-center"
                style={{
                  backgroundColor: themeColors.bgBlack(1),
                  borderColor: themeColors.bgGrey(1),
                  borderWidth: 5,
                }}
              >
                {item ? (
                  <>
                    <Text className="text-sm mb-1 text-gray-400">
                      You used:
                    </Text>
                    <Text className=" text-5xl font-semibold text-gray-400">
                      {item.used}
                    </Text>
                    <Text className="text-xl font-semibold -mt-2 text-gray-400">
                      {item.title}
                    </Text>
                  </>
                ) : (
                  <>
                    <View className="flex-row">
                      <IconButton
                        icon={"plus"}
                        color={themeColors.bgGrey(1)}
                        size={30}
                        className="-mr-2"
                      />
                      <IconButton
                        icon={"food"}
                        color={themeColors.bgGrey(1)}
                        size={30}
                        className="-ml-2"
                      />
                    </View>
                    <Text className="text-xl font-semibold -mt-4 mb-4 text-gray-400">
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
                  <Text className="text-gray-700 font-semibold text-lg ml-2">
                    Name
                  </Text>
                  <Text className="text-gray-700 font-semibold text-lg mr-2">
                    Icon
                  </Text>
                </View>
                <View className="flex-row justify-between space-x-2">
                  <View className="flex-1">
                    <TextInput
                      ref={inputRef}
                      className="p-3 text-gray-700 rounded-2xl mb-2 text-base"
                      style={{
                        backgroundColor: themeColors.bgWhite(0.6),
                        height: 50,
                      }}
                      placeholder="E.g. Hot-Dog!"
                      selectionColor={themeColors.bgBlack(1)}
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
                        backgroundColor: themeColors.bgWhite(0.6),
                        height: 50,
                      }}
                    >
                      <TextInput
                        placeholder="E.g. food"
                        className="px-2 flex-1 text-gray-700 text-base"
                        selectionColor={themeColors.bgBlack(1)}
                        defaultValue={icon}
                        onChangeText={(text) => {
                          setIcon(text.split(" ").join("-").toLowerCase());
                        }}
                      />
                      <Pressable
                        className="rounded-2xl"
                        style={{ backgroundColor: themeColors.bgBlack(1) }}
                      >
                        <IconButton
                          size={20}
                          icon={icon}
                          color={themeColors.bgGrey(1)}
                        />
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
              <IngredientSearchComponent
                ingredients={ingredients}
                selected={selected}
                setSelected={setSelected}
                item={item}
              />
              {item ? (
                <View className="flex-row justify-between items-center">
                  <View className="flex-1">
                    <TouchableOpacity
                      className="py-5 px-5 mt-1"
                      style={{
                        backgroundColor: themeColors.chartBlue(1),
                        borderRightColor: themeColors.bgGrey(1),
                        borderRightWidth: 1,
                        borderTopLeftRadius: 24,
                      }}
                      onPress={() => {
                        updateRecipe();
                        setModalVisible(false);
                      }}
                    >
                      <Text className="text-gray-200 font-bold text-center text-xl">
                        Edit
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View className="flex-1">
                    <TouchableOpacity
                      className="py-5 px-5 mt-1"
                      style={{
                        backgroundColor: themeColors.bgBlack(1),
                        borderLeftColor: themeColors.bgGrey(1),
                        borderLeftWidth: 1,
                        borderTopRightRadius: 24,
                      }}
                      onPress={() => {
                        deleteRecipe();
                        setModalVisible(false);
                      }}
                    >
                      <Text className="text-gray-200 font-bold text-center text-xl">
                        Delete
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  className="py-5 mt-2"
                  style={{
                    backgroundColor: themeColors.chartBlue(1),
                    borderTopRightRadius: 24,
                    borderTopLeftRadius: 24,
                  }}
                  onPress={() => {
                    addRecipe();
                    setModalVisible(false);
                  }}
                >
                  <Text className="text-gray-200 font-bold text-center text-xl">
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
