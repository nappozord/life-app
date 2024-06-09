import { View } from "react-native";
import ReservationTypeComponent from "./ReservationTypeComponent";
import Animated, { FadeIn } from "react-native-reanimated";

export default function ReservationCardComponent({ day }) {
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
      <Animated.View entering={FadeIn} className="flex-1 mb-1">
        <ReservationTypeComponent day={day} type={types[0]} />
      </Animated.View>
      <Animated.View entering={FadeIn} className="flex-1 mb-1">
        <ReservationTypeComponent day={day} type={types[1]} />
      </Animated.View>
      <Animated.View entering={FadeIn} className="flex-1 mb-1">
        <ReservationTypeComponent day={day} type={types[2]} />
      </Animated.View>
      <Animated.View entering={FadeIn} className="flex-1 mb-1">
        <ReservationTypeComponent day={day} type={types[3]} />
      </Animated.View>
    </View>
  );
}
