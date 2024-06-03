import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { themeColors } from "~/theme";
import { getExpense } from "~/app/categoriesSlice";
import { useSelector } from "react-redux";
import EditExpenseModalComponent from "./EditExpenseModalComponent";

export default function ExpenseComponent({ expenseId, categoryId }) {
  const expense = useSelector((state) =>
    getExpense(state, expenseId, categoryId)
  );

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        setModalVisible(true);
      }}
      className="flex-row justify-between items-center p-2 mb-3 rounded-2xl"
      style={{ backgroundColor: themeColors.secondaryContainer }}
    >
      {modalVisible ? (
        <EditExpenseModalComponent
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          categoryId={categoryId}
          expenseId={expenseId}
        />
      ) : null}
      <View style={{ maxWidth: "80%" }}>
        <Text
          className="text-lg font-semibold z-10"
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{ color: themeColors.onSecondaryContainer }}
        >
          {expense.title +
            (expense.occurrence > 1 ? " (" + expense.occurrence + ")" : "")}
        </Text>
      </View>
      <View>
        <Text
          className="text-lg font-semibold z-10"
          style={{ color: themeColors.onSecondaryContainer }}
        >
          €{parseFloat(expense.total).toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
