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
import React, { useRef } from "react";
import { themeColors } from "~/theme";
import { IconButton } from "react-native-paper";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";

export default function IngredientModal({
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
  const cost = useRef(item ? item.cost.toString() : null);
  const quantity = useRef(item ? item.quantity.toString() : "1");

  function addIngredient() {
    if (cost.current === "" || cost.current === null) cost.current = 0.0;

    if (quantity.current === "" || quantity.current === null)
      quantity.current = 1;

    if (name.current === "" || name.current === null)
      name.current = "New Ingredient";

    const ids = ingredients.map((object) => {
      return object.id;
    });

    const max = Math.max(...ids);

    ingredients.push({
      id: max + 1,
      title: name.current,
      cost: cost.current,
      quantity: quantity.current,
      stock: 0,
      duration: 7,
    });

    setIngredients([...ingredients]);
  }

  function updateIngredient() {
    if (cost.current === "" || cost.current === null) cost.current = 0.0;

    if (quantity.current === "" || quantity.current === null)
      quantity.current = 1;

    if (name.current === "" || name.current === null)
      name.current = "New Ingredient";
    
    const ingredient = ingredients.find((obj) => obj.id === item.id);

    ingredient.title = name.current;
    ingredient.cost = cost.current;
    ingredient.quantity = quantity.current;

    setIngredients([...ingredients]);
  }

  function deleteIngredient() {
    ingredients = ingredients.filter((obj) => obj.id !== item.id);
    setIngredients([...ingredients]);
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
          item ? null : inputRef.current.focus();
        }, 10);
        return () => clearTimeout(timeout);
      }}
    >
      <Image
        className="absolute h-full w-full"
        source={require("~/assets/bg.png")}
        blurRadius={80}
        style={{ opacity: 0.9 }}
      />
      <KeyboardAvoidingView
        //keyboardVerticalOffset={-50}
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
                        You have:
                      </Text>
                      <Text className=" text-5xl font-semibold text-gray-400">
                        {item.stock}
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
                          icon={"apple"}
                          color={themeColors.bgGrey(1)}
                          size={30}
                          className="-ml-2"
                        />
                      </View>
                      <Text className="text-xl font-semibold -mt-4 mb-4 text-gray-400">
                        Ingredient
                      </Text>
                    </>
                  )}
                </View>
                <View />
              </View>
              <View className="-mt-7">
                <View className="space-y-1 p-5">
                  <Text className="text-gray-700 font-semibold text-lg ml-2">
                    Name
                  </Text>
                  <TextInput
                    ref={inputRef}
                    className="p-3 text-gray-700 rounded-2xl mb-2 text-base"
                    style={{ backgroundColor: themeColors.bgWhite(0.6) }}
                    placeholder="E.g. Banana!"
                    selectionColor={themeColors.bgBlack(1)}
                    defaultValue={name.current}
                    onChangeText={(text) => {
                      name.current = text;
                    }}
                  />
                  <View className="flex-row justify-between items-center space-x-4">
                    <View className="flex-1">
                      <Text className="text-gray-700 font-semibold text-lg ml-2">
                        Cost
                      </Text>
                      <View
                        className="flex-row items-center rounded-2xl p-1 overflow-visible"
                        style={{
                          backgroundColor: themeColors.bgWhite(0.6),
                          height: 50,
                        }}
                      >
                        <TextInput
                          keyboardType="numeric"
                          placeholder="E.g. €12.34"
                          className="px-2 flex-1 text-gray-700 text-base"
                          selectionColor={themeColors.bgBlack(1)}
                          defaultValue={cost.current}
                          onChangeText={(text) => {
                            cost.current = text;
                          }}
                        />
                        <Pressable
                          className="rounded-2xl pr-0.5"
                          style={{ backgroundColor: themeColors.bgBlack(1) }}
                        >
                          <IconButton
                            size={20}
                            icon="currency-eur"
                            color={themeColors.bgGrey(1)}
                          />
                        </Pressable>
                      </View>
                    </View>
                    <View className="flex-1">
                      <Text className="text-gray-700 font-semibold text-lg ml-2">
                        Qty per pack
                      </Text>
                      <View
                        className="flex-row items-center rounded-2xl p-1 overflow-visible"
                        style={{
                          backgroundColor: themeColors.bgWhite(0.6),
                          height: 50,
                        }}
                      >
                        <TextInput
                          keyboardType="numeric"
                          placeholder="E.g. x3"
                          className="px-2 flex-1 text-gray-700 text-base"
                          selectionColor={themeColors.bgBlack(1)}
                          defaultValue={quantity.current}
                          onChangeText={(text) => {
                            if (text === "" || text === null)
                              quantity.current = 1;
                            else quantity.current = text.split(" ").join("");
                          }}
                        />
                        <Pressable
                          className="rounded-2xl pr-0.5"
                          style={{ backgroundColor: themeColors.bgBlack(1) }}
                        >
                          <IconButton
                            size={20}
                            icon="counter"
                            color={themeColors.bgGrey(1)}
                          />
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </View>
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
                          updateIngredient();
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
                          deleteIngredient();
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
                      addIngredient();
                      setModalVisible(false);
                    }}
                  >
                    <Text className="text-gray-200 font-bold text-center text-xl">
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
