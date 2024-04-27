import React, { useRef } from "react";
import Carousel from "react-native-snap-carousel";
import { View, useWindowDimensions } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { themeColors } from "~/theme";
import CalendarComponent from "~/components/groceries/carousel/calendar/CalendarComponent";
import IngredientsListComponent from "./ingredients/IngredientsListComponent";
import ItemsListComponent from "./items/ItemsListComponent";
import RecipesListComponent from "./recipes/RecipesListComponent";
import GroceriesCard from "./list/GroceriesCard";

export default function BudgetCarouselComponent({
  categories,
  meals,
  setMeals,
  ingredients,
  setIngredients,
  recipes,
  setRecipes,
  activeChip,
  setActiveChip,
  chipListRef,
  items,
  setItems,
}) {
  const dimensions = useWindowDimensions();
  const carouselRef = useRef(null);
  if (carouselRef.current) carouselRef.current.snapToItem(activeChip);

  return (
    <View>
      <Carousel
        ref={carouselRef}
        containerCustomStyle={{ overflow: "visible" }}
        data={categories}
        renderItem={({ item }) => (
          <Animated.View
            entering={FadeIn}
            className="justify-end h-full"
            style={{width: dimensions.width - 40}}
          >
            <View className="flex-1 mt-10 rounded-3xl"
            style={[
              {
                backgroundColor: themeColors.onSecondary,
              },
              item.index === 1
                ? {
                    borderBottomLeftRadius: 16,
                    borderBottomRightRadius: 16,
                    paddingBottom: 0,
                  }
                : {},
            ]}>
              {item.index === 0 ? (
                <>
                  <CalendarComponent
                    meals={meals}
                    setMeals={setMeals}
                    ingredients={ingredients}
                    setIngredients={setIngredients}
                    recipes={recipes}
                    setRecipes={setRecipes}
                  />
                </>
              ) : item.index === 1 ? (
                <GroceriesCard
                  meals={meals}
                  setMeals={setMeals}
                  ingredients={ingredients}
                  setIngredients={setIngredients}
                  recipes={recipes}
                  setRecipes={setRecipes}
                  items={items}
                  setItems={setItems}
                />
              ) : item.index === 2 ? (
                <RecipesListComponent
                  meals={meals}
                  setMeals={setMeals}
                  ingredients={ingredients}
                  setIngredients={setIngredients}
                  recipes={recipes}
                  setRecipes={setRecipes}
                />
              ) : item.index === 3 ? (
                <IngredientsListComponent
                  meals={meals}
                  setMeals={setMeals}
                  ingredients={ingredients}
                  setIngredients={setIngredients}
                  recipes={recipes}
                  setRecipes={setRecipes}
                />
              ) : item.index === 4 ? (
                <ItemsListComponent
                  items={items}
                  setItems={setItems}
                />
              ) : null}
            </View>
          </Animated.View>
        )}
        firstItem={activeChip}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        sliderWidth={410}
        itemWidth={dimensions.width}
        slideStyle={{ display: "flex", alignItems: "center" }}
        initialNumToRender={1}
        windowSize={5}
        onSnapToItem={(index) => {
          setActiveChip(index);
          chipListRef.current.scrollToIndex({
            animated: true,
            index: index,
          });
        }}
      />
    </View>
  );
}
