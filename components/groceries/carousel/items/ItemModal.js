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
import { useDispatch, useSelector } from "react-redux";
import { getItem, addItem, deleteItem, updateItem } from "~/app/itemsSlice";

export default function ItemModal({ itemId, modalVisible, setModalVisible }) {
  const item = useSelector((state) => getItem(state, itemId));

  const dispatch = useDispatch();

  const inputRef = useRef(null);

  const name = useRef(item ? item.title.toString() : null);
  const cost = useRef(item ? parseFloat(item.cost).toFixed(2) : null);
  const duration = useRef(item ? item.duration.toString() : "1");

  function handleAddItem() {
    dispatch(
      addItem({
        cost: cost.current,
        duration: duration.current,
        name: name.current,
      })
    );
  }

  function handleUpdateItem() {
    dispatch(
      updateItem({
        itemId,
        cost: cost.current,
        duration: duration.current,
        name: name.current,
      })
    );
  }

  function handleDeleteItem() {
    dispatch(deleteItem(itemId));
  }

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
          item ? null : inputRef.current.focus();
        }, 10);
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
                  className="px-4 py-3 rounded-3xl -mt-16 items-center"
                  style={{
                    backgroundColor: themeColors.background,
                    borderColor: themeColors.onSecondary,
                    borderWidth: 5,
                  }}
                >
                  {item ? (
                    <>
                      <Text
                        className="text-sm mb-1 "
                        style={{ color: themeColors.onBackground }}
                      >
                        You have:
                      </Text>
                      <View className="flex-row items-center">
                        <Text
                          className=" text-5xl font-semibold "
                          style={{ color: themeColors.onBackground }}
                        >
                          {Math.ceil(item.stock)}
                        </Text>
                      </View>
                      <Text
                        className="text-xl font-semibold -mt-2 "
                        style={{ color: themeColors.onBackground }}
                      >
                        {item.title}
                      </Text>
                    </>
                  ) : (
                    <>
                      <View className="flex-row">
                        <IconButton
                          icon={"plus"}
                          color={themeColors.onBackground}
                          size={30}
                          className="-mr-2"
                        />
                        <IconButton
                          icon={"coffee-maker"}
                          color={themeColors.onBackground}
                          size={30}
                          className="-ml-2"
                        />
                      </View>
                      <Text
                        className="text-xl font-semibold -mt-4 mb-4"
                        style={{ color: themeColors.onBackground }}
                      >
                        General Item
                      </Text>
                    </>
                  )}
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
                    placeholder="E.g. Dish Soap!"
                    selectionColor={themeColors.background}
                    defaultValue={name.current}
                    onChangeText={(text) => {
                      name.current = text;
                    }}
                  />
                  <View className="flex-row justify-between items-center space-x-4 mb-2">
                    <View className="flex-1 space-y-1">
                      <Text
                        className="font-semibold text-lg ml-2"
                        style={{ color: themeColors.onSecondaryContainer }}
                      >
                        Cost
                      </Text>
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
                          defaultValue={cost.current}
                          onChangeText={(text) => {
                            cost.current = text;
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
                    <View className="flex-1 space-y-1">
                      <Text
                        className="font-semibold text-lg ml-2"
                        style={{ color: themeColors.onSecondaryContainer }}
                      >
                        Duration (weeks)
                      </Text>
                      <View
                        className="flex-row items-center rounded-2xl p-1 overflow-visible"
                        style={{
                          backgroundColor: themeColors.onSecondaryContainer,
                          height: 50,
                        }}
                      >
                        <TextInput
                          keyboardType="numeric"
                          placeholder="E.g. x3"
                          className="px-2 flex-1  text-base"
                          style={{ color: themeColors.background }}
                          selectionColor={themeColors.background}
                          defaultValue={duration.current}
                          onChangeText={(text) => {
                            if (text === "" || text === null)
                              duration.current = 1;
                            else duration.current = text.split(" ").join("");
                          }}
                        />
                        <Pressable
                          className="rounded-2xl pr-0.5"
                          style={{ backgroundColor: themeColors.background }}
                        >
                          <IconButton
                            size={20}
                            icon="clock-outline"
                            color={themeColors.onSecondaryContainer}
                          />
                        </Pressable>
                      </View>
                    </View>
                  </View>
                  {item ? (
                    <View className="flex-row justify-between items-center">
                      <View className="flex-row items-center">
                        <IconButton
                          className="p-0 m-0"
                          icon="update"
                          size={20}
                          color={themeColors.onSecondaryContainer}
                        />
                        <Text
                          className="text-xs"
                          style={{ color: themeColors.onSecondaryContainer }}
                        >
                          {"Last update: " +
                            (item && item.lastUpdate
                              ? item.lastUpdate
                              : new Date().toLocaleDateString("it-IT"))}
                        </Text>
                      </View>

                      <TouchableOpacity className="flex-row items-center">
                        <Text
                          className="text-sm font-semibold"
                          style={{ color: themeColors.primary }}
                        >
                          Check history
                        </Text>
                        <IconButton
                          className="p-0 m-0"
                          icon="clipboard-text-clock-outline"
                          size={20}
                          color={themeColors.primary}
                        />
                      </TouchableOpacity>
                    </View>
                  ) : null}
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
                          handleUpdateItem();
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
                          handleDeleteItem();
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
                      handleAddItem();
                      setModalVisible(false);
                    }}
                  >
                    <Text
                      className="font-bold text-center text-xl"
                      style={{ color: themeColors.onPrimary }}
                    >
                      Add General Item
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
