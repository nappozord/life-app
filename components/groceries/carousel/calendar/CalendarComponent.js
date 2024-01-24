import { useEffect, useRef, useState } from "react";
import { Text, View, TouchableOpacity, Dimensions } from "react-native";
import { themeColors } from "~/theme";
import { IconButton } from "react-native-paper";

import { getCurrentWeek } from "~/utils/manageDate";
import WeeklyListComponent from "./WeeklyListComponent";
import CalendarModal from "./CalendarModal";
import Animated, { SlideInUp, SlideOutDown } from "react-native-reanimated";

const width = Dimensions.get("window").width;

export default function CalendarComponent({
  meals,
  setMeals,
  ingredients,
  setIngredients,
  recipes,
  setRecipes,
}) {
  const [date, setDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const weekListRef = useRef(null);

  const currentWeek = getCurrentWeek(date);

  useEffect(() => {
    weekListRef.current.scrollToIndex({
      animated: true,
      index: currentWeek.find(
        (day) => day.dateString === date.toISOString().split("T")[0]
      ).index,
    });
  }, [date]);

  return (
    <View className="flex-1">
      {modalVisible ? (
        <CalendarModal
          currentDate={date}
          setDate={setDate}
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
        className="flex-row items-center py-2.5 px-0"
        style={{
          backgroundColor: themeColors.onSecondary,
          elevation: 10,
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
            {currentWeek.map((day) => {
              const isSelected =
                day.dateString === date.toISOString().split("T")[0];

              return (
                <TouchableOpacity
                  key={"calendar_" + day.date}
                  className="rounded-2xl px-2 py-2 items-center"
                  style={{
                    backgroundColor: isSelected ? themeColors.primary : null,
                    width: (width - 40 - 16) / 7,
                  }}
                  onPress={() => {
                    setDate(new Date(day.date));
                  }}
                >
                  <Text
                    className={"text-sm " + (isSelected ? "font-semibold" : "")}
                    style={{
                      color: !isSelected
                        ? themeColors.onBackground
                        : themeColors.onPrimary,
                    }}
                  >
                    {day.dayName}
                  </Text>
                  <Text
                    className={"text-xl " + (isSelected ? "font-semibold" : "")}
                    style={{
                      color: !isSelected
                        ? themeColors.onBackground
                        : themeColors.onPrimary,
                    }}
                  >
                    {day.dayNumber}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </Animated.View>
        </View>
      </View>
      <WeeklyListComponent
        meals={meals}
        setMeals={setMeals}
        ingredients={ingredients}
        setIngredients={setIngredients}
        recipes={recipes}
        setRecipes={setRecipes}
        date={date}
        weekListRef={weekListRef}
        initialIndex={
          currentWeek.find(
            (day) => day.dateString === date.toISOString().split("T")[0]
          ).index
        }
      />
    </View>
  );
}
