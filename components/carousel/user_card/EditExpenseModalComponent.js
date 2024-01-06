import {
  View,
  Text,
  TextInput,
  Image,
  Modal,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useRef } from "react";
import { themeColors } from "../../../theme";
import { IconButton } from "react-native-paper";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";

export default function EditExpenseModalComponent({
  item,
  modalVisible,
  setModalVisible,
  itemIcon,
  itemCategory,
  categories,
  setCategories,
  user,
  setUser,
}) {
  const inputRef = React.useRef(null);

  const description = useRef(item ? item.title.toString() : null);
  const amount = useRef(item ? item.total.toString() : null);

  const addExpense = () => {
    amount.current === null || amount.current === ""
      ? (amount.current = 0)
      : null;
    description.current === null || description.current === ""
      ? (description.current = "New Expense")
      : null;

    const category = categories.find((obj) => itemCategory === obj.title);

    if (category.income) {
      category.real -= parseFloat(amount.current);
      categories[0].real.in =
        parseFloat(categories[0].real.in) + parseFloat(amount.current);
      user.balance = parseFloat(user.balance) + parseFloat(amount.current);
    } else {
      category.real += parseFloat(amount.current);
      categories[0].real.out =
        parseFloat(categories[0].real.out) + parseFloat(amount.current);
      user.balance = parseFloat(user.balance) - parseFloat(amount.current);
    }

    let occurrences = 1;

    category.expenses.forEach((obj) => {
      if (obj.title === description.current) occurrences += 1;
    });

    category.expenses.push({
      title: description.current,
      total: parseFloat(amount.current),
      id: category.expenses[category.expenses.length - 1]
        ? category.expenses[category.expenses.length - 1].id + 1
        : 0,
      occurrence: occurrences,
    });

    setUser({ ...user });
    setCategories([...categories]);
  };

  const updateExpense = () => {
    addExpense();
    deleteExpense();
  };

  const deleteExpense = () => {
    const category = categories.find((obj) => itemCategory === obj.title);

    if (category.income) {
      category.real += parseFloat(item.total);
      categories[0].real.in =
        parseFloat(categories[0].real.in) - parseFloat(item.total);
      user.balance = parseFloat(user.balance) - parseFloat(item.total);
    } else {
      category.real -= parseFloat(item.total);
      categories[0].real.out =
        parseFloat(categories[0].real.out) - parseFloat(item.total);
      user.balance = parseFloat(user.balance) + parseFloat(item.total);
    }

    const filteredArray = category.expenses.filter((obj) => obj.id !== item.id);

    let occurrences = 1;

    filteredArray.forEach((obj) => {
      if (obj.title === item.title) {
        obj.occurrence = occurrences;
        occurrences += 1;
      }
    });

    category.expenses = filteredArray;

    setUser({ ...user });
    setCategories([...categories]);
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
        source={require("../../../assets/bg.png")}
        blurRadius={80}
        style={{ opacity: 0.9 }}
      />
      <KeyboardAvoidingView
        keyboardVerticalOffset={-50}
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
                backgroundColor: themeColors.bgWhite(0.6),
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
              }}
            >
              <View className="flex-row justify-between align-center">
                <View />
                <View
                  className="p-5 rounded-full -mt-20 items-center"
                  style={{
                    backgroundColor: themeColors.bgBlack,
                    borderColor: themeColors.bgGrey,
                    borderWidth: 5,
                  }}
                >
                  <View className="flex-row">
                    <IconButton
                      icon={item ? "pencil" : "plus"}
                      color={themeColors.bgGrey}
                      size={30}
                      className="-mr-2"
                    />
                    <IconButton
                      icon={itemIcon}
                      color={themeColors.bgGrey}
                      size={30}
                      className="-ml-2"
                    />
                  </View>
                  <Text className="text-xl font-semibold -mt-4 mb-4 text-gray-400">
                    {itemCategory}
                  </Text>
                </View>
                <View />
              </View>
              <View className="-mt-7">
                <View className="space-y-1 p-5">
                  <Text className="text-gray-700 font-semibold text-lg ml-2">
                    Description
                  </Text>
                  <TextInput
                    ref={inputRef}
                    className="p-3 text-gray-700 rounded-2xl mb-2 text-base"
                    style={{ backgroundColor: themeColors.bgWhite(0.6) }}
                    placeholder="E.g. Pizza!"
                    selectionColor={themeColors.bgBlack}
                    defaultValue={description.current}
                    onChangeText={(text) => {
                      description.current = text;
                    }}
                  />
                  <Text className="text-gray-700 font-semibold text-lg ml-2">
                    Amount
                  </Text>
                  <View
                    className="flex-row items-center rounded-2xl p-1 overflow-visible"
                    style={{
                      backgroundColor: themeColors.bgWhite(0.6),
                      height: 50,
                    }}
                  >
                    <TextInput
                      keyboardType="numeric"
                      placeholder="E.g. €12.34"
                      className="px-2 flex-1 text-gray-700 text-base"
                      selectionColor={themeColors.bgBlack}
                      defaultValue={amount.current}
                      onChangeText={(text) => {
                        amount.current = text.split(" ").join("");
                      }}
                    />
                    <Pressable
                      className="rounded-2xl pr-0.5"
                      style={{ backgroundColor: themeColors.bgBlack }}
                    >
                      <IconButton
                        size={20}
                        icon="currency-eur"
                        color={themeColors.bgGrey}
                      />
                    </Pressable>
                  </View>
                </View>
                {item ? (
                  <View className="flex-row justify-between items-center">
                    <View className="flex-1">
                      <TouchableOpacity
                        className="py-5 px-5 mt-1"
                        style={{
                          backgroundColor: themeColors.chartBlue,
                          borderRightColor: themeColors.bgGrey,
                          borderRightWidth: 1,
                          borderTopLeftRadius: 24,
                        }}
                        onPress={() => {
                          updateExpense();
                          setModalVisible(false);
                        }}
                      >
                        <Text className="text-gray-200 font-bold text-center text-xl">
                          Edit
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View className="flex-1">
                      <TouchableOpacity
                        className="py-5 px-5 mt-1"
                        style={{
                          backgroundColor: themeColors.bgBlack,
                          borderLeftColor: themeColors.bgGrey,
                          borderLeftWidth: 1,
                          borderTopRightRadius: 24,
                        }}
                        onPress={() => {
                          deleteExpense();
                          setModalVisible(false);
                        }}
                      >
                        <Text className="text-gray-200 font-bold text-center text-xl">
                          Delete
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <TouchableOpacity
                    className="py-5 mt-2"
                    style={{
                      backgroundColor: themeColors.chartBlue,
                      borderTopRightRadius: 24,
                      borderTopLeftRadius: 24,
                    }}
                    onPress={() => {
                      addExpense();
                      setModalVisible(false);
                    }}
                  >
                    <Text className="text-gray-200 font-bold text-center text-xl">
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
