import { TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import { IconButton } from "react-native-paper";
import { themeColors } from "~/theme";
import EditExpenseModalComponent from "./EditExpenseModalComponent";

export default function EditExpenseButtonComponent({
  categories,
  setCategories,
  icon,
  category,
  user,
  setUser,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      {modalVisible ? (
        <EditExpenseModalComponent
          categories={categories}
          setCategories={setCategories}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          itemIcon={icon}
          itemCategory={category}
          user={user}
          setUser={setUser}
        />
      ) : null}
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
        className="p-0 rounded-full justify-end"
        style={{ backgroundColor: themeColors.primary }}
      >
        <IconButton icon="plus" color={themeColors.onPrimary} size={30} />
      </TouchableOpacity>
    </>
  );
}
