import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  Easing,
  SlideInDown,
  SlideInLeft,
  SlideOutLeft,
  SlideOutRight,
  SlideInRight,
  SlideOutDown,
} from "react-native-reanimated";
import { IconButton } from "react-native-paper";
import { themeColors } from "~/theme";
import LogsListComponent from "./LogsListComponent";

const height = Dimensions.get("window").height;

export default function LogsModal({ setLogs }) {
  const [animation, setAnimation] = useState("left");
  const [date, setDate] = useState(new Date());

  return (
    <Animated.View
      entering={SlideInDown.duration(400).easing(Easing.ease)}
      exiting={SlideOutDown.duration(400).easing(Easing.ease)}
      className="flex-1 bg-transparent pt-16 w-full absolute"
      style={{
        top: height / 24,
        height: height / 0.5,
      }}
    >
      <View className="absolute w-full mt-8 z-10">
        <View className="flex-row justify-center">
          <View
            className="rounded-full p-1"
            style={{ backgroundColor: themeColors.onBackground }}
          >
            <IconButton
              icon={"close"}
              color={themeColors.background}
              size={36}
              onPress={() => setLogs(false)}
            />
          </View>
        </View>
      </View>
      <Image
        className="absolute w-full mt-16"
        source={require("~/assets/splash.png")}
        style={{
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}
      ></Image>
      <View
        className="flex-1 px-4 pt-20"
        style={{
          backgroundColor: themeColors.onSecondary,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}
      >
        <View className="flex-row w-full justify-between -mt-6 mb-0">
          <TouchableOpacity
            onPress={() => {
              setAnimation("left");
              const dateCopy = new Date(date);
              dateCopy.setDate(dateCopy.getDate() - 1);
              setDate(dateCopy);
            }}
          >
            <IconButton
              icon="chevron-left"
              size={30}
              color={themeColors.onBackground}
            />
          </TouchableOpacity>
          <Pressable className="flex-row justify-between items-center -ml-6">
            <IconButton
              className="ml-0"
              icon="calendar"
              size={24}
              color={themeColors.primary}
            />
            <Animated.Text
              key={date}
              entering={animation === "left" ? SlideInLeft : SlideInRight}
              exiting={animation === "left" ? SlideOutRight : SlideOutLeft}
              className="font-semibold text-2xl"
              style={{ color: themeColors.onBackground }}
            >
              {date.toISOString().split("T")[0]}
            </Animated.Text>
          </Pressable>
          <TouchableOpacity
            onPress={() => {
              setAnimation("right");
              const dateCopy = new Date(date);
              dateCopy.setDate(dateCopy.getDate() + 1);
              setDate(dateCopy);
            }}
          >
            <IconButton
              icon="chevron-right"
              size={30}
              color={themeColors.onBackground}
            />
          </TouchableOpacity>
        </View>
        <LogsListComponent date={date} />
      </View>
    </Animated.View>
  );
}
