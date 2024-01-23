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
      {modalVisible ? (
        <RecipeModal
          item={item}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          ingredients={ingredients}
          setIngredients={setIngredients}
          recipes={recipes}
          setRecipes={setRecipes}
        />
      ) : null}
      <Animated.View entering={SlideInRight} exiting={SlideOutLeft}>
        <TouchableOpacity
          style={{
            backgroundColor: themeColors.secondaryContainer,
          }}
          className="mb-1 px-1 py-1 rounded-xl"
          onPress={() => setModalVisible(!modalVisible)}
        >
          <View className="flex-row justify-between p-0 items-center">
            <View className="flex-row items-center">
              <View
                className="rounded-full px-0 py-0 mx-1 overflow-hidden"
                style={{
                  backgroundColor: themeColors.secondary,
                  elevation: 10,
                }}
              >
                <IconButton
                  className="p-0 m-1"
                  icon={item.icon}
                  size={20}
                  color={themeColors.onSecondary}
                />
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
                    className="text-sm"
                    style={{ color: themeColors.onSecondaryContainer }}
                  >
                    {"# of ingredients:"}
                  </Text>
                  <View
                    className="rounded-full px-1.5 py-0"
                    style={{ backgroundColor: themeColors.secondary }}
                  >
                    <Text
                      className=" text-xs font-semibold"
                      style={{ color: themeColors.onSecondary }}
                    >
                      {item.ingredients.length}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              className="rounded-2xl py-1 px-2 mr-2"
              style={{ backgroundColor: themeColors.primary, elevation: 10 }}
            >
              <Text
                className="text-base font-semibold"
                style={{ color: themeColors.onPrimary }}
              >
                {"€" + calculateRecipeCosts(item, ingredients)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}
