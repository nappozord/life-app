import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { themeColors } from "~/theme";
import { IconButton } from "react-native-paper";
import Animated, {
  SlideInRight,
  SlideInUp,
  SlideOutDown,
  SlideOutLeft,
} from "react-native-reanimated";
import IngredientModal from "./IngredientModal";
import IngredientPercentageComponent from "./IngredientPercentageComponent";
import { useDispatch, useSelector } from "react-redux";
import { addLog } from "~/app/logsSlice";
import {
  getIngredient,
  incrementIngredient,
  decrementIngredient,
} from "~/app/ingredientsSlice";

export default function IngredientComponent({ ingredientId }) {
  const ingredient = useSelector((state) => getIngredient(state, ingredientId));

  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);

  const handleIncrementIngredient = () => {
    dispatch(incrementIngredient(ingredientId));
    dispatch(
      addLog([
        {
          text: "ADD " + ingredient.title,
          description:
            "Manual add of ingredient " +
            ingredient.title +
            " for a total of " +
            ingredient.stock +
            ".",
          icon: "plus",
          auto: false,
        },
      ])
    );
  };

  const handleDecrementIngredient = () => {
    dispatch(decrementIngredient(ingredientId));
    dispatch(
      addLog([
        {
          text: "REMOVE " + ingredient.title,
          description:
            "Manual remove of ingredient " +
            ingredient.title +
            " for a total of " +
            ingredient.stock +
            ".",
          icon: "minus",
          auto: false,
        },
      ])
    );
  };

  return (
    <>
      {ingredient ? (
        <>
          {modalVisible ? (
            <IngredientModal
              ingredientId={ingredientId}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
          ) : null}
          <Animated.View exiting={SlideOutLeft} entering={SlideInRight}>
            <TouchableOpacity
              style={{
                backgroundColor: themeColors.secondaryContainer,
              }}
              className="mb-1 px-1 py-1 rounded-xl overflow-hidden"
              onPress={() => setModalVisible(!modalVisible)}
            >
              <View className="flex-row justify-between p-0">
                <View className="flex-row items-center">
                  <View
                    className="rounded-full px-4 py-1 mx-1 overflow-hidden"
                    style={{
                      backgroundColor: themeColors.secondary,
                      elevation: 5,
                    }}
                  >
                    <Animated.View
                      entering={SlideInUp}
                      exiting={SlideOutDown}
                      key={ingredientId + ingredient.stock}
                    >
                      <Text
                        className="text-lg font-semibold"
                        style={{ color: themeColors.onSecondary }}
                      >
                        {Math.ceil(ingredient.stock)}
                      </Text>
                    </Animated.View>
                  </View>
                  <View className="ml-1 items-start">
                    <Text
                      className="text-lg "
                      style={{ color: themeColors.onSecondaryContainer }}
                    >
                      {ingredient.title}
                    </Text>
                    <View className="flex-row items-center space-x-1">
                      <Text
                        className="text-sm "
                        style={{ color: themeColors.onSecondaryContainer }}
                      >
                        {"€" + parseFloat(ingredient.cost).toFixed(2)}
                      </Text>
                      <View
                        className="rounded-full px-1.5 py-0"
                        style={{ backgroundColor: themeColors.secondary }}
                      >
                        <Text
                          className=" text-xs font-semibold"
                          style={{ color: themeColors.onSecondary }}
                        >
                          {"x" + ingredient.quantity}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View className="flex-row items-center">
                  <IconButton
                    icon={"minus"}
                    color={themeColors.onSecondaryContainer}
                    size={28}
                    className="m-0 p-0"
                    onPress={() => handleDecrementIngredient()}
                  />
                  <IconButton
                    icon={"plus"}
                    color={themeColors.onSecondaryContainer}
                    size={28}
                    className="m-0 p-0"
                    onPress={() => handleIncrementIngredient()}
                  />
                </View>
              </View>
              <View className="mt-1 -mb-1 -mx-1">
                <IngredientPercentageComponent ingredientId={ingredientId} />
              </View>
            </TouchableOpacity>
          </Animated.View>
        </>
      ) : null}
    </>
  );
}
