import { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { themeColors } from "~/theme";
import { Divider, IconButton } from "react-native-paper";
import MealPlanModalComponent from "./MealPlanModalComponent";
import { calculateMealCosts } from "~/utils/calculateCosts";
import MealListComponent from "./MealListComponent";

export default function ReservationTypeComponent({
  meals,
  setMeals,
  ingredients,
  setIngredients,
  recipes,
  setRecipes,
  day,
  type,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const selected = meals.find((obj) => obj.date === day)
    ? meals.find((obj) => obj.date === day)[type.type]
    : { ingredients: [], recipes: [] };

  const dailyMeal = meals.find((obj) => obj.date === day);

  return (
    <View className="flex-1">
      {modalVisible ? (
        <MealPlanModalComponent
          item={{
            day,
            icon: type.icon,
            type: type.type,
            selected,
          }}
          recipes={recipes}
          setRecipes={setRecipes}
          ingredients={ingredients}
          setIngredients={setIngredients}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          meals={meals}
          setMeals={setMeals}
        />
      ) : null}
      <TouchableOpacity
        style={{ backgroundColor: themeColors.secondary }}
        className="flex-1 rounded-2xl p-3"
        onPress={() => setModalVisible(!modalVisible)}
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
          <View className="flex-row justify-end">
            <View
              className="px-2 rounded-xl flex-row items-center my-1"
              style={{ backgroundColor: themeColors.primary, elevation: 5 }}
            >
              <Text
                className="text-base font-semibold"
                style={{ color: themeColors.onPrimary }}
              >
                {"€" +
                  (dailyMeal
                    ? calculateMealCosts(
                        dailyMeal,
                        type.type,
                        ingredients,
                        recipes
                      )
                    : "0.00")}
              </Text>
            </View>
          </View>
        </View>
        <Divider />
        {dailyMeal ? (
          <>
            <MealListComponent
              meals={meals}
              setMeals={setMeals}
              ingredients={ingredients}
              setIngredients={setIngredients}
              recipes={recipes}
              setRecipes={setRecipes}
              day={day}
              type={type.type}
              recipe={true}
            />
            <MealListComponent
              meals={meals}
              setMeals={setMeals}
              ingredients={ingredients}
              setIngredients={setIngredients}
              recipes={recipes}
              setRecipes={setRecipes}
              day={day}
              type={type.type}
              recipe={false}
            />
          </>
        ) : null}
      </TouchableOpacity>
    </View>
  );
}
