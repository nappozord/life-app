import { View, TouchableOpacity, Text } from "react-native";
import React from "react";
import { IconButton } from "react-native-paper";
import { themeColors } from "~/theme";
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
          style={{ backgroundColor: themeColors.primary }}
        >
          <IconButton
            icon="account"
            size={24}
            color={themeColors.onPrimary}
          />
        </TouchableOpacity>
        <Text
          className="font-semibold text-xl"
          style={{ color: themeColors.onBackground }}
        >
          {user.username}
        </Text>
      </View>
      <View>
        <TouchableOpacity
          className="rounded-2xl py-2 px-3"
          style={{
            backgroundColor:
              user.balance > 0
                ? themeColors.success
                : themeColors.errorContainer,
          }}
        >
          <BalanceComponent user={user} setUser={setUser} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
