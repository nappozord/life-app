import { Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { themeColors } from "~/theme";
import { IconButton } from "react-native-paper";
import EditCategoryModalComponent from "./EditCategoryModalComponent";
import { useDispatch } from "react-redux";
import { updateActiveCategory } from "~/app/categoriesSlice";

export default function ChipCategoryComponent({ item, isActive }) {
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <EditCategoryModalComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <TouchableOpacity
        onPress={() => {
          if (item.id >= 0) {
            dispatch(updateActiveCategory(item.id));
          } else {
            setModalVisible(true);
          }
        }}
        className="p-3 px-5 rounded-full mr-2 shadow"
        style={{
          marginLeft: item.id === -1 ? 18 : 0,
          backgroundColor: isActive
            ? themeColors.primary
            : themeColors.secondary,
        }}
      >
        {item.id === -1 ? (
          <IconButton
            icon="plus"
            color={themeColors.onSecondary}
            size={30}
            style={{ margin: -14, marginTop: -12 }}
          />
        ) : (
          <Text
            className="font-bold"
            style={{
              color: isActive ? themeColors.onPrimary : themeColors.onSecondary,
            }}
          >
            {item.title}
          </Text>
        )}
      </TouchableOpacity>
    </>
  );
}
