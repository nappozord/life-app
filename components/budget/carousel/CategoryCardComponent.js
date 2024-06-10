import React, { useEffect, useState, useCallback } from "react";
import { Pressable, useWindowDimensions } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { themeColors } from "~/theme";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCardPressed,
  updateFinishedAnimation,
} from "~/app/categoriesSlice";
import OverallCategoryComponent from "./overall_card/OverallCategoryComponent";
import UserCategoryComponent from "./user_card/UserCategoryComponent";

const HEIGHT = 400;
const OUTER_HEIGHT = 150;
const WIDTH = 300;

const MemoizedOverallCategoryComponent = React.memo(OverallCategoryComponent);
const MemoizedUserCategoryComponent = React.memo(UserCategoryComponent);

export default function CategoryCardComponent({ categoryId, isActive }) {
  const cardPressed = useSelector((state) => state.categories.cardPressed);

  const dispatch = useDispatch();

  const dimensions = useWindowDimensions();
  const [loading, setLoading] = useState(false);

  const height = useSharedValue(HEIGHT);
  const width = useSharedValue(WIDTH);

  const finishAnimationCallback = useCallback(
    (finished) => {
      if (isActive) {
        dispatch(updateFinishedAnimation(finished));
        setLoading(false);
      }
    },
    [dispatch, isActive]
  );

  const startAnimation = useCallback(
    (duration) => {
      width.value = withTiming(dimensions.width, { duration });
      height.value = withTiming(dimensions.height, { duration }, (finished) =>
        finished ? runOnJS(finishAnimationCallback)(finished) : null
      );
    },
    [dimensions, finishAnimationCallback]
  );

  useEffect(() => {
    if (loading) {
      dispatch(updateCardPressed(true));
      startAnimation(500);
    }
  }, [loading, dispatch, startAnimation]);

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
  }, [cardPressed, categoryId, isActive, dimensions, startAnimation]);

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
        if (!cardPressed) setLoading(true);
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
              elevation: 5,
            },
          ]}
        >
          {categoryId === 0 ? (
            <MemoizedOverallCategoryComponent />
          ) : (
            <MemoizedUserCategoryComponent
              categoryId={categoryId}
              loading={loading}
            />
          )}
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}
