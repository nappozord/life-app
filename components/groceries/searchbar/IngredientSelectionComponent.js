import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  SlideInRight,
} from "react-native-reanimated";
import { themeColors } from "~/theme";
import { IconButton } from "react-native-paper";
import IngredientQuantityComponent from "./IngredientQuantityComponent";

export default function IngredientSelectionComponent({
  item,
  selected,
  setSelected,
}) {
  const icon = "apple";

  const duration = 500;

  const cost = parseFloat(item.cost).toFixed(2);

  const isSelected = selected.filter((obj) => obj.id === item.id).length;

  const borderRadius = useSharedValue(50);
  const quantityHeight = useSharedValue(0);

  if (isSelected) {
    borderRadius.value = withTiming(25, { duration });
    quantityHeight.value = withTiming(50, { duration });
  } else {
    borderRadius.value = withTiming(50, { duration });
    quantityHeight.value = withTiming(0, { duration });
  }

  const animatedBorderStyle = useAnimatedStyle(() => ({
    borderRadius: borderRadius.value,
  }));

  const animatedHeightStyle = useAnimatedStyle(() => ({
    height: quantityHeight.value,
  }));

  function selectItem() {
    if (selected.find((obj) => obj.id === item.id)) {
      selected = selected.filter((obj) => obj.id !== item.id);
    } else {
      selected.push({
        id: item.id,
        quantity: 1,
      });
    }

    setSelected([...selected]);
  }

  return item.id !== -1 ? (
    <Animated.View
      className="overflow-hidden px-2 py-2 m-1 roun"
      style={[
        animatedBorderStyle,
        {
          backgroundColor: isSelected
            ? themeColors.success
            : themeColors.primaryContainer,
        },
      ]}
      entering={SlideInRight}
    >
      <TouchableOpacity
        onPress={() => {
          selectItem();
        }}
      >
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <IconButton
              size={24}
              icon={icon}
              color={themeColors.onPrimaryContainer}
              className="p-0 m-0"
            />
            <Text
              className="font-semibold text-lg"
              style={{ color: themeColors.onPrimaryContainer }}
            >
              {item.title}
            </Text>
            {isSelected > 0 ? (
              <IconButton
                size={24}
                icon={"check-bold"}
                color={themeColors.bgWhite(0.7)}
                className="p-0 m-0"
              />
            ) : null}
          </View>
          <Text
            className="font-semibold text-lg  px-2"
            style={{ color: themeColors.onPrimaryContainer }}
          >
            {"€" + cost}
          </Text>
        </View>
        {isSelected ? (
          <Animated.View
            className="overflow-hidden"
            style={animatedHeightStyle}
          >
            <IngredientQuantityComponent
              item={selected.find((obj) => obj.id === item.id)}
              selected={selected}
              setSelected={setSelected}
              total={item.quantity}
            />
          </Animated.View>
        ) : null}
      </TouchableOpacity>
    </Animated.View>
  ) : (
    <TouchableOpacity
      className="justify-center items-center rounded-3xl my-1"
      style={{ height: 200, backgroundColor: themeColors.onSecondary }}
    >
      <Text
        className="font-semibold text-xl"
        style={{ color: themeColors.secondary }}
      >
        Add more ingredients!
      </Text>
    </TouchableOpacity>
  );
}
