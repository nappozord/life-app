import {
  View,
  Text,
  TextInput,
  Image,
  Platform,
  Modal,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import { themeColors } from "../../theme";
import { Checkbox, IconButton } from "react-native-paper";
import Animated, { SlideInDown } from "react-native-reanimated";
import {
  addDefaultCategory,
  deleteDefaultCategory,
  updateDeafultCategory,
} from "../../api/apiManager";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditCategoryModalComponent({
  item,
  categories,
  setCategories,
  modalVisible,
  setModalVisible,
}) {
  const description = useRef(item ? item.title.toString() : null);
  const [icon, setIcon] = useState(
    item ? item.icon.toString() : "card-outline"
  );
  const inputRef = React.useRef(null);

  const [checked, setChecked] = React.useState(false);

  const addCategory = () => {
    AsyncStorage.getItem("defaultCategories").then((r) => {
      const result = JSON.parse(r);
      const index = result[result.length - 1].id + 1;

      const category = {
        id: index > categories.length ? index : categories.length,
        title: description.current,
        real: 0,
        forecast: 0,
        icon: icon,
        expenses: [],
        income: false,
        index: categories.length,
      };

      categories.push(category);

      if (checked) {
        addDefaultCategory(category);
      }

      setCategories([...categories]);
    });
  };

  const deleteCategory = () => {
    categories = categories.filter((obj) => obj.id !== item.id);

    if (checked) {
      deleteDefaultCategory(item);
    }

    setCategories([...categories]);
  };

  const updateCategory = () => {
    categories.find((obj) => obj.id === item.id).title = description.current;
    categories.find((obj) => obj.id === item.id).icon = icon;

    updateDeafultCategory(categories.find((obj) => obj.id === item.id));

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
        source={require("../../assets/bg.png")}
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
                      icon="animation-outline"
                      color={themeColors.bgGrey}
                      size={30}
                      className="-ml-2"
                    />
                  </View>
                  <Text className="text-xl font-semibold -mt-4 mb-4 text-gray-400">
                    Category
                  </Text>
                </View>
                <View />
              </View>
              <View className="-mt-7">
                <View className="space-y-1 p-5">
                  <Text className="text-gray-700 font-semibold text-lg ml-2">
                    Name
                  </Text>
                  <TextInput
                    ref={inputRef}
                    className="p-3 text-gray-700 rounded-2xl mb-2 text-base"
                    style={{ backgroundColor: themeColors.bgWhite(0.6) }}
                    placeholder="E.g. New Awesome Category!"
                    selectionColor={themeColors.bgBlack}
                    defaultValue={description.current}
                    onChangeText={(text) => {
                      description.current = text;
                    }}
                  />
                  <Text className="text-gray-700 font-semibold text-lg ml-2">
                    Icon
                  </Text>
                  <View
                    className="flex-row items-center rounded-2xl p-1 mb-4"
                    style={{
                      backgroundColor: themeColors.bgWhite(0.6),
                      height: 50,
                    }}
                  >
                    <TextInput
                      placeholder="E.g. basket"
                      className="px-2 flex-1 text-gray-700 text-base"
                      selectionColor={themeColors.bgBlack}
                      defaultValue={icon}
                      onChangeText={(text) => {
                        setIcon(text.split(" ").join("-").toLowerCase());
                      }}
                    />
                    <Pressable
                      className="rounded-2xl"
                      style={{ backgroundColor: themeColors.bgBlack }}
                    >
                      <IconButton
                        size={20}
                        icon={icon}
                        color={themeColors.bgGrey}
                      />
                    </Pressable>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <View className="flex-1">
                      <Text className="text-lg font-semibold ml-2 text-gray-700">
                        Set as monthly default
                      </Text>
                    </View>
                    <View className="mr-2">
                      <Checkbox
                        color={themeColors.bgBlack}
                        status={checked ? "checked" : "unchecked"}
                        onPress={() => {
                          setChecked(!checked);
                        }}
                      />
                    </View>
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
                          updateCategory();
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
                          deleteCategory();
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
                      addCategory();
                      setModalVisible(false);
                    }}
                  >
                    <Text className="text-gray-200 font-bold text-center text-xl">
                      Add Category
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
