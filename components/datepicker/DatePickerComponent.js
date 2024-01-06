import { View, Text, Pressable, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import Animated, {
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
} from "react-native-reanimated";
import { IconButton } from "react-native-paper";
import { formatDate } from "../../utils/manageDate";
import { themeColors } from "../../theme";
import DatePickerModalComponent from "./DatePickerModalComponent";

export default function DatePickerComponent({ date, setDate }) {
  const [animation, setAnimation] = useState("left");
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="flex-row px-2 justify-between items-center">
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        statusBarTranslucent
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <DatePickerModalComponent
          setModalVisible={setModalVisible}
          date={date}
          setDate={setDate}
        />
      </Modal>
      <TouchableOpacity
        onPress={() => {
          setAnimation("left");
          const dateCopy = new Date(date.date);
          dateCopy.setMonth(dateCopy.getMonth() - 1);
          setDate(formatDate(dateCopy));
        }}
      >
        <IconButton icon="chevron-left" size={30} color={themeColors.bgGrey} />
      </TouchableOpacity>
      <Pressable
        className="flex-row justify-between items-center -ml-6"
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <IconButton
          className="ml-0"
          icon="calendar"
          size={24}
          color={themeColors.bgGrey}
        />
        <Animated.Text
          key={date.title}
          entering={animation === "left" ? SlideInLeft : SlideInRight}
          exiting={animation === "left" ? SlideOutRight : SlideOutLeft}
          className="font-semibold text-2xl text-gray-200"
        >
          {date.title}
        </Animated.Text>
      </Pressable>
      <TouchableOpacity
        onPress={() => {
          setAnimation("right");
          const dateCopy = new Date(date.date);
          dateCopy.setMonth(dateCopy.getMonth() + 1);
          setDate(formatDate(dateCopy));
        }}
      >
        <IconButton icon="chevron-right" size={30} color={themeColors.bgGrey} />
      </TouchableOpacity>
    </View>
  );
}
