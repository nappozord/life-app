import React, { useEffect, useRef, useState } from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";
import CategoryCardComponent from "./CategoryCardComponent";
import { View, useWindowDimensions } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";

export default function CarouselComponent({
  date,
  categories,
  setCategories,
  activeCategory,
  setActiveCategory,
  categoryListRef,
  cardPressed,
  setCardPressed,
  user,
  setUser,
}) {
  const dimensions = useWindowDimensions();
  const carouselRef = useRef(null);
  if (carouselRef.current) carouselRef.current.snapToItem(activeCategory);

  const [finishedAnimation, setFinishedAnimation] = useState(false);

  if(activeCategory === 0 && finishedAnimation)
    setFinishedAnimation(false);

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
            user={user}
            setUser={setUser}
            categories={categories}
            setCategories={setCategories}
            activeCategory={activeCategory}
            cardPressed={cardPressed}
            setCardPressed={setCardPressed}
            finishedAnimation={finishedAnimation}
            setFinishedAnimation={setFinishedAnimation}
          />
        )}
        firstItem={activeCategory}
        inactiveSlideOpacity={0.4}
        inactiveSlideScale={0.73}
        sliderWidth={410}
        itemWidth={
          dimensions.width
        }
        slideStyle={{ display: "flex", alignItems: "center" }}
        initialNumToRender={20}
        windowSize={20}
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
