import { View, Modal, Pressable } from "react-native";
import React from "react";
import { Calendar } from "react-native-calendars";
import { themeColors } from "~/theme";

export default function CalendarModal({
  currentDate,
  setDate,
  modalVisible,
  setModalVisible,
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
        style={{ paddingTop: 255 }}
      >
        <Pressable>
          <View
            className="mx-5 rounded-3xl overflow-hidden"
          >
            <Calendar
              onDayPress={(day) => {
                setDate(new Date(day.timestamp));
                setModalVisible(false);
              }}
              firstDay={1}
              current={currentDate.toISOString().split("T")[0]}
              markedDates={{
                [currentDate.toISOString().split("T")[0]]: {
                  selected: true,
                  selectedColor: themeColors.onPrimary,
                },
              }}
              theme={{
                calendarBackground: themeColors.primaryContainer,
                dayTextColor: themeColors.onPrimaryContainer,
                monthTextColor: themeColors.onPrimaryContainer,
                textDisabledColor: themeColors.outline,
                todayTextColor: themeColors.primary,
                monthTextColor: themeColors.onPrimaryContainer,
                arrowColor: themeColors.onPrimaryContainer,
              }}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
