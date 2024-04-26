import { View, Modal, Pressable, TouchableOpacity, Text } from "react-native";
import React from "react";
import { Calendar } from "react-native-calendars";
import { themeColors } from "~/theme";

export default function CalendarModal({
  currentDate,
  setDate,
  modalVisible,
  setModalVisible,
  setDefault,
}) {
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
                setDate(new Date(day.timestamp));
                setDefault(false);
                setModalVisible(false);
              }}
              firstDay={1}
              current={currentDate.toISOString().split("T")[0]}
              markedDates={{
                [currentDate.toISOString().split("T")[0]]: {
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
                  setModalVisible(false);
                  setDefault(true);
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
