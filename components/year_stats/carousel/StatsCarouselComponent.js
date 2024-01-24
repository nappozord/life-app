import React, { useRef, useState } from "react";
import Carousel from "react-native-snap-carousel";
import { TouchableOpacity, View, useWindowDimensions } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { themeColors } from "~/theme";
import IncomeSummaryComponent from "~/components/year_stats/carousel/cards/IncomeSummaryComponent";
import { IconButton } from "react-native-paper";
import ForecastSummaryComponent from "./cards/ForecastSummaryComponent";

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
      <View className="absolute w-full -mt-10 z-10">
        <View className="flex-row justify-center">
          <TouchableOpacity
            className="rounded-full p-0 m-0"
            style={{ backgroundColor: themeColors.primary,
            borderColor: themeColors.onSecondary,
            borderWidth: 8 }}
          >
            <IconButton
              icon={"chart-timeline-variant-shimmer"}
              size={40}
              color={themeColors.onPrimary}
              className="p-0 m-0.5"
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
              ) : (
                <ForecastSummaryComponent
                  loading={loading}
                  yearCategories={yearCategories}
                />
              )}
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
