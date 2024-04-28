import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { themeColors } from "~/theme";
import EditItemModalComponent from "./EditItemModalComponent";
import { IconButton } from "react-native-paper";

export default function ItmeComponent({
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

  function updateItem() {
    const currentDate = new Date();
    const category = categories.find((obj) => itemCategory === obj.title);
    category.expenses.find((obj) => obj.id === item.id).bought = !item.bought;
    category.expenses.find((obj) => obj.id === item.id).dateBought =
      currentDate.toISOString();
    if (item.bought) category.realBought += parseFloat(item.total);
    else category.realBought -= parseFloat(item.total);
    setCategories([...categories]);
  }

  return (
    <TouchableOpacity
      onPress={() => {
        setModalVisible(true);
      }}
      className="flex-row justify-between items-center py-2 px-3 mb-3 rounded-2xl"
      style={{
        backgroundColor: item.bought
          ? themeColors.success
          : themeColors.secondaryContainer,
      }}
    >
      {modalVisible ? (
        <EditItemModalComponent
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
      <View className="flex-row items-center -ml-2" style={{ maxWidth: "70%" }}>
        <IconButton
          className="-my-2 -mx-1 p-0"
          icon={item.bought ? "close-circle-outline" : "check-circle-outline"}
          color={
            item.bought
              ? themeColors.onSuccess
              : themeColors.onSecondaryContainer
          }
          size={32}
          onPress={() => updateItem()}
        />
        <Text
          className="text-lg font-semibold z-10 px-1"
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{
            color: item.bought
              ? themeColors.onSuccess
              : themeColors.onSecondaryContainer,
          }}
        >
          {item.title +
            (item.occurrence > 1 ? " (" + item.occurrence + ")" : "")}
        </Text>
      </View>
      <View>
        <Text
          className="text-lg font-semibold z-10"
          style={{
            color: item.bought
              ? themeColors.onSuccess
              : themeColors.onSecondaryContainer,
          }}
        >
          €{parseFloat(item.total).toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
