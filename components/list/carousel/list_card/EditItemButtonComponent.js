import { TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { IconButton } from "react-native-paper";
import { themeColors } from "~/theme";
import EditItemModalComponent from "./EditItemModalComponent";

export default function EditItemButtonComponent({ listId }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      {modalVisible ? (
        <EditItemModalComponent
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          listId={listId}
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
