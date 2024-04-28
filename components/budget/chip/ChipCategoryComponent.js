import { Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { themeColors } from "~/theme";
import { IconButton } from "react-native-paper";
import EditCategoryModalComponent from "./EditCategoryModalComponent";

export default function ChipCategoryComponent({
  item,
  isActive,
  setActiveCategory,
  categoryListRef,
  categories,
  setCategories,
  isList,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <EditCategoryModalComponent
        categories={categories}
        setCategories={setCategories}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        isList={isList}
      />
      <TouchableOpacity
        onPress={() => {
          if (item.id >= 0) {
            categoryListRef.current.scrollToIndex({
              animated: true,
              index: item.index,
            });
            setActiveCategory(item.index);
          } else {
            setModalVisible(true);
          }
        }}
        className="p-3 px-5 rounded-full mr-2 shadow"
        style={{
          marginLeft: item.index === -1 ? 18 : 0,
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
