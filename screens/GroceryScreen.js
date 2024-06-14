import React, { useState, useRef, useEffect } from "react";
import { View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";

import ChipListComponent from "~/components/groceries/chip/ChipListComponent";
import HeaderComponent from "~/components/header/HeaderComponent";
import GroceriesCarouselComponent from "~/components/groceries/carousel/GroceriesCarouselComponent";
import { checkMealsAndIngredients } from "~/app/groceriesSlice";

export default function GroceryScreen() {
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("REFRESH");
    dispatch(checkMealsAndIngredients());
  }, []);

  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <Image
        className="absolute h-full w-full"
        source={require("~/assets/splash.png")}
      />
      {user.userId ? (
        <>
          <View className="mt-16 flex-1">
            <View
              style={{
                height: 75,
              }}
              className="mx-5"
            >
              <HeaderComponent text={"Your Groceries"} />
            </View>
            <View className="mb-4 -mt-1">
              <ChipListComponent />
            </View>
            {user ? (
              <Animated.View
                className="justify-end flex-1"
                entering={FadeIn}
                exiting={FadeOut}
              >
                <View className="pb-24">
                  <GroceriesCarouselComponent />
                </View>
              </Animated.View>
            ) : (
              <View
                className="justify-end mx-5 flex-1"
                style={{
                  borderRadius: 25,
                }}
              />
            )}
          </View>
        </>
      ) : (
        <View></View>
      )}
    </View>
  );
}
