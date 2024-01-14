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
import { calculateRecipeCosts } from "~/utils/calculateCosts";
import RecipeModal from "./RecipeModal";

export default function RecipeComponent({
  meals,
  setMeals,
  ingredients,
  setIngredients,
  recipes,
  setRecipes,
  item,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      {modalVisible ? <RecipeModal
        item={item}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        ingredients={ingredients}
        setIngredients={setIngredients}
        recipes={recipes}
        setRecipes={setRecipes}
      /> : null}
      <Animated.View entering={SlideInRight} exiting={SlideOutLeft}>
        <TouchableOpacity
          style={{
            backgroundColor: themeColors.bgBlack(0.7),
          }}
          className="mb-1 px-1 py-1 rounded-xl"
          onPress={() => setModalVisible(!modalVisible)}
        >
          <View className="flex-row justify-between p-0 items-center">
            <View className="flex-row items-center">
              <View
                className="rounded-full px-0 py-0 mx-1 overflow-hidden"
                style={{ backgroundColor: themeColors.bgWhite(0.3) }}
              >
                <IconButton
                  className="p-0 m-1"
                  icon={item.icon}
                  size={20}
                  color={themeColors.bgWhite(0.7)}
                />
              </View>
              <View className="ml-1 items-start">
                <Text className="text-lg text-gray-200">{item.title}</Text>
                <View className="flex-row items-center space-x-1">
                  <Text className="text-sm text-gray-300">
                    {"# of ingredients:"}
                  </Text>
                  <View
                    className="rounded-full px-1.5 py-0"
                    style={{ backgroundColor: themeColors.bgWhite(0.4) }}
                  >
                    <Text className=" text-xs text-gray-300">
                      {item.ingredients.length}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              className="rounded-2xl py-1 px-2 mr-2"
              style={{ backgroundColor: themeColors.bgWhite(0.3) }}
            >
              <Text className="text-base text-gray-300">
                {"€" + calculateRecipeCosts(item, ingredients)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}
