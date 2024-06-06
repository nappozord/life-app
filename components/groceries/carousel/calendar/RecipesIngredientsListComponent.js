import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Animated, { SlideInRight } from "react-native-reanimated";
import { themeColors } from "~/theme";
import { IconButton } from "react-native-paper";
import { calculateRecipeCosts } from "~/utils/calculateCostsAndCalories";
import IngredientSelectionComponent from "~/components/groceries/searchbar/IngredientSelectionComponent";
import { sortByName } from "~/utils/sortItems";
import { useSelector } from "react-redux";
import { FlashList } from "@shopify/flash-list";

export default function RecipesIngredientsListComponent({
  items,
  selected,
  setSelected,
}) {
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  const firstRender = useRef(true);

  const [selectedIngredients, setSelectedIngredients] = useState(
    selected.ingredients
  );

  items = sortByName(items);

  useEffect(() => {
    if (!firstRender.current) {
      selected.ingredients = selectedIngredients;
      setSelected({ ...selected });
    } else {
      firstRender.current = false;
    }
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
      <FlashList
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        fadingEdgeLength={100}
        estimatedItemSize={60}
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
                    className="px-2 py-2 my-1 rounded-2xl"
                    style={{
                      backgroundColor: isSelected
                        ? themeColors.success
                        : themeColors.secondaryContainer,
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
                          color={themeColors.onSecondaryContainer}
                          className="p-0 m-0"
                        />
                        <Text
                          className="font-semibold text-lg "
                          style={{ color: themeColors.onSecondaryContainer }}
                        >
                          {item.title}
                        </Text>
                        {isSelected > 0 ? (
                          <IconButton
                            size={24}
                            icon={"check-bold"}
                            color={themeColors.onSecondaryContainer}
                            className="p-0 m-0"
                          />
                        ) : null}
                      </View>
                      <Text
                        className="font-semibold text-lg  px-2"
                        style={{ color: themeColors.onSecondaryContainer }}
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
        extraData={selected}
      />
    </View>
  );
}
