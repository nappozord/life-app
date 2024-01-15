import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { themeColors } from "~/theme";
import { IconButton } from "react-native-paper";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInLeft,
} from "react-native-reanimated";

export default function GroceryComponent({ item }) {
  return (
    <Animated.View entering={FadeIn} className="flex-1 mt-11 mb-2 px-1">
      <View className="flex-row justify-between align-center rounded-full z-10">
        <View />
        <TouchableOpacity
          className="rounded-full -mt-10 items-center"
          style={{
            backgroundColor:
              item.ingredient.id === -1
                ? themeColors.bgBlack(0.8)
                : themeColors.bgWhite(0.8),
          }}
        >
          <IconButton
            icon={item.ingredient.id === -1 ? "plus" : "basket-plus"}
            size={28}
            color={item.ingredient.id === -1
              ? themeColors.bgWhite(0.9)
              : themeColors.bgBlack(1)}
          />
        </TouchableOpacity>
        <View />
      </View>
      <TouchableOpacity className="-mt-6 rounded-2xl p-2" style={{
          backgroundColor:
            item.ingredient.id === -1
              ? themeColors.bgWhite(0.3)
              : themeColors.bgBlack(0.7),
        }}>
        <View className="justify-between items-center space-y-1 -mt-1">
          <View className="flex-1 pt-5">
            <Text
              className={
                "text-base text-center " +
                (item.ingredient.id === -1 ? "text-gray-800" : "text-gray-300")
              }
            >
              {item.ingredient.title}
            </Text>
          </View>
          {item.ingredient.id === -1 ? null : (
            <View
              className="rounded-full py-1 px-2"
              style={{ backgroundColor: themeColors.bgWhite(0.6) }}
            >
              <Text className="text-base text-center font-semibold text-gray-800">
                {"€" + parseFloat(item.ingredient.cost).toFixed(2)}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
