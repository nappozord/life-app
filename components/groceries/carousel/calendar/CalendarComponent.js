import { useEffect, useRef, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Agenda } from "react-native-calendars";
import { themeColors } from "~/theme";
import { Divider, IconButton } from "react-native-paper";

import { getCurrentWeek } from "~/utils/manageDate";
import WeeklyListComponent from "./WeeklyListComponent";
import CalendarModal from "./CalendarModal";
import Animated, { SlideInUp, SlideOutDown } from "react-native-reanimated";

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
        (day) => day.date === date.toISOString().split("T")[0]
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
      <View
        className="flex-row items-center py-3 px-0"
        style={{ backgroundColor: themeColors.chartBlue(1), elevation: 10 }}
      >
        <TouchableOpacity className="ml-3 mr-1 rounded-full" style={{backgroundColor: themeColors.bgBlack(0.3)}}>
          <IconButton
            icon="calendar"
            size={34}
            color={themeColors.bgWhite(0.7)}
            className="p-0 m-0"
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          />
        </TouchableOpacity>
        <Animated.View
          className="flex-row justify-around"
          entering={SlideInUp}
          exiting={SlideOutDown}
        >
          {currentWeek.map((day) => {
            const isSelected = day.date === date.toISOString().split("T")[0];

            return (
              <TouchableOpacity
                key={"calendar_" + day.date}
                className="rounded-2xl px-2 py-2 items-center"
                style={{
                  backgroundColor: isSelected ? themeColors.bgBlack(0.5) : null,
                }}
                onPress={() => {
                  setDate(new Date(day.date));
                }}
              >
                <Text className="text-gray-300">{day.dayName}</Text>
                <Text className="text-gray-300 text-xl">{day.dayNumber}</Text>
              </TouchableOpacity>
            );
          })}
        </Animated.View>
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
            (day) => day.date === date.toISOString().split("T")[0]
          ).index
        }
      />
    </View>
  );
}
