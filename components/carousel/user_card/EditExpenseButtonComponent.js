import { TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import { IconButton } from "react-native-paper";
import { themeColors } from "../../../theme";
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
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
        className="p-0 rounded-full justify-end"
        style={{ backgroundColor: themeColors.bgWhite(0.4) }}
      >
        <IconButton icon="plus" color={themeColors.bgBlack} size={30} />
      </TouchableOpacity>
    </>
  );
}
