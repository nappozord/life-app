import {
  View,
  Text,
  TextInput,
  Image,
  Modal,
  Pressable,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useRef } from "react";
import { themeColors } from "~/theme";
import { IconButton } from "react-native-paper";
import Animated, { SlideInDown } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import {
  getIngredient,
  addIngredient,
  updateIngredient,
  deleteIngredient,
} from "~/app/ingredientsSlice";

export default function IngredientModal({
  ingredientId,
  modalVisible,
  setModalVisible,
}) {
  const ingredient = useSelector((state) => getIngredient(state, ingredientId));

  const dispatch = useDispatch();

  const inputRef = useRef(null);

  const name = useRef(ingredient ? ingredient.title.toString() : null);
  const cost = useRef(
    ingredient ? parseFloat(ingredient.cost).toFixed(2) : null
  );
  const quantity = useRef(ingredient ? ingredient.quantity.toString() : "1");
  const calories = useRef(
    ingredient
      ? ingredient.calories
        ? parseFloat(ingredient.calories).toFixed(2)
        : null
      : null
  );

  function handleAddIngredient() {
    dispatch(
      addIngredient({
        cost: cost.current,
        quantity: quantity.current,
        name: name.current,
        calories: calories.current,
      })
    );
  }

  function handleUpdateIngredient() {
    dispatch(
      updateIngredient({
        ingredientId,
        cost: cost.current,
        quantity: quantity.current,
        name: name.current,
        calories: calories.current,
      })
    );
  }

  function handleDeleteIngredient() {
    dispatch(deleteIngredient(ingredientId));
  }

  function deleteIngredientFromRecipes() {
    /*recipes.forEach((r) => {
      r.ingredients = r.ingredients.filter((obj) => obj.id !== ingredientid);
    });

    setRecipes([...recipes]);*/
  }

  function deleteIngredientFromMeals() {
    /*meals.forEach((m) => {
      m["breakfast"].ingredients.filter((obj) => obj.id !== ingredientid);
      m["lunch"].ingredients.filter((obj) => obj.id !== ingredientid);
      m["dinner"].ingredients.filter((obj) => obj.id !== ingredientid);
      m["snack"].ingredients.filter((obj) => obj.id !== ingredientid);
    });

    setMeals([...meals]);*/
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
      onShow={() => {
        const timeout = setTimeout(() => {
          ingredient ? null : inputRef.current.focus();
        }, 10);
        return () => clearTimeout(timeout);
      }}
    >
      <Image
        className="absolute h-full w-full"
        source={require("~/assets/splash.png")}
        style={{ opacity: 0.9 }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
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
                  {ingredient ? (
                    <>
                      <Text
                        className="text-sm mb-1 "
                        style={{ color: themeColors.onBackground }}
                      >
                        You have:
                      </Text>
                      <View className="flex-row items-center">
                        <Text
                          className=" text-5xl font-semibold "
                          style={{ color: themeColors.onBackground }}
                        >
                          {Math.ceil(ingredient.stock)}
                        </Text>
                        <Text
                          className="text-base mb-1 "
                          style={{ color: themeColors.onBackground }}
                        >
                          {"(" +
                            (ingredient.quantity === 1
                              ? (
                                  ingredient.stock * ingredient.quantity
                                ).toFixed(1)
                              : Math.round(
                                  ingredient.stock * ingredient.quantity
                                )) +
                            ")"}
                        </Text>
                      </View>
                      <Text
                        className="text-xl font-semibold -mt-2 "
                        style={{ color: themeColors.onBackground }}
                      >
                        {ingredient.title}
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
                          icon={"apple"}
                          color={themeColors.onBackground}
                          size={30}
                          className="-ml-2"
                        />
                      </View>
                      <Text
                        className="text-xl font-semibold -mt-4 mb-4"
                        style={{ color: themeColors.onBackground }}
                      >
                        Ingredient
                      </Text>
                    </>
                  )}
                </View>
                <View />
              </View>
              <View className="-mt-7">
                <View className="space-y-1 p-5">
                  <Text
                    className="font-semibold text-lg ml-2"
                    style={{ color: themeColors.onSecondaryContainer }}
                  >
                    Name
                  </Text>
                  <TextInput
                    ref={inputRef}
                    className="p-3 rounded-2xl mb-2 text-base"
                    style={{
                      backgroundColor: themeColors.onSecondaryContainer,
                      color: themeColors.background,
                    }}
                    placeholder="E.g. Banana!"
                    selectionColor={themeColors.background}
                    defaultValue={name.current}
                    onChangeText={(text) => {
                      name.current = text;
                    }}
                  />
                  <View className="flex-row justify-between items-center space-x-4 mb-2">
                    <View className="flex-1 space-y-1">
                      <Text
                        className="font-semibold text-lg ml-2"
                        style={{ color: themeColors.onSecondaryContainer }}
                      >
                        Cost
                      </Text>
                      <View
                        className="flex-row items-center rounded-2xl p-1 overflow-visible"
                        style={{
                          backgroundColor: themeColors.onSecondaryContainer,
                          height: 50,
                        }}
                      >
                        <TextInput
                          keyboardType="numeric"
                          placeholder="E.g. €12.34"
                          className="px-2 flex-1 text-base"
                          style={{ color: themeColors.background }}
                          selectionColor={themeColors.background}
                          defaultValue={cost.current}
                          onChangeText={(text) => {
                            cost.current = text;
                          }}
                        />
                        <Pressable
                          className="rounded-2xl pr-0.5"
                          style={{ backgroundColor: themeColors.background }}
                        >
                          <IconButton
                            size={20}
                            icon="currency-eur"
                            color={themeColors.onBackground}
                          />
                        </Pressable>
                      </View>
                    </View>
                    <View className="flex-1 space-y-1">
                      <Text
                        className="font-semibold text-lg ml-2"
                        style={{ color: themeColors.onSecondaryContainer }}
                      >
                        Qty (pack)
                      </Text>
                      <View
                        className="flex-row items-center rounded-2xl p-1 overflow-visible"
                        style={{
                          backgroundColor: themeColors.onSecondaryContainer,
                          height: 50,
                        }}
                      >
                        <TextInput
                          keyboardType="numeric"
                          placeholder="E.g. x3"
                          className="px-2 flex-1  text-base"
                          style={{ color: themeColors.background }}
                          selectionColor={themeColors.background}
                          defaultValue={quantity.current}
                          onChangeText={(text) => {
                            if (text === "" || text === null)
                              quantity.current = 1;
                            else quantity.current = text.split(" ").join("");
                          }}
                        />
                        <Pressable
                          className="rounded-2xl pr-0.5"
                          style={{ backgroundColor: themeColors.background }}
                        >
                          <IconButton
                            size={20}
                            icon="package-variant"
                            color={themeColors.onSecondaryContainer}
                          />
                        </Pressable>
                      </View>
                    </View>
                  </View>
                  <Text
                    className="font-semibold text-lg ml-2"
                    style={{ color: themeColors.onSecondaryContainer }}
                  >
                    Calories (piece)
                  </Text>
                  <TextInput
                    keyboardType="numeric"
                    className="p-3 rounded-2xl text-base mb-4"
                    style={{
                      backgroundColor: themeColors.onSecondaryContainer,
                      color: themeColors.background,
                    }}
                    placeholder="E.g. 100"
                    selectionColor={themeColors.background}
                    defaultValue={calories.current}
                    onChangeText={(text) => {
                      calories.current = text;
                    }}
                  />
                  {ingredient ? (
                    <View className="flex-row justify-between items-center">
                      <View className="flex-row items-center">
                        <IconButton
                          className="p-0 m-0"
                          icon="update"
                          size={20}
                          color={themeColors.onSecondaryContainer}
                        />
                        <Text
                          className="text-xs"
                          style={{ color: themeColors.onSecondaryContainer }}
                        >
                          {"Last update: " +
                            (ingredient && ingredient.lastUpdate
                              ? ingredient.lastUpdate
                              : new Date().toLocaleDateString("it-IT"))}
                        </Text>
                      </View>
                      <TouchableOpacity className="flex-row items-center">
                        <Text
                          className="text-sm font-semibold"
                          style={{ color: themeColors.primary }}
                        >
                          Check history
                        </Text>
                        <IconButton
                          className="p-0 m-0"
                          icon="clipboard-text-clock-outline"
                          size={20}
                          color={themeColors.primary}
                        />
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </View>
                {ingredient ? (
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
                          handleUpdateIngredient();
                          setModalVisible(false);
                        }}
                      >
                        <Text
                          className="font-bold text-center text-xl"
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
                          handleDeleteIngredient();
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
                      handleAddIngredient();
                      setModalVisible(false);
                    }}
                  >
                    <Text
                      className="font-bold text-center text-xl"
                      style={{ color: themeColors.onPrimary }}
                    >
                      Add Ingredient
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </Animated.View>
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}
