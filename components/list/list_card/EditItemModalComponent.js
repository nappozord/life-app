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

export default function EditItemModalComponent({
  item,
  modalVisible,
  setModalVisible,
  itemIcon,
  itemCategory,
  categories,
  setCategories,
  user,
  setUser,
  date,
}) {
  const inputRef = useRef(null);

  const currentDate = new Date().toDateString();

  const description = useRef(item ? item.title.toString() : null);
  const amount = useRef(item ? parseFloat(item.total).toFixed(2) : null);
  const url = useRef(item ? item.url.toString() : null);

  const addExpense = () => {
    amount.current === null || amount.current === ""
      ? (amount.current = 0)
      : null;
    description.current === null || description.current === ""
      ? (description.current = "New Item")
      : null;
    url.current === null || url.current === "" ? (url.current = "") : null;

    const category = categories.find((obj) => itemCategory === obj.title);

    category.real += parseFloat(amount.current);

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
      url: url.current,
      bought: false,
    });

    setCategories([...categories]);
  };

  const updateExpense = () => {
    deleteExpense();
    addExpense();
  };

  const deleteExpense = () => {
    const category = categories.find((obj) => itemCategory === obj.title);

    category.real -= parseFloat(item.total);

    if (item.bought) category.realBought -= parseFloat(item.total);

    const filteredArray = category.expenses.filter((obj) => obj.id !== item.id);

    let occurrences = 1;

    filteredArray.forEach((obj) => {
      if (obj.title === item.title) {
        obj.occurrence = occurrences;
        occurrences += 1;
      }
    });

    category.expenses = filteredArray;

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
                    Name
                  </Text>
                  <TextInput
                    ref={inputRef}
                    className="p-3 rounded-2xl mb-2 text-base"
                    style={{
                      backgroundColor: themeColors.onSecondaryContainer,
                      color: themeColors.background,
                    }}
                    placeholder="E.g. Guitar!"
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
                    Price
                  </Text>
                  <View className="flex-row items-center mb-2">
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
                  </View>
                  <Text
                    className="font-semibold text-lg ml-2"
                    style={{ color: themeColors.onSecondaryContainer }}
                  >
                    URL
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
                          placeholder="https:\\..."
                          className="px-2 flex-1 text-base"
                          style={{ color: themeColors.background }}
                          selectionColor={themeColors.background}
                          defaultValue={url.current}
                          onChangeText={(text) => {
                            url.current = text.split(" ").join("");
                          }}
                        />
                        <Pressable
                          className="rounded-2xl pr-0.5"
                          style={{ backgroundColor: themeColors.background }}
                        >
                          <IconButton
                            size={20}
                            icon="link"
                            color={themeColors.onBackground}
                          />
                        </Pressable>
                      </View>
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
                          updateExpense();
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
                          deleteExpense();
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
                      addExpense();
                      setModalVisible(false);
                    }}
                  >
                    <Text
                      className="font-bold text-center text-xl"
                      style={{ color: themeColors.onPrimary }}
                    >
                      Add Item
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
