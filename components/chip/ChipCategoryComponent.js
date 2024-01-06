import { Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { themeColors } from "../../theme";
import { IconButton } from "react-native-paper";
import EditCategoryModalComponent from "./EditCategoryModalComponent";

export default function ChipCategoryComponent({
  item,
  isActive,
  setActiveCategory,
  categoryListRef,
  categories,
  setCategories,
}) {
  let activeTextClass = isActive ? "text-gray-300" : "text-gray-800";
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <EditCategoryModalComponent
        categories={categories}
        setCategories={setCategories}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <TouchableOpacity
        onPress={() => {
          if (item.id >= 0) {
            categoryListRef.current.scrollToIndex({
              animated: true,
              index: item.id,
            });
            setActiveCategory(item.index);
          } else {
            setModalVisible(true);
          }
        }}
        className="p-3 px-5 rounded-full mr-2 shadow"
        style={{
          backgroundColor: isActive
            ? themeColors.bgWhite(0.1)
            : themeColors.bgWhite(0.4),
        }}
      >
        {item.id === -1 ? (
          <IconButton
            icon="plus"
            color="#1F2937"
            size={30}
            style={{ margin: -14, marginTop: -12 }}
          />
        ) : (
          <Text className={"font-bold " + activeTextClass}>{item.title}</Text>
        )}
      </TouchableOpacity>
    </>
  );
}
