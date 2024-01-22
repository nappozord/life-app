import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { themeColors } from "~/theme";
import { Divider, IconButton } from "react-native-paper";
import Animated, {
  SlideInRight,
  SlideInUp,
  SlideOutDown,
  SlideOutLeft,
} from "react-native-reanimated";
import IngredientModal from "./IngredientModal";
import IngredientPercentageComponent from "./IngredientPercentageComponent";

export default function IngredientComponent({
  meals,
  setMeals,
  ingredients,
  setIngredients,
  recipes,
  setRecipes,
  item,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const addItem = () => {
    item.stock += 1;
    setIngredients([...ingredients]);
  };

  const subItem = () => {
    item.stock > 0 ? (item.stock -= 1) : (item.stock = 0);
    setIngredients([...ingredients]);
  };

  return (
    <>
      {modalVisible ? (
        <IngredientModal
          item={item}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          ingredients={ingredients}
          setIngredients={setIngredients}
          recipes={recipes}
          setRecipes={setRecipes}
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
                style={{ backgroundColor: themeColors.primary }}
              >
                <Animated.View
                  entering={SlideInUp}
                  exiting={SlideOutDown}
                  key={item.id + item.stock}
                >
                  <Text
                    className="text-lg"
                    style={{ color: themeColors.onPrimary }}
                  >
                    {Math.ceil(item.stock)}
                  </Text>
                </Animated.View>
              </View>
              <View className="ml-1 items-start">
                <Text
                  className="text-lg "
                  style={{ color: themeColors.onSecondaryContainer }}
                >
                  {item.title}
                </Text>
                <View className="flex-row items-center space-x-1">
                  <Text
                    className="text-sm "
                    style={{ color: themeColors.onSecondaryContainer }}
                  >
                    {"€" + parseFloat(item.cost).toFixed(2)}
                  </Text>
                  <View
                    className="rounded-full px-1.5 py-0"
                    style={{ backgroundColor: themeColors.secondary }}
                  >
                    <Text
                      className=" text-xs "
                      style={{ color: themeColors.onSecondary }}
                    >
                      {"x" + item.quantity}
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
                onPress={() => subItem()}
              />
              <IconButton
                icon={"plus"}
                color={themeColors.onSecondaryContainer}
                size={28}
                className="m-0 p-0"
                onPress={() => addItem()}
              />
            </View>
          </View>
          <View className="mt-1 -mb-1 -mx-1">
            <IngredientPercentageComponent
              item={item}
              meals={meals}
              recipes={recipes}
            />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}
