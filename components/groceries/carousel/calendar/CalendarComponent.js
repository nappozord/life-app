import { useEffect, useRef, useState } from "react";
import { Text, View, TouchableOpacity, Dimensions } from "react-native";
import { themeColors } from "~/theme";
import { IconButton } from "react-native-paper";

import { getCurrentWeek } from "~/utils/manageDate";
import WeeklyListComponent from "./WeeklyListComponent";
import CalendarModal from "./CalendarModal";
import Animated, { SlideInUp, SlideOutDown } from "react-native-reanimated";
import CalendarHeaderComponent from "./CalendarHeaderComponent";

export default function CalendarComponent() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="flex-1">
      {modalVisible ? (
        <CalendarModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      ) : null}
      <View className="absolute w-full -mt-10 z-10">
        <View className="flex-row justify-center">
          <TouchableOpacity
            className="rounded-full"
            style={{
              backgroundColor: themeColors.primary,
              borderColor: themeColors.onSecondary,
              borderWidth: 8,
            }}
          >
            <IconButton
              icon="calendar-search"
              size={40}
              color={themeColors.onPrimary}
              className="p-0 m-0.5"
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        className="flex-row items-center py-2.5"
        style={{
          backgroundColor: themeColors.onSecondary,
          elevation: 5,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
      >
        <View className="flex-1">
          <Animated.View
            className="flex-row mx-2 items-center"
            entering={SlideInUp}
            exiting={SlideOutDown}
          >
            <CalendarHeaderComponent />
          </Animated.View>
        </View>
      </View>
      {/*
        <WeeklyListComponent
          meals={meals}
          setMeals={setMeals}
          ingredients={ingredients}
          setIngredients={setIngredients}
          recipes={recipes}
          setRecipes={setRecipes}
          defaultWeek={defaultWeek}
          weekListRef={weekListRef}
          initialIndex={
            defaultWeek
              ? 0
              : currentWeek.find(
                  (day) => day.dateString === date.toISOString().split("T")[0]
                ).index
          }
          currentWeek={currentWeek}
        />
      */}
    </View>
  );
}
