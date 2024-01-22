import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Animated, { SlideInRight } from "react-native-reanimated";
import { themeColors } from "~/theme";
import { IconButton } from "react-native-paper";
import { calculateRecipeCosts } from "~/utils/calculateCosts";
import { FlashList } from "@shopify/flash-list";
import IngredientSelectionComponent from "~/components/groceries/searchbar/IngredientSelectionComponent";

export default function RecipesIngredientsListComponent({
  style,
  items,
  ingredients,
  selected,
  setSelected,
}) {
  const [selectedIngredients, setSelectedIngredients] = useState(
    selected.ingredients
  );

  items.sort((a, b) => (a.title > b.title ? 1 : b.title > a.title ? -1 : 0));

  useEffect(() => {
    selected.ingredients = selectedIngredients;
    setSelected({ ...selected });
  }, [selectedIngredients]);

  function saveRecipe(item) {
    if (selected.recipes.find((obj) => obj === item.id)) {
      selected.recipes = selected.recipes.filter((obj) => obj !== item.id);
    } else {
      selected.recipes.push(item.id);
    }

    setSelected({ ...selected });
  }

  const keyExtractor = (item) => {
    return item.id + (item.ingredients ? "_food_" : "_apple_");
  };

  return (
    <View style={{ height: 450 }}>
      <FlatList
        //estimatedItemSize={50}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        fadingEdgeLength={100}
        data={items}
        renderItem={({ item }) => {
          const icon = item.ingredients ? "food" : "apple";

          const cost = item.ingredients
            ? calculateRecipeCosts(item, ingredients)
            : parseFloat(item.cost).toFixed(2);

          const isSelected = item.ingredients
            ? selected.recipes.filter((obj) => obj === item.id).length
            : selected.ingredients.filter((obj) => obj.id === item.id).length;

          return (
            <>
              {item.ingredients ? (
                <Animated.View entering={SlideInRight}>
                  <TouchableOpacity
                    className="px-2 py-2 m-1 rounded-full "
                    style={{
                      backgroundColor: isSelected
                        ? themeColors.success
                        : themeColors.primaryContainer,
                    }}
                    onPress={() => {
                      saveRecipe(item);
                    }}
                  >
                    <View className="flex-row justify-between items-center">
                      <View className="flex-row items-center">
                        <IconButton
                          size={24}
                          icon={icon}
                          color={themeColors.onPrimaryContainer}
                          className="p-0 m-0"
                        />
                        <Text
                          className="font-semibold text-lg "
                          style={{ color: themeColors.onPrimaryContainer }}
                        >
                          {item.title}
                        </Text>
                        {isSelected > 0 ? (
                          <IconButton
                            size={24}
                            icon={"check-bold"}
                            color={themeColors.onPrimaryContainer}
                            className="p-0 m-0"
                          />
                        ) : null}
                      </View>
                      <Text
                        className="font-semibold text-lg  px-2"
                        style={{ color: themeColors.onPrimaryContainer }}
                      >
                        {"€" + cost}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              ) : (
                <IngredientSelectionComponent
                  item={item}
                  selected={selectedIngredients}
                  setSelected={setSelectedIngredients}
                  ingredients={ingredients}
                />
              )}
            </>
          );
        }}
      />
    </View>
  );
}
