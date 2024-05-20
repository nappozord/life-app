import { TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { IconButton } from "react-native-paper";
import { themeColors } from "~/theme";
import EditExpenseModalComponent from "./EditExpenseModalComponent";
import EditItemModalComponent from "~/components/list/list_card/EditItemModalComponent";

export default function EditExpenseButtonComponent({
  categories,
  setCategories,
  icon,
  category,
  date,
  isList,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      {modalVisible ? 
      isList ? (
        <EditItemModalComponent
          categories={categories}
          setCategories={setCategories}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          itemIcon={icon}
          itemCategory={category}
          date={date}
        />
      ) : (
        <EditExpenseModalComponent
          categories={categories}
          setCategories={setCategories}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          itemIcon={icon}
          itemCategory={category}
          date={date}
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
