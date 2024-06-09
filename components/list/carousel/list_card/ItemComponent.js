import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { themeColors } from "~/theme";
import EditItemModalComponent from "./EditItemModalComponent";
import { IconButton } from "react-native-paper";
import { getExpense } from "~/app/listsSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateExpenseBoughtDate } from "~/app/listsSlice";

export default function ItemComponent({ expenseId, listId }) {
  const expense = useSelector((state) => getExpense(state, expenseId, listId));

  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);

  function handleUpdateItem() {
    dispatch(updateExpenseBoughtDate({ listId, expenseId }));
  }

  return (
    <TouchableOpacity
      onPress={() => {
        setModalVisible(true);
      }}
      className="flex-row justify-between items-center py-2 px-3 mb-3 rounded-2xl"
      style={{
        backgroundColor: expense.dateBought
          ? themeColors.success
          : themeColors.secondaryContainer,
      }}
    >
      {modalVisible ? (
        <EditItemModalComponent
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          listId={listId}
          expenseId={expenseId}
        />
      ) : null}
      <View className="flex-row items-center -ml-2" style={{ maxWidth: "70%" }}>
        <IconButton
          className="-my-2 -mx-1 p-0"
          icon={
            expense.dateBought ? "close-circle-outline" : "check-circle-outline"
          }
          color={
            expense.dateBought
              ? themeColors.onSuccess
              : themeColors.onSecondaryContainer
          }
          size={32}
          onPress={() => handleUpdateItem()}
        />
        <Text
          className="text-lg font-semibold z-10 px-1"
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{
            color: expense.dateBought
              ? themeColors.onSuccess
              : themeColors.onSecondaryContainer,
          }}
        >
          {expense.title +
            (expense.occurrence > 1 ? " (" + expense.occurrence + ")" : "")}
        </Text>
      </View>
      <View>
        <Text
          className="text-lg font-semibold z-10"
          style={{
            color: expense.dateBought
              ? themeColors.onSuccess
              : themeColors.onSecondaryContainer,
          }}
        >
          €{parseFloat(expense.total).toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
