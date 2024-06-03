import { TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { IconButton } from "react-native-paper";
import { themeColors } from "~/theme";
import EditExpenseModalComponent from "./EditExpenseModalComponent";
import EditItemModalComponent from "~/components/list/list_card/EditItemModalComponent";

export default function EditExpenseButtonComponent({ categoryId, isList }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      {modalVisible ? (
        isList ? (
          <EditItemModalComponent
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            categoryId={categoryId}
          />
        ) : (
          <EditExpenseModalComponent
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            categoryId={categoryId}
          />
        )
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
