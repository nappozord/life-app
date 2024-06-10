import React, { useCallback, useEffect } from "react";
import { Text, TouchableOpacity, Dimensions } from "react-native";
import { themeColors } from "~/theme";
import { useDispatch, useSelector } from "react-redux";
import { updateDate } from "~/app/mealsSlice";

const width = Dimensions.get("window").width;

const DayComponent = React.memo(({ day, isSelected, onPress }) => (
  <TouchableOpacity
    key={"calendar_" + day.date}
    className="rounded-2xl px-2 py-2 items-center"
    style={{
      backgroundColor: isSelected ? themeColors.primary : null,
      width: (width - 40 - 16) / 7,
    }}
    onPress={onPress}
  >
    <Text
      className={"text-sm " + (isSelected ? "font-semibold" : "")}
      style={{
        color: !isSelected ? themeColors.onBackground : themeColors.onPrimary,
      }}
    >
      {day.dayName}
    </Text>
    <Text
      className={"text-xl " + (isSelected ? "font-semibold" : "")}
      style={{
        color: !isSelected ? themeColors.onBackground : themeColors.onPrimary,
      }}
    >
      {day.dayNumber}
    </Text>
  </TouchableOpacity>
));

export default function CalendarHeaderComponent() {
  const currentWeek = useSelector((state) => state.meals.currentWeek);
  const defaultWeek = useSelector((state) => state.meals.defaultWeek);
  const date = useSelector((state) => state.meals.date);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!defaultWeek) {
      dispatch(updateDate(new Date().toISOString()));
    }
  }, []);

  const handlePress = useCallback(
    (day) => {
      if (!defaultWeek) {
        dispatch(updateDate(new Date(day.date).toISOString()));
      }
    },
    [defaultWeek, dispatch]
  );

  return currentWeek.map((day) => {
    const isSelected = defaultWeek
      ? null
      : day.dateString === date.split("T")[0];

    return (
      <DayComponent
        key={day.date}
        day={day}
        isSelected={isSelected}
        onPress={() => handlePress(day)}
      />
    );
  });
}
