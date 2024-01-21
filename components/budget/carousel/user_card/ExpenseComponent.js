import { View, Text, Modal, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { themeColors } from "~/theme";
import EditExpenseModalComponent from "./EditExpenseModalComponent";

export default function ExpenseCardComponent({
  item,
  itemIcon,
  itemCategory,
  categories,
  setCategories,
  user,
  setUser,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        setModalVisible(true);
      }}
      className="flex-row justify-between items-center p-2 mb-3 rounded-2xl"
      style={{ backgroundColor: themeColors.secondary }}
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
        />
      ) : null}
      <View>
        <Text className="text-lg font-semibold z-10" style={{color: themeColors.onSecondary}}>
          {item.title +
            (item.occurrence > 1 ? " (" + item.occurrence + ")" : "")}
        </Text>
      </View>
      <View>
        <Text className="text-lg font-semibold z-10" style={{color: themeColors.onSecondary}}>
          €{parseFloat(item.total).toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
