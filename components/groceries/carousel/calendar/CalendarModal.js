import { View, Text, Modal, Pressable } from "react-native";
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
        style={{ paddingTop: 285 }}
      >
        <Pressable>
          <View
            className="mx-5 rounded-2xl overflow-hidden"
            style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
          >
            <Calendar
              onDayPress={(day) => {
                setDate(new Date(day.timestamp))
                setModalVisible(false);
              }}
              firstDay={1}
              current={currentDate.toISOString().split("T")[0]}
              markedDates={{
                [currentDate.toISOString().split("T")[0]]: {selected: true, selectedColor: themeColors.bgBlack(0.5)}
              }}
              theme={{
                calendarBackground: themeColors.chartBlue(1),
                dayTextColor: themeColors.bgWhite(0.7),
                monthTextColor: themeColors.bgWhite(0.7),
                textDisabledColor: themeColors.bgWhite(0.3),
                todayTextColor: themeColors.bgBlack(1),
                arrowColor: themeColors.bgWhite(0.7),
              }}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}