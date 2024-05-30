import React, { useRef, useState } from "react";
import Carousel from "react-native-snap-carousel";
import CategoryCardComponent from "./CategoryCardComponent";
import { useWindowDimensions } from "react-native";
import Animated from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import {
  updateActiveCategory,
  updateFinishedAnimation,
} from "~/app/categoriesSlice";

export default function BudgetCarouselComponent({ categoryListRef, isList }) {
  const { categories, activeCategory, finishedAnimation } = useSelector(
    (state) => state.categories
  );

  const dispatch = useDispatch();

  const dimensions = useWindowDimensions();
  const carouselRef = useRef(null);

  if (carouselRef.current) carouselRef.current.snapToItem(activeCategory);

  if (activeCategory === 0 && finishedAnimation) updateFinishedAnimation(false);

  return (
    <Animated.View>
      <Carousel
        ref={carouselRef}
        containerCustomStyle={{ overflow: "visible" }}
        data={categories}
        renderItem={({ item }) => (
          <CategoryCardComponent
            key={"carousel_" + item.id}
            categoryId={item.id}
            isList={isList}
          />
        )}
        firstItem={activeCategory}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        sliderWidth={410}
        itemWidth={dimensions.width}
        slideStyle={{ display: "flex", alignItems: "center" }}
        initialNumToRender={3}
        windowSize={3}
        onSnapToItem={(index) => {
          dispatch(updateActiveCategory(index));
          categoryListRef.current.scrollToIndex({
            animated: true,
            index: index,
          });
        }}
      />
    </Animated.View>
  );
}
