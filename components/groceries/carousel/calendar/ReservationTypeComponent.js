import React, { useState, useMemo, useCallback } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { themeColors } from "~/theme";
import { Divider, IconButton } from "react-native-paper";
import MealPlanModalComponent from "./MealPlanModalComponent";
import { calculateMealCosts } from "~/utils/calculateCostsAndCalories";
import MealListComponent from "./MealListComponent";
import { useSelector } from "react-redux";

const MemoizedMealPlanModalComponent = React.memo(MealPlanModalComponent);

export default function ReservationTypeComponent({ day, type, home }) {
  const meals = useSelector((state) => state.meals.meals);
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const recipes = useSelector((state) => state.recipes.recipes);

  const [modalVisible, setModalVisible] = useState(false);

  const dailyMeal = useMemo(
    () => meals.find((obj) => obj.date === day),
    [meals, day]
  );
  const selected = useMemo(() => {
    return dailyMeal ? dailyMeal[type.type] : { ingredients: [], recipes: [] };
  }, [dailyMeal, type.type]);

  const handlePress = useCallback(() => {
    setModalVisible((prev) => !prev);
  }, []);

  const mealCost = useMemo(() => {
    return dailyMeal
      ? calculateMealCosts(dailyMeal, type.type, ingredients, recipes)
      : "0.00";
  }, [dailyMeal, type.type, ingredients, recipes]);

  return (
    <View>
      {modalVisible && (
        <MemoizedMealPlanModalComponent
          item={{
            day,
            icon: type.icon,
            type: type.type,
            selected,
          }}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
      <TouchableOpacity
        style={{ backgroundColor: themeColors.secondary }}
        className="rounded-2xl p-3"
        onPress={handlePress}
      >
        <View className="flex-row justify-between -mt-2">
          <View className="flex-row items-center">
            <IconButton
              icon={type.icon}
              size={24}
              className="m-0 p-0"
              color={themeColors.onSecondary}
            />
            <Text
              className="text-lg font-semibold ml-1"
              style={{ color: themeColors.onSecondary }}
            >
              {type.type[0].toUpperCase() + type.type.slice(1)}
            </Text>
          </View>
          {!home ? (
            <View className="flex-row justify-end">
              <View
                className="px-2 rounded-xl flex-row items-center my-1"
                style={{ backgroundColor: themeColors.primary, elevation: 5 }}
              >
                <Text
                  className="text-base font-semibold"
                  style={{ color: themeColors.onPrimary }}
                >
                  {"€" + mealCost}
                </Text>
              </View>
            </View>
          ) : null}
        </View>
        <Divider />
        {dailyMeal && (
          <>
            <MealListComponent
              day={day}
              type={type.type}
              recipe={true}
              home={home}
            />
            <MealListComponent
              day={day}
              type={type.type}
              recipe={false}
              home={home}
            />
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}
