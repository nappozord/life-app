import { View } from "react-native";
import ReservationTypeComponent from "./ReservationTypeComponent";
import Animated, { SlideInRight } from "react-native-reanimated";

export default function ReservationCardComponent({
  meals,
  setMeals,
  ingredients,
  setIngredients,
  recipes,
  setRecipes,
  day,
  defaultWeek,
}) {
  const types = [
    {
      type: "breakfast",
      icon: "coffee",
    },
    {
      type: "snack",
      icon: "candy",
    },
    {
      type: "lunch",
      icon: "food-fork-drink",
    },
    {
      type: "dinner",
      icon: "bowl-mix",
    },
  ];

  return (
    <View className="flex-1 ml-4">
      <Animated.View entering={SlideInRight} className="flex-1 mb-1">
        <ReservationTypeComponent
          meals={meals}
          setMeals={setMeals}
          ingredients={ingredients}
          setIngredients={setIngredients}
          recipes={recipes}
          setRecipes={setRecipes}
          day={day}
          type={types[0]}
          defaultWeek={defaultWeek}
        />
      </Animated.View>
      <Animated.View entering={SlideInRight} className="flex-1 mb-1">
        <ReservationTypeComponent
          meals={meals}
          setMeals={setMeals}
          ingredients={ingredients}
          setIngredients={setIngredients}
          recipes={recipes}
          setRecipes={setRecipes}
          day={day}
          type={types[1]}
          defaultWeek={defaultWeek}
        />
      </Animated.View>
      <Animated.View entering={SlideInRight} className="flex-1 mb-1">
        <ReservationTypeComponent
          meals={meals}
          setMeals={setMeals}
          ingredients={ingredients}
          setIngredients={setIngredients}
          recipes={recipes}
          setRecipes={setRecipes}
          day={day}
          type={types[2]}
          defaultWeek={defaultWeek}
        />
      </Animated.View>
      <Animated.View entering={SlideInRight} className="flex-1 mb-1">
        <ReservationTypeComponent
          meals={meals}
          setMeals={setMeals}
          ingredients={ingredients}
          setIngredients={setIngredients}
          recipes={recipes}
          setRecipes={setRecipes}
          day={day}
          type={types[3]}
          defaultWeek={defaultWeek}
        />
      </Animated.View>
    </View>
  );
}
