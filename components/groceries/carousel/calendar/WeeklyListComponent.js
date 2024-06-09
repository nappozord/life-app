import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { IconButton } from "react-native-paper";
import { themeColors } from "~/theme";
import { calculateMealCostsAndCalories } from "~/utils/calculateCostsAndCalories";
import ReservationCardComponent from "./ReservationCardComponent";
import { FlashList } from "@shopify/flash-list";

const MemoizedReservationCardComponent = React.memo(ReservationCardComponent);

export default function WeeklyListComponent() {
  const currentWeek = useSelector((state) => state.meals.currentWeek);
  const defaultWeek = useSelector((state) => state.meals.defaultWeek);
  const activeDay = useSelector((state) => state.meals.activeDay);
  const meals = useSelector((state) => state.meals.meals);
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const recipes = useSelector((state) => state.recipes.recipes);

  const [totals, setTotals] = useState([]);

  const currentIndex = useRef(null);
  const weekListRef = useRef(null);
  const heightOffset = useRef([]);

  useEffect(() => {
    if (weekListRef.current && activeDay !== currentIndex.current) {
      weekListRef.current.scrollToIndex({
        animated: true,
        index: activeDay,
      });
      currentIndex.current = activeDay;
    }
  }, [activeDay]);

  useEffect(() => {
    const newTotals = [];
    currentWeek.forEach((mealDate) => {
      const meal = meals.find((obj) => obj.date === mealDate.dateString);
      if (meal) {
        const breakfast = calculateMealCostsAndCalories(
          meal,
          "breakfast",
          ingredients,
          recipes
        );
        const lunch = calculateMealCostsAndCalories(
          meal,
          "lunch",
          ingredients,
          recipes
        );
        const dinner = calculateMealCostsAndCalories(
          meal,
          "dinner",
          ingredients,
          recipes
        );
        const snack = calculateMealCostsAndCalories(
          meal,
          "snack",
          ingredients,
          recipes
        );

        const costs = (
          parseFloat(breakfast.costs) +
          parseFloat(lunch.costs) +
          parseFloat(dinner.costs) +
          parseFloat(snack.costs)
        ).toFixed(2);

        const calories = (
          parseFloat(breakfast.calories) +
          parseFloat(lunch.calories) +
          parseFloat(dinner.calories) +
          parseFloat(snack.calories)
        ).toFixed(0);

        const totalIndex = newTotals.findIndex(
          (obj) => obj.dayNumber === mealDate.dayNumber
        );
        if (totalIndex !== -1) {
          newTotals[totalIndex].costs = costs;
          newTotals[totalIndex].calories = calories;
        } else {
          newTotals.push({
            dayNumber: mealDate.dayNumber,
            costs: costs,
            calories: calories,
          });
        }
      }
    });
    setTotals(newTotals);
  }, [meals, currentWeek, ingredients, recipes]);

  const memoizedCurrentWeek = useMemo(() => currentWeek, [currentWeek]);
  const memoizedTotals = useMemo(() => totals, [totals]);

  const renderItem = useCallback(
    ({ index, item }) => {
      const meal = meals.find((obj) => obj.date === item.dateString);
      const total = totals.find((obj) => obj.dayNumber === item.dayNumber);

      return (
        <View
          className={"m-5 my-2 flex-row " + (index === 0 ? "mt-4" : "")}
          onLayout={({ nativeEvent: { layout } }) => {
            heightOffset.current.push({ layout, index });
          }}
        >
          <View className="items-center">
            <Text style={{ color: themeColors.onSecondaryContainer }}>
              {item.dayName}
            </Text>
            <Text
              className="text-4xl"
              style={{ color: themeColors.onSecondaryContainer }}
            >
              {item.dayNumber}
            </Text>
            <Text
              className="-mt-1"
              style={{ color: themeColors.onSecondaryContainer }}
            >
              {defaultWeek
                ? item.date.split("_")[0]
                : new Date(item.date).toLocaleString("default", {
                    month: "short",
                  })}
            </Text>
            <View
              className="px-2 rounded-xl flex-row items-center my-1"
              style={{ backgroundColor: themeColors.primary, elevation: 5 }}
            >
              <Text
                className="text-base font-semibold"
                style={{ color: themeColors.onPrimary }}
              >
                {"€" + (total ? total.costs : "0.00")}
              </Text>
            </View>
            <View
              className="px-2 rounded-xl items-center justify-center my-1"
              style={{
                backgroundColor: themeColors.primary,
                elevation: 5,
                maxWidth: 60,
                minWidth: 55,
              }}
            >
              <Text
                className="text-lg font-semibold"
                style={{ color: themeColors.onPrimary }}
              >
                {total ? total.calories : "0"}
              </Text>
              <Text
                className="text-sm font-semibold -mt-1 mb-1"
                style={{ color: themeColors.onPrimary }}
              >
                {"Kcal"}
              </Text>
            </View>
            {meal && meal.checked ? (
              <IconButton
                icon={"check-circle-outline"}
                size={24}
                className="m-0 p-0"
                color={themeColors.primary}
              />
            ) : null}
          </View>
          <View className="flex-1">
            <MemoizedReservationCardComponent day={item.dateString} />
          </View>
        </View>
      );
    },
    [meals, totals, defaultWeek]
  );

  function getOffsetByIndex(index) {
    let offset = 0;
    if (heightOffset.current.length < index)
      index = heightOffset.current.length;
    for (let i = 0; i < index; i++) {
      const layout = heightOffset.current[i].layout;
      if (layout && layout.height) {
        offset += layout.height + 16;
      }
    }
    return { offset, index };
  }

  const onLoadListener = useCallback(() => {
    const wait = new Promise((resolve) => setTimeout(resolve, 10));
    wait.then(() => {
      const { offset, index } = getOffsetByIndex(activeDay);
      weekListRef.current.scrollToOffset({
        offset,
        animated: true,
      });
      if (index !== activeDay) onLoadListener();
    });
  }, []);

  return (
    <View className="flex-1">
      <FlashList
        ref={weekListRef}
        estimatedItemSize={230}
        initialScrollIndex={0}
        onLoad={onLoadListener}
        showsVerticalScrollIndicator={false}
        data={memoizedCurrentWeek}
        keyExtractor={(item) => item.date}
        renderItem={renderItem}
        extraData={memoizedTotals}
      />
    </View>
  );
}
