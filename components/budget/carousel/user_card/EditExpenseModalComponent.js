import {
  View,
  Text,
  TextInput,
  Image,
  Modal,
  Pressable,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useRef } from "react";
import { themeColors } from "~/theme";
import { IconButton } from "react-native-paper";
import Animated, { SlideInDown } from "react-native-reanimated";
import { isPreviousMonth } from "~/utils/manageDate";
import { useDispatch, useSelector } from "react-redux";

import { updateUser } from "~/app/userSlice";
import { addExpense, deleteExpense } from "~/app/categoriesSlice";

export default function EditExpenseModalComponent({
  item,
  modalVisible,
  setModalVisible,
  itemIcon,
  itemCategory,
}) {
  const user = useSelector((state) => state.user.user);
  const { categories, date } = useSelector((state) => state.categories);

  const inputRef = useRef(null);
  const currentDate = new Date().toDateString();

  const dispatch = useDispatch();

  const description = useRef(item ? item.title.toString() : null);
  const amount = useRef(item ? parseFloat(item.total).toFixed(2) : null);
  const expenseDate = useRef(
    item ? (item.date ? item.date : currentDate) : currentDate
  );

  const handleAddExpense = () => {
    amount.current === null || amount.current === ""
      ? (amount.current = 0)
      : null;
    description.current === null || description.current === ""
      ? (description.current = "New Expense")
      : null;

    const category = categories.find((obj) => itemCategory === obj.title);

    if (category.income) {
      if (!isPreviousMonth(date.month, date.year))
        dispatch(
          updateUser({
            ...user,
            balance: parseFloat(user.balance) + parseFloat(amount.current),
          })
        );
    } else {
      if (!isPreviousMonth(date.month, date.year))
        dispatch(
          updateUser({
            ...user,
            balance: parseFloat(user.balance) - parseFloat(amount.current),
          })
        );
    }

    dispatch(
      addExpense({
        itemCategory,
        expenseDate: expenseDate.current,
        amount: amount.current,
        description: description.current,
      })
    );
  };

  const handleUpdateExpense = () => {
    handleDeleteExpense();
    handleAddExpense();
  };

  const handleDeleteExpense = () => {
    const category = categories.find((obj) => itemCategory === obj.title);

    if (category.income) {
      if (!isPreviousMonth(date.month, date.year))
        dispatch(
          updateUser({
            ...user,
            balance: parseFloat(user.balance) - parseFloat(item.total),
          })
        );
    } else {
      if (!isPreviousMonth(date.month, date.year))
        dispatch(
          updateUser({
            ...user,
            balance: parseFloat(user.balance) + parseFloat(item.total),
          })
        );
    }

    dispatch(
      deleteExpense({
        itemCategory,
        id: item.id,
        title: item.title,
        total: item.total,
      })
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      statusBarTranslucent
      onRequestClose={() => {
        setModalVisible(false);
      }}
      onShow={() => {
        const timeout = setTimeout(() => {
          inputRef.current.focus();
        }, 100);
        return () => clearTimeout(timeout);
      }}
    >
      <Image
        className="absolute h-full w-full"
        source={require("~/assets/splash.png")}
        //blurRadius={80}
        style={{ opacity: 0.9 }}
      />
      <KeyboardAvoidingView
        //keyboardVerticalOffset={-50}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Pressable
          onPress={() => setModalVisible(false)}
          className="flex-1 justify-end"
        >
          <Pressable>
            <Animated.View
              entering={SlideInDown.duration(500)}
              style={{
                backgroundColor: themeColors.onSecondary,
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
              }}
            >
              <View className="flex-row justify-between align-center">
                <View />
                <View
                  className="p-5 rounded-full -mt-20 items-center"
                  style={{
                    backgroundColor: themeColors.background,
                    borderColor: themeColors.onSecondary,
                    borderWidth: 5,
                  }}
                >
                  <View className="flex-row">
                    <IconButton
                      icon={item ? "pencil" : "plus"}
                      color={themeColors.onBackground}
                      size={30}
                      className="-mr-2"
                    />
                    <IconButton
                      icon={itemIcon}
                      color={themeColors.onBackground}
                      size={30}
                      className="-ml-2"
                    />
                  </View>
                  <Text
                    className="text-xl font-semibold -mt-4 mb-4"
                    style={{ color: themeColors.onBackground }}
                  >
                    {itemCategory}
                  </Text>
                </View>
                <View />
              </View>
              <View className="-mt-7">
                <View className="space-y-1 p-5">
                  <Text
                    className="font-semibold text-lg ml-2"
                    style={{ color: themeColors.onSecondaryContainer }}
                  >
                    Description
                  </Text>
                  <TextInput
                    ref={inputRef}
                    className="p-3 rounded-2xl mb-2 text-base"
                    style={{
                      backgroundColor: themeColors.onSecondaryContainer,
                      color: themeColors.background,
                    }}
                    placeholder="E.g. Pizza!"
                    selectionColor={themeColors.background}
                    defaultValue={description.current}
                    onChangeText={(text) => {
                      description.current = text;
                    }}
                  />
                  <Text
                    className="font-semibold text-lg ml-2"
                    style={{ color: themeColors.onSecondaryContainer }}
                  >
                    Amount
                  </Text>
                  <View className="flex-row items-center">
                    <View className="flex-1">
                      <View
                        className="flex-row items-center rounded-2xl p-1 overflow-visible"
                        style={{
                          backgroundColor: themeColors.onSecondaryContainer,
                          height: 50,
                        }}
                      >
                        <TextInput
                          keyboardType="numeric"
                          placeholder="E.g. €12.34"
                          className="px-2 flex-1 text-base"
                          style={{ color: themeColors.background }}
                          selectionColor={themeColors.background}
                          defaultValue={amount.current}
                          onChangeText={(text) => {
                            amount.current = text.split(" ").join("");
                          }}
                        />
                        <Pressable
                          className="rounded-2xl pr-0.5"
                          style={{ backgroundColor: themeColors.background }}
                        >
                          <IconButton
                            size={20}
                            icon="currency-eur"
                            color={themeColors.onBackground}
                          />
                        </Pressable>
                      </View>
                    </View>
                    <View className="flex-1 items-center">
                      <Text
                        className="text-lg"
                        style={{ color: themeColors.onSecondaryContainer }}
                      >
                        {expenseDate.current}
                      </Text>
                    </View>
                  </View>
                </View>
                {item ? (
                  <View className="flex-row justify-between items-center">
                    <View className="flex-1">
                      <TouchableOpacity
                        className="py-5 px-5 mt-1"
                        style={{
                          backgroundColor: themeColors.primary,
                          borderRightColor: themeColors.secondaryContainer,
                          borderRightWidth: 1,
                          borderTopLeftRadius: 24,
                        }}
                        onPress={() => {
                          handleUpdateExpense();
                          setModalVisible(false);
                        }}
                      >
                        <Text
                          className="font-bold text-center text-xl"
                          style={{ color: themeColors.onPrimary }}
                        >
                          Edit
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View className="flex-1">
                      <TouchableOpacity
                        className="py-5 px-5 mt-1"
                        style={{
                          backgroundColor: themeColors.errorContainer,
                          borderLeftColor: themeColors.secondaryContainer,
                          borderLeftWidth: 1,
                          borderTopRightRadius: 24,
                        }}
                        onPress={() => {
                          handleDeleteExpense();
                          setModalVisible(false);
                        }}
                      >
                        <Text
                          className="font-bold text-center text-xl"
                          style={{ color: themeColors.onErrorContainer }}
                        >
                          Delete
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <TouchableOpacity
                    className="py-5 mt-2"
                    style={{
                      backgroundColor: themeColors.primary,
                      borderTopRightRadius: 24,
                      borderTopLeftRadius: 24,
                    }}
                    onPress={() => {
                      handleAddExpense();
                      setModalVisible(false);
                    }}
                  >
                    <Text
                      className="font-bold text-center text-xl"
                      style={{ color: themeColors.onPrimary }}
                    >
                      Add Expense
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </Animated.View>
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}
