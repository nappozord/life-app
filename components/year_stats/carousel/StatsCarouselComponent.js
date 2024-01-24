import React, { useRef, useState } from "react";
import Carousel from "react-native-snap-carousel";
import { TouchableOpacity, View, useWindowDimensions } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { themeColors } from "~/theme";
import IncomeSummaryComponent from "~/components/year_stats/carousel/cards/IncomeSummaryComponent";
import { IconButton } from "react-native-paper";

export default function StatsCarouselComponent({ loading, yearCategories }) {
  const dimensions = useWindowDimensions();

  return (
    <Animated.View
      entering={FadeIn}
      className="h-full"
      style={{
        width: dimensions.width,
        borderRadius: 25,
        backgroundColor: themeColors.onSecondary,
      }}
    >
      <View className="absolute w-full -mt-8 z-10">
        <View className="flex-row justify-center">
          <TouchableOpacity
            className="rounded-full p-0 m-0"
            style={{ backgroundColor: themeColors.onBackground,
            borderColor: themeColors.onSecondary,
            borderWidth: 8 }}
          >
            <IconButton
              icon={"account-cog"}
              color={themeColors.background}
              size={30}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Carousel
        containerCustomStyle={{ overflow: "visible" }}
        data={[
          {
            index: 0,
          },
          {
            index: 1,
          },
        ]}
        renderItem={({ item }) => {
          return (
            <View className="mt-10">
              {item.index === 0 ? (
                <IncomeSummaryComponent
                  loading={loading}
                  yearCategories={yearCategories}
                />
              ) : null}
            </View>
          );
        }}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        sliderWidth={410}
        itemWidth={dimensions.width}
        slideStyle={{ display: "flex" }}
        initialNumToRender={1}
        windowSize={3}
      />
    </Animated.View>
  );
}
