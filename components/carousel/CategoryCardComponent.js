import { Pressable, useWindowDimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { themeColors } from "../../theme";
import UserCategoryComponent from "./user_card/UserCategoryComponent";
import OverallCategoryComponent from "./overall_card/OverallCategoryComponent";

const HEIGHT = 400;
const OUTER_HEIGHT = 150;
const WIDTH = 300;

export default function CategoryCardComponent({
  item,
  date,
  categories,
  setCategories,
  activeCategory,
  cardPressed,
  setCardPressed,
  finishedAnimation,
  setFinishedAnimation,
  user,
  setUser,
}) {
  const dimensions = useWindowDimensions();
  const [loading, setLoading] = useState(false);

  const height = useSharedValue(HEIGHT);
  const width = useSharedValue(WIDTH);

  useEffect(() => {
    if (loading) {
      setCardPressed(true);
      startAnimation(500);
    }
  }, [loading]);

  const finishAnimationCallback = (finished) => {
    if (activeCategory == item.id) {
      setFinishedAnimation(finished);
      setLoading(false);
    }
  };

  const startAnimation = (duration) => {
    width.value = withTiming(dimensions.width, { duration });
    height.value = withTiming(dimensions.height, { duration }, (finished) =>
      finished ? runOnJS(finishAnimationCallback)(finished, false) : null
    );
  };

  useEffect(() => {
    if (item.id !== 0) {
      if (!cardPressed) {
        if (activeCategory !== item.id) {
          width.value = WIDTH;
          height.value = HEIGHT;
        } else {
          width.value = withTiming(WIDTH, { duration: 500 });
          height.value = withTiming(HEIGHT, { duration: 500 });
        }
      } else {
        if (activeCategory !== item.id) {
          width.value = dimensions.width;
          height.value = dimensions.height;
        } else {
          startAnimation(500);
        }
      }
    }
  }, [cardPressed]);

  const animatedStyleOuter = useAnimatedStyle(() => ({
    height: height.value + OUTER_HEIGHT,
    width: width.value,
  }));

  const animatedStyleInner = useAnimatedStyle(() => ({
    height: height.value,
    width: width.value,
  }));

  return (
    <Pressable
      onPress={() => {
        cardPressed ? null : setLoading(true);
      }}
    >
      <Animated.View
        style={[
          animatedStyleOuter,
          {
            backgroundColor: "transparent",
            paddingTop: 70,
          },
        ]}
        entering={FadeIn}
        exiting={FadeOut}
      >
        <Animated.View
          style={[
            animatedStyleInner,
            {
              borderRadius: 40,
              backgroundColor: themeColors.bgWhite(0.4),
              height: height,
              width: width,
            },
          ]}
        >
          {item.id === 0 ? (
            <OverallCategoryComponent
              date={date}
              item={item}
              categories={categories}
              setCategories={setCategories}
            />
          ) : (
            <UserCategoryComponent
              item={item}
              loading={loading}
              categories={categories}
              setCategories={setCategories}
              cardPressed={cardPressed}
              setCardPressed={setCardPressed}
              finishedAnimation={finishedAnimation}
              setFinishedAnimation={setFinishedAnimation}
              user={user}
              setUser={setUser}
            />
          )}
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}
