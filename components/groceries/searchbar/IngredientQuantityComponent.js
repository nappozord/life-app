import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Pressable,
} from "react-native";
import React from "react";
import Animated, {
  withTiming,
  FadeIn,
  FadeOut,
  useSharedValue,
  useAnimatedStyle,
  FadeInLeft,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import { themeColors } from "~/theme";
import { IconButton } from "react-native-paper";

export default function IngredientQuantityComponent({
  item,
  selected,
  setSelected,
  total,
}) {
  function saveQuantity(text) {
    let quantity = 0;

    if (text === null || text === "") quantity = 0;
    else quantity = parseFloat(text);

    selected.find((obj) => obj.id === item.id).quantity = quantity;

    setSelected([...selected]);
  }

  return (
    <Animated.View
      entering={FadeInUp}
      className="flex-row items-center justify-between mt-2 mr-2 space-x-0"
    >
      <IconButton
        icon="information"
        size={24}
        className="m-0 p-0"
        color={themeColors.bgWhite(0.7)}
      />
      <Text className="text-gray-200 font-semibold text-lg mr-4">
        {total == 1 || total > 50 ? "How much:" : "How many:"}
      </Text>
      <View className="flex-1">
        <View
          className="flex-row items-center rounded-2xl px-1 py-1"
          style={{
            backgroundColor: themeColors.bgWhite(0.6),
          }}
        >
          <TextInput
            keyboardType="numeric"
            placeholder="E.g. 1"
            className="flex-1 text-gray-700 text-xl px-2"
            selectionColor={themeColors.bgBlack(1)}
            defaultValue={item.quantity.toString()}
            onChangeText={(text) => {
              saveQuantity(text);
            }}
          />
          <Pressable
            className="rounded-2xl pr-2 pl-3 py-1"
            style={{ backgroundColor: themeColors.bgBlack(1) }}
          >
            <Text className="text-gray-200 font-semibold text-xl -mt-0.5">
              {"/ " + total}
            </Text>
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
}
