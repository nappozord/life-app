import React, { useRef, useMemo, useCallback } from "react";
import Carousel from "react-native-snap-carousel";
import { View, useWindowDimensions } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { themeColors } from "~/theme";
import CalendarComponent from "~/components/groceries/carousel/calendar/CalendarComponent";
import IngredientsListComponent from "./ingredients/IngredientsListComponent";
import ItemsListComponent from "./items/ItemsListComponent";
import RecipesListComponent from "./recipes/RecipesListComponent";
import GroceriesCard from "./list/GroceriesCard";
import { useDispatch, useSelector } from "react-redux";
import { updateActiveCategory } from "~/app/groceriesSlice";

const MemoizedCalendarComponent = React.memo(CalendarComponent);
const MemoizedIngredientsListComponent = React.memo(IngredientsListComponent);
const MemoizedItemsListComponent = React.memo(ItemsListComponent);
const MemoizedRecipesListComponent = React.memo(RecipesListComponent);
const MemoizedGroceriesCard = React.memo(GroceriesCard);

export default function GroceriesCarouselComponent() {
  const categories = useSelector((state) => state.groceries.categories);
  const activeCategory = useSelector((state) => state.groceries.activeCategory);
  const dispatch = useDispatch();
  const dimensions = useWindowDimensions();
  const currentIndex = useRef(null);
  const carouselRef = useRef(null);

  if (carouselRef.current && activeCategory !== currentIndex) {
    carouselRef.current.snapToItem(activeCategory);
    currentIndex.current = activeCategory;
  }

  const memoizedCategories = useMemo(() => categories, [categories]);

  const renderItem = useCallback(
    ({ item }) => (
      <Animated.View
        entering={FadeIn}
        className="justify-end h-full"
        style={{ width: dimensions.width - 40 }}
      >
        <View
          className="flex-1 mt-10 rounded-3xl"
          style={[
            {
              backgroundColor: themeColors.onSecondary,
            },
            item.id === 1
              ? {
                  borderBottomLeftRadius: 16,
                  borderBottomRightRadius: 16,
                  paddingBottom: 0,
                }
              : {},
          ]}
        >
          {item.id === 0 ? (
            <MemoizedCalendarComponent />
          ) : item.id === 1 ? (
            <>{/*<MemoizedGroceriesCard />*/}</>
          ) : item.id === 2 ? (
            <MemoizedRecipesListComponent />
          ) : item.id === 3 ? (
            <MemoizedIngredientsListComponent />
          ) : item.id === 4 ? (
            <MemoizedItemsListComponent />
          ) : null}
        </View>
      </Animated.View>
    ),
    []
  );

  const handleSnapToItem = useCallback(
    (index) => {
      dispatch(updateActiveCategory(index));
    },
    [dispatch]
  );

  return (
    <Animated.View>
      <Carousel
        ref={carouselRef}
        containerCustomStyle={{ overflow: "visible" }}
        data={memoizedCategories}
        renderItem={renderItem}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        sliderWidth={410}
        itemWidth={dimensions.width}
        slideStyle={{ display: "flex", alignItems: "center" }}
        initialNumToRender={5}
        windowSize={5}
        onSnapToItem={handleSnapToItem}
      />
    </Animated.View>
  );
}
