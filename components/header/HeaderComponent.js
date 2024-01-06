import { View, TouchableOpacity, Text } from "react-native";
import React from "react";
import { IconButton } from "react-native-paper";
import { themeColors } from "../../theme";
import Animated, {
  FadeIn,
  FadeOut,
  useSharedValue,
  withTiming,
  useDerivedValue,
} from "react-native-reanimated";
import { Canvas, RoundedRect, useFont } from "@shopify/react-native-skia";
import BalanceComponent from "./BalanceComponent";

export default function HeaderComponent({ user, setUser }) {
  return (
    <Animated.View
      className="flex-row justify-between items-center"
      entering={FadeIn.duration(1000)}
      exiting={FadeOut.duration(300)}
    >
      <View className="flex-row items-center space-x-3">
        <TouchableOpacity
          className="rounded-full"
          style={{ backgroundColor: themeColors.bgWhite(0.3) }}
        >
          <IconButton
            icon="account"
            size={24}
            color={themeColors.bgWhite(0.6)}
          />
        </TouchableOpacity>
        <Text className="font-semibold text-xl text-gray-200">
          {user.username}
        </Text>
      </View>
      <View>
        <TouchableOpacity
          className="rounded-2xl py-2 px-3"
          style={{
            backgroundColor:
              user.balance > 0
                ? themeColors.chartGreen(0.6)
                : themeColors.chartRed(0.6),
          }}
        >
          <BalanceComponent user={user} setUser={setUser} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
