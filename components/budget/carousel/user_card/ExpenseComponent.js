import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { themeColors } from "~/theme";
import EditExpenseModalComponent from "./EditExpenseModalComponent";

export default function ExpenseComponent({
  item,
  itemIcon,
  itemCategory,
  categories,
  setCategories,
  user,
  setUser,
  date,
}) {
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
          categories={categories}
          setCategories={setCategories}
          user={user}
          setUser={setUser}
          date={date}
        />
      ) : null}
      <View>
        <Text
          className="text-lg font-semibold z-10"
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
