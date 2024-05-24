import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { themeColors } from "~/theme";
import EditExpenseModalComponent from "./EditExpenseModalComponent";

export default function ExpenseComponent({ item, itemIcon, itemCategory }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        setModalVisible(true);
      }}
      className="flex-row justify-between items-center p-2 mb-3 rounded-2xl"
      style={{ backgroundColor: themeColors.secondaryContainer }}
    >
      {modalVisible ? (
        <EditExpenseModalComponent
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          item={item}
          itemIcon={itemIcon}
          itemCategory={itemCategory}
        />
      ) : null}
      <View style={{ maxWidth: "80%" }}>
        <Text
          className="text-lg font-semibold z-10"
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{ color: themeColors.onSecondaryContainer }}
        >
          {item.title +
            (item.occurrence > 1 ? " (" + item.occurrence + ")" : "")}
        </Text>
      </View>
      <View>
        <Text
          className="text-lg font-semibold z-10"
          style={{ color: themeColors.onSecondaryContainer }}
        >
          €{parseFloat(item.total).toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
