import { Pressable, StyleSheet, View, useWindowDimensions } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { IconButton } from "react-native-paper";

import { themeColors } from "~/theme";

export default CustomBottomTabComponent = ({
  state,
  descriptors,
  navigation,
}) => {
  const { width } = useWindowDimensions();

  const MARGIN = 20;
  const TAB_BAR_WIDTH = width;
  const TAB_WIDTH = TAB_BAR_WIDTH / state.routes.length;

  const translateAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(TAB_WIDTH * state.index) }],
    };
  });

  return (
    <View style={[styles.tabBarContainer, { width: TAB_BAR_WIDTH, bottom: 0 }]}>
      <Animated.View
        style={[
          styles.slidingTabContainer,
          { width: TAB_WIDTH },
          translateAnimation,
        ]}
      >
        <View style={[styles.slidingTab, { width: TAB_WIDTH - MARGIN }]} />
      </Animated.View>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, { merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <Pressable
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <View style={styles.contentContainer}>
              <IconButton
                icon={route.name}
                size={28}
                color={
                  isFocused ? themeColors.primary : themeColors.onBackground
                }
              />
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flex: 1,
    flexDirection: "row",
    height: 75,
    position: "absolute",
    alignSelf: "center",
    backgroundColor: themeColors.background,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: "center",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  slidingTabContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  slidingTab: {
    width: 100,
    height: 50,
    borderRadius: 15,
    backgroundColor: themeColors.surfaceVariant,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
});
