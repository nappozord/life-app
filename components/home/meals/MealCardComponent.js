import { View, Text, TouchableOpacity } from "react-native";
import ReservationTypeComponent from "~/components/groceries/carousel/calendar/ReservationTypeComponent";
import Animated, { FadeIn } from "react-native-reanimated";
import MealListComponent from "../../groceries/carousel/calendar/MealListComponent";
import { themeColors } from "~/theme";
import { IconButton } from "react-native-paper";
import { useSelector } from "react-redux";

export default function MealCardComponent() {
  const meals = useSelector((state) => state.meals.meals);
  const day = new Date().toISOString().split("T")[0];

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
    <View
      className="mx-3 pb-3 rounded-2xl"
      style={[
        {
          backgroundColor: themeColors.onSecondary,
          elevation: 5,
        },
      ]}
    >
      <View className="mx-3 mb-2 flex-row items-center justify-between space-x-1">
        <View className="flex-row items-center space-x-1">
          <Text
            className="text-xl font-semibold z-10"
            style={{ color: themeColors.onSecondaryContainer }}
          >
            Today's Meals
          </Text>
          <IconButton icon={"food"} color={themeColors.primary} />
        </View>
        <TouchableOpacity className="-mx-4 -mb-3 -mt-2">
          <IconButton
            size={32}
            icon={"plus-circle-outline"}
            color={themeColors.primary}
          />
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between mx-3 space-x-3">
        <Animated.View entering={FadeIn} className="flex-1 mb-1">
          <ReservationTypeComponent day={day} type={types[0]} home={true} />
        </Animated.View>
        <Animated.View entering={FadeIn} className="flex-1 mb-1">
          <ReservationTypeComponent day={day} type={types[1]} home={true} />
        </Animated.View>
      </View>

      <View className="flex-row justify-between mx-3 space-x-3">
        <Animated.View entering={FadeIn} className="flex-1 mb-1">
          <ReservationTypeComponent day={day} type={types[2]} home={true} />
        </Animated.View>
        <Animated.View entering={FadeIn} className="flex-1 mb-1">
          <ReservationTypeComponent day={day} type={types[3]} home={true} />
        </Animated.View>
      </View>
    </View>
  );
}
