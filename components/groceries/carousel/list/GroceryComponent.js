import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { themeColors } from "~/theme";
import { IconButton } from "react-native-paper";
import Animated, { FadeIn, SlideInUp } from "react-native-reanimated";
import AddIngredientModal from "./AddIngredientModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteGroceryItem, addGroceryItem } from "~/app/groceriesSlice";
import { incrementIngredient } from "~/app/ingredientsSlice";
import { incrementItem } from "~/app/itemsSlice";

export default function GroceryComponent({ item }) {
  const groceryList = useSelector((state) => state.groceries.list.groceryList);

  const dispatch = useDispatch();

  const [counter, setCounter] = useState(item.onCart);
  const [modalVisible, setModalVisible] = useState(false);

  const firstRender = useRef(true);

  const toBuy = item.checked
    ? item.onCart
    : groceryList.added.find((a) => a.id === item.ingredient.id)
    ? Math.ceil(
        item.needed / (item.ingredient.quantity ? item.ingredient.quantity : 1)
      )
    : Math.ceil(
        item.needed /
          (item.ingredient.quantity ? item.ingredient.quantity : 1) -
          item.ingredient.stock
      );

  function deleteFromGroceryList() {
    dispatch(deleteGroceryItem(item));
  }

  function saveGroceryList(quantity) {
    dispatch(addGroceryItem({ item, quantity }));
    dispatch(incrementIngredient({ id: item.ingredient.id, quantity }));
    dispatch(incrementItem({ id: item.ingredient.id, quantity }));
  }

  useEffect(() => {
    if (!firstRender.current) {
      saveGroceryList(counter);
    } else {
      firstRender.current = false;
    }
  }, [counter]);

  if (item.ingredient.id < 0) {
    return (
      <>
        {modalVisible ? (
          <AddIngredientModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        ) : null}
        <Animated.View entering={FadeIn} className="flex-1 mt-8 mb-2 px-1">
          <View className="flex-row justify-between align-center rounded-full z-10">
            <View />
            <TouchableOpacity
              className="rounded-full -mt-7 items-center"
              style={{
                backgroundColor: themeColors.primary,
                elevation: 5,
              }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <IconButton
                icon={"plus"}
                size={20}
                color={themeColors.onPrimary}
              />
            </TouchableOpacity>
            <View />
          </View>
          <TouchableOpacity
            className="-mt-7 rounded-2xl p-2"
            style={{
              backgroundColor: themeColors.secondary,
            }}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View className="justify-between items-center space-y-1">
              <View className="flex-1 pt-8 pb-6">
                <Text
                  className={"text-base text-center"}
                  style={{ color: themeColors.onSecondary }}
                >
                  {item.ingredient.title}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </>
    );
  }

  return (
    <Animated.View entering={FadeIn} className="flex-1 mt-8 mb-2 px-1">
      <View className="flex-row justify-between align-center rounded-full z-10">
        <View />
        <View className="flex-row -mt-7 space-x-2 items-center">
          <View
            className="px-2 py-0 rounded-full onverflow-hidden"
            style={{
              backgroundColor: "transparent",
              maxWidth: 50,
            }}
          >
            <View className="flex-row overflow-hidden">
              <Animated.View
                entering={SlideInUp}
                key={item.ingredient.id + counter}
              >
                <Text
                  className="text-sm"
                  style={{ color: "transparent" }}
                  numberOfLines={1}
                >
                  {counter}
                </Text>
              </Animated.View>
              <Text
                className="text-sm"
                style={{ color: "transparent" }}
                numberOfLines={1}
              >
                {"/" + toBuy}
              </Text>
            </View>
          </View>
          <View
            className="rounded-full py-1 px-2"
            style={{ backgroundColor: themeColors.secondary, elevation: 5 }}
          >
            <Text
              className="text-base text-center font-semibold "
              style={{ color: themeColors.onSecondary }}
            >
              {"€" +
                (
                  parseFloat(item.ingredient.cost) * (counter > 0 ? counter : 1)
                ).toFixed(2)}
            </Text>
          </View>
          <View
            className="px-2 py-0 rounded-full"
            style={{
              backgroundColor: themeColors.background,
              elevation: 5,
              maxWidth: 50,
            }}
          >
            <View className="flex-row overflow-hidden">
              <Animated.View
                entering={SlideInUp}
                key={item.ingredient.id + counter}
              >
                <Text
                  className="text-sm"
                  style={{ color: themeColors.onBackground }}
                  numberOfLines={1}
                >
                  {counter}
                </Text>
              </Animated.View>

              <Text
                className="text-sm"
                style={{ color: themeColors.onBackground }}
                numberOfLines={1}
              >
                {"/" + toBuy}
              </Text>
            </View>
          </View>
        </View>
        <View />
      </View>
      <TouchableOpacity
        className="-mt-4 rounded-2xl p-2"
        style={{
          backgroundColor:
            counter >= toBuy
              ? themeColors.success
              : themeColors.secondaryContainer,
        }}
      >
        <View className="justify-between items-center space-y-1 -mt-2">
          <View className="flex-1 pt-5">
            <Text
              className="text-base text-center font-semibold"
              style={{ color: themeColors.onSecondaryContainer }}
            >
              {item.ingredient.title}
            </Text>
          </View>
          <View className="flex-row justify-between items-center -mx-2 -mb-2 pt-1">
            <View className="flex-1">
              <TouchableOpacity
                className="flex-row items-center justify-evenly"
                style={{
                  backgroundColor: themeColors.secondaryContainer,
                  borderBottomLeftRadius: 16,
                  borderTopWidth: 0.5,
                  borderTopColor: themeColors.onSecondaryContainer,
                }}
                onPress={() => {
                  setCounter((prev) => prev + 1);
                }}
              >
                <IconButton
                  icon={"basket-plus"}
                  size={20}
                  color={themeColors.onSecondaryContainer}
                />
              </TouchableOpacity>
            </View>
            <View className="flex-3">
              <TouchableOpacity
                className="items-center"
                style={{
                  backgroundColor: themeColors.errorContainer,
                  borderBottomRightRadius: 16,
                  borderTopWidth: 0.5,
                  borderTopColor: themeColors.onSecondaryContainer,
                }}
                onPress={() => {
                  setCounter((prev) => (prev > 0 ? prev - 1 : 0));
                }}
                onLongPress={() => {
                  deleteFromGroceryList();
                }}
              >
                <IconButton
                  icon={"basket-remove"}
                  size={20}
                  color={themeColors.onErrorContainer}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
