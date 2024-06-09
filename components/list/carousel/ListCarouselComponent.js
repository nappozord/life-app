import React, { useRef, useMemo, useCallback } from "react";
import Carousel from "react-native-snap-carousel";
import CategoryListCardComponent from "./CategoryListCardComponent";
import { useWindowDimensions } from "react-native";
import Animated from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { updateActiveCategory } from "~/app/listsSlice";

const MemoizedCategoryCardComponent = React.memo(CategoryListCardComponent);

export default function ListCarouselComponent() {
  const lists = useSelector((state) => state.lists.lists);
  const activeCategory = useSelector((state) => state.lists.activeCategory);
  const dispatch = useDispatch();
  const dimensions = useWindowDimensions();
  const currentIndex = useRef(null);
  const carouselRef = useRef(null);

  if (carouselRef.current && activeCategory !== currentIndex) {
    carouselRef.current.snapToItem(activeCategory);
    currentIndex.current = activeCategory;
  }

  const memoizedCategories = useMemo(() => lists, [lists]);

  const renderItem = useCallback(
    ({ item }) => (
      <MemoizedCategoryCardComponent
        listId={item.id}
        isActive={activeCategory === item.id}
      />
    ),
    [activeCategory, lists]
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
        initialNumToRender={3}
        windowSize={3}
        onSnapToItem={handleSnapToItem}
      />
    </Animated.View>
  );
}
