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
import { calculateRecipeCosts } from "~/utils/calculateCostsAndCalories";
import RecipeModal from "./RecipeModal";
import { getRecipe } from "~/app/recipesSlice";
import { useSelector } from "react-redux";

export default function RecipeComponent({ recipeId }) {
  const recipe = useSelector((state) => getRecipe(state, recipeId));
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      {recipe ? (
        <>
          {modalVisible ? (
            <RecipeModal
              recipeId={recipeId}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
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
                      elevation: 5,
                    }}
                  >
                    <IconButton
                      className="p-0 m-1"
                      icon={recipe.icon}
                      size={20}
                      color={themeColors.onSecondary}
                    />
                  </View>
                  <View className="ml-1 items-start">
                    <Text
                      className="text-lg "
                      style={{ color: themeColors.onSecondaryContainer }}
                    >
                      {recipe.title}
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
                          {recipe.ingredients.length}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  className="rounded-2xl py-1 px-2 mr-2"
                  style={{ backgroundColor: themeColors.primary, elevation: 5 }}
                >
                  <Text
                    className="text-base font-semibold"
                    style={{ color: themeColors.onPrimary }}
                  >
                    {"€" + calculateRecipeCosts(recipe, ingredients)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </>
      ) : null}
    </>
  );
}
