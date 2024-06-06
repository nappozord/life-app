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
} from "react-native";
import React, { useRef, useState } from "react";
import { themeColors } from "~/theme";
import { Checkbox, IconButton } from "react-native-paper";
import Animated, { SlideInDown } from "react-native-reanimated";
import {
  addDefaultCategory,
  deleteDefaultCategory,
  updateDeafultCategory,
} from "~/api/apiCategories";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCategory,
  addCategory,
  deleteCategory,
  getCategory,
  updateActiveCategory,
} from "~/app/categoriesSlice";

export default function EditCategoryModalComponent({
  categoryId,
  modalVisible,
  setModalVisible,
}) {
  const categories = useSelector((state) => state.categories.categories);

  const category = useSelector((state) => getCategory(state, categoryId));

  const dispatch = useDispatch();

  const description = useRef(category ? category.title.toString() : null);
  const [icon, setIcon] = useState(
    category ? category.icon.toString() : "card-outline"
  );
  const inputRef = useRef(null);

  const [checked, setChecked] = useState(false);

  const handleAddCategory = () => {
    const category = {
      id: categories.length,
      title: description.current,
      real: 0,
      forecast: 0,
      icon: icon,
      expenses: [],
      income: false,
    };

    if (checked) addDefaultCategory(category);

    dispatch(addCategory(category));
  };

  const handleDeleteCategory = () => {
    if (checked && category.id !== 1) deleteDefaultCategory(category);

    dispatch(deleteCategory(category.id));
  };

  const handleUpdateCategories = () => {
    updateDeafultCategory(category);

    dispatch(
      updateCategory({ id: category.id, title: description.current, icon })
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
        style={{ opacity: 0.9 }}
      />
      <KeyboardAvoidingView
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
                      icon={category ? "pencil" : "plus"}
                      color={themeColors.onBackground}
                      size={30}
                      className="-mr-2"
                    />
                    <IconButton
                      icon="animation-outline"
                      color={themeColors.onBackground}
                      size={30}
                      className="-ml-2"
                    />
                  </View>
                  <Text
                    className="text-xl font-semibold -mt-4 mb-4"
                    style={{ color: themeColors.onBackground }}
                  >
                    {"Category"}
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
                    placeholder={"E.g. New Awesome Category!"}
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
                    Icon
                  </Text>
                  <View
                    className="flex-row items-center rounded-2xl p-1 mb-4"
                    style={{
                      backgroundColor: themeColors.onSecondaryContainer,
                      height: 50,
                    }}
                  >
                    <TextInput
                      placeholder="E.g. basket"
                      className="px-2 flex-1 text-base"
                      style={{ color: themeColors.background }}
                      selectionColor={themeColors.background}
                      defaultValue={icon}
                      onChangeText={(text) => {
                        setIcon(text.split(" ").join("-").toLowerCase());
                      }}
                    />
                    <Pressable
                      className="rounded-2xl"
                      style={{ backgroundColor: themeColors.background }}
                    >
                      <IconButton
                        size={20}
                        icon={icon}
                        color={themeColors.onBackground}
                      />
                    </Pressable>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <View className="flex-1">
                      <Text
                        className="text-lg font-semibold ml-2 "
                        style={{ color: themeColors.onSecondaryContainer }}
                      >
                        Set as monthly default
                      </Text>
                    </View>
                    <View
                      className="mr-2 rounded-3xl"
                      style={{
                        backgroundColor: themeColors.onSecondaryContainer,
                      }}
                    >
                      <Checkbox
                        color={themeColors.secondaryContainer}
                        status={checked ? "checked" : "unchecked"}
                        onPress={() => {
                          setChecked(!checked);
                        }}
                      />
                    </View>
                  </View>
                </View>
                {category ? (
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
                          handleUpdateCategories();
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
                          handleDeleteCategory();
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
                      handleAddCategory();
                      setModalVisible(false);
                    }}
                  >
                    <Text
                      className="font-bold text-center text-xl"
                      style={{ color: themeColors.onPrimary }}
                    >
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
