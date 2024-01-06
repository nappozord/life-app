import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { themeColors } from "../../theme";
import Animated, {
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
} from "react-native-reanimated";
import { IconButton } from "react-native-paper";
import { formatDate } from "../../utils/manageDate";

export default function DatePickerModalComponent({
  setModalVisible,
  date,
  setDate,
}) {
  const [animation, setAnimation] = useState("left");
  const [year, setYear] = useState(date.year);

  const months = Array.from({ length: 6 });

  return (
    <Pressable onPress={() => setModalVisible(false)} className="flex-1 top-40">
      <Pressable
        className="m-5 rounded-3xl"
        style={{ backgroundColor: themeColors.bgWhite(0.9) }}
      >
        <View className="space-y-2">
          <TouchableOpacity
            className="py-3"
            style={{
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              backgroundColor: themeColors.chartBlue,
            }}
            onPress={() => {
              setModalVisible(false);
              setDate(formatDate(new Date()));
            }}
          >
            <Text className="text-gray-200 font-bold text-center text-xl">
              This Month
            </Text>
          </TouchableOpacity>
          <View className="flex-row justify-between items-center">
            <TouchableOpacity
              onPress={() => {
                setAnimation("left");
                setYear(year - 1);
              }}
            >
              <IconButton
                icon="chevron-left"
                size={26}
                color={themeColors.bgBlack}
              />
            </TouchableOpacity>
            <View className="flex-row justify-between items-center -ml-6">
              <IconButton
                className="ml-0"
                icon="calendar"
                size={24}
                color={themeColors.bgBlack}
              />
              <Animated.Text className="font-semibold text-xl text-gray-800">
                {year}
              </Animated.Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setAnimation("right");
                setYear(year + 1);
              }}
            >
              <IconButton
                icon="chevron-right"
                size={26}
                color={themeColors.bgBlack}
              />
            </TouchableOpacity>
          </View>
          <View className="space-y-2 px-5 mb-5">
            <View className="flex-row justify-between items-center">
              {months.map((_, index) => {
                const monthText = new Date(year, index, 1).toLocaleString(
                  "default",
                  { month: "short" }
                );

                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setModalVisible(false);
                      setDate(formatDate(new Date(year, index, 1)));
                    }}
                    className="px-3 py-1 rounded-full"
                    style={
                      date.month === index + 1
                        ? { backgroundColor: themeColors.bgBlack, opacity: 0.7 }
                        : {}
                    }
                  >
                    <Text
                      className={
                        "text-base font-semibold " +
                        (date.month === index + 1
                          ? "text-white"
                          : "text-gray-700")
                      }
                    >
                      {monthText.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View className="flex-row justify-between items-center">
              {months.map((_, index) => {
                index = index + 6;
                const monthText = new Date(year, index, 1).toLocaleString(
                  "default",
                  { month: "short" }
                );

                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setModalVisible(false);
                      setDate(formatDate(new Date(year, index, 1)));
                    }}
                    className="px-3 py-1 rounded-full"
                    style={
                      date.month === index + 1
                        ? { backgroundColor: themeColors.bgBlack, opacity: 0.7 }
                        : {}
                    }
                  >
                    <Text
                      className={
                        "text-base font-semibold " +
                        (date.month === index + 1
                          ? "text-white"
                          : "text-gray-700")
                      }
                    >
                      {monthText.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </Pressable>
    </Pressable>
  );
}
