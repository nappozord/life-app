import { View, Pressable, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import Animated, {
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
} from "react-native-reanimated";
import { IconButton } from "react-native-paper";
import { formatDate } from "~/utils/manageDate";
import { themeColors } from "~/theme";
import DatePickerModalComponent from "./DatePickerModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { updateDate } from "~/app/categoriesSlice";

export default function DatePickerComponent() {
  const date = useSelector((state) => state.categories.date);
  const dispatch = useDispatch();

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
        <DatePickerModalComponent setModalVisible={setModalVisible} />
      </Modal>
      <TouchableOpacity
        onPress={() => {
          setAnimation("left");
          const dateCopy = new Date(date.date);
          dateCopy.setMonth(dateCopy.getMonth() - 1);
          dispatch(updateDate(formatDate(dateCopy)));
        }}
      >
        <IconButton
          icon="chevron-left"
          size={30}
          color={themeColors.onBackground}
        />
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
          color={themeColors.primary}
        />
        <Animated.Text
          key={date.title}
          entering={animation === "left" ? SlideInLeft : SlideInRight}
          exiting={animation === "left" ? SlideOutRight : SlideOutLeft}
          className="font-semibold text-2xl"
          style={{ color: themeColors.onBackground }}
        >
          {date.title}
        </Animated.Text>
      </Pressable>
      <TouchableOpacity
        onPress={() => {
          setAnimation("right");
          const dateCopy = new Date(date.date);
          dateCopy.setMonth(dateCopy.getMonth() + 1);
          dispatch(updateDate(formatDate(dateCopy)));
        }}
      >
        <IconButton
          icon="chevron-right"
          size={30}
          color={themeColors.onBackground}
        />
      </TouchableOpacity>
    </View>
  );
}
