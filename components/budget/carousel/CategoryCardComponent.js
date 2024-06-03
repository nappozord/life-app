import { Pressable, useWindowDimensions } from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { themeColors } from "~/theme";
import UserCategoryComponent from "./user_card/UserCategoryComponent";
import OverallCategoryComponent from "./overall_card/OverallCategoryComponent";
import OverallListCategoryComponent from "~/components/list/overall_card/OverallListCategoryComponent";
import ListCategoryComponent from "~/components/list/list_card/ListCategoryComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCardPressed,
  updateFinishedAnimation,
} from "~/app/categoriesSlice";

const HEIGHT = 400;
const OUTER_HEIGHT = 150;
const WIDTH = 300;

export default function CategoryCardComponent({
  categoryId,
  isList,
  isActive,
}) {
  const cardPressed = useSelector((state) => state.categories.cardPressed);

  const dispatch = useDispatch();

  const dimensions = useWindowDimensions();
  const [loading, setLoading] = useState(false);

  const height = useSharedValue(HEIGHT);
  const width = useSharedValue(WIDTH);

  useEffect(() => {
    if (loading) {
      dispatch(updateCardPressed(true));
      startAnimation(500);
    }
  }, [loading]);

  const finishAnimationCallback = (finished) => {
    if (isActive) {
      dispatch(updateFinishedAnimation(finished));
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
    if (categoryId !== 0) {
      if (!cardPressed) {
        if (!isActive) {
          width.value = WIDTH;
          height.value = HEIGHT;
        } else {
          width.value = withTiming(WIDTH, { duration: 500 });
          height.value = withTiming(HEIGHT, { duration: 500 });
        }
      } else {
        if (!isActive) {
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
              backgroundColor: themeColors.onSecondary,
              height: height,
              width: width,
              elevation: 5,
            },
          ]}
        >
          {categoryId === 0 ? (
            !isList ? (
              <OverallCategoryComponent />
            ) : (
              <OverallListCategoryComponent categoryId={categoryId} />
            )
          ) : !isList ? (
            <UserCategoryComponent categoryId={categoryId} loading={loading} />
          ) : (
            <ListCategoryComponent categoryId={categoryId} loading={loading} />
          )}
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}
