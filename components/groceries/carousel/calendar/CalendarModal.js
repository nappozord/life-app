import { View, Modal, Pressable, TouchableOpacity, Text } from "react-native";
import React from "react";
import { Calendar } from "react-native-calendars";
import { themeColors } from "~/theme";
import { useDispatch, useSelector } from "react-redux";
import { updateDate, updateDefault } from "~/app/mealsSlice";

export default function CalendarModal({ modalVisible, setModalVisible }) {
  const currentDate = useSelector((state) => state.meals.date);

  const dispatch = useDispatch();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      statusBarTranslucent
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <Pressable
        onPress={() => setModalVisible(false)}
        className="flex-1"
        style={{ paddingTop: 310 }}
      >
        <Pressable>
          <View className="mx-5 rounded-3xl overflow-hidden">
            <Calendar
              onDayPress={(day) => {
                dispatch(updateDate(new Date(day.timestamp).toISOString()));
                setModalVisible(false);
              }}
              firstDay={1}
              current={currentDate.split("T")[0]}
              markedDates={{
                [currentDate.split("T")[0]]: {
                  selected: true,
                  selectedColor: themeColors.primary,
                  selectedTextColor: themeColors.onPrimary,
                },
              }}
              theme={{
                calendarBackground: themeColors.secondaryContainer,
                dayTextColor: themeColors.onPrimaryContainer,
                monthTextColor: themeColors.onPrimaryContainer,
                textDisabledColor: themeColors.outline,
                todayTextColor: themeColors.primary,
                monthTextColor: themeColors.onPrimaryContainer,
                arrowColor: themeColors.onPrimaryContainer,
              }}
            />
            <View>
              <TouchableOpacity
                className="py-3"
                style={{
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  backgroundColor: themeColors.primary,
                  elevation: 10,
                }}
                onPress={() => {
                  dispatch(updateDefault());
                  setModalVisible(false);
                }}
              >
                <Text
                  className="font-bold text-center text-xl"
                  style={{ color: themeColors.onPrimary }}
                >
                  Default
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
