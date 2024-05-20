import React, { useRef, useState } from "react";
import Carousel from "react-native-snap-carousel";
import CategoryCardComponent from "./CategoryCardComponent";
import { useWindowDimensions } from "react-native";
import Animated from "react-native-reanimated";

export default function BudgetCarouselComponent({
  date,
  categories,
  setCategories,
  activeCategory,
  setActiveCategory,
  categoryListRef,
  cardPressed,
  setCardPressed,
  isList,
}) {
  const dimensions = useWindowDimensions();
  const carouselRef = useRef(null);
  if (carouselRef.current) carouselRef.current.snapToItem(activeCategory);

  const [finishedAnimation, setFinishedAnimation] = useState(false);

  if (activeCategory === 0 && finishedAnimation) setFinishedAnimation(false);

  return (
    <Animated.View>
      <Carousel
        ref={carouselRef}
        containerCustomStyle={{ overflow: "visible" }}
        data={categories}
        renderItem={({ item }) => (
          <CategoryCardComponent
            key={"carousel_" + item.id}
            date={date}
            item={item}
            categories={categories}
            setCategories={setCategories}
            activeCategory={activeCategory}
            cardPressed={cardPressed}
            setCardPressed={setCardPressed}
            finishedAnimation={finishedAnimation}
            setFinishedAnimation={setFinishedAnimation}
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
          setActiveCategory(index);
          categoryListRef.current.scrollToIndex({
            animated: true,
            index: index,
          });
        }}
      />
    </Animated.View>
  );
}
