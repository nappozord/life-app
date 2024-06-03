import {
  View,
  Text,
  TextInput,
  Image,
  Modal,
  Pressable,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useRef } from "react";
import { themeColors } from "~/theme";
import { Checkbox, IconButton } from "react-native-paper";
import { KeyboardAvoidingView } from "react-native";
import Animated, { SlideInDown } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { updateForecast, getCategory } from "~/app/categoriesSlice";

export default function EditForecastModalComponent({
  categoryId,
  modalVisible,
  setModalVisible,
}) {
  const category = useSelector((state) => getCategory(state, categoryId));
  const dispatch = useDispatch();

  const amount = useRef(Math.abs(category.forecast).toString());
  const [checked, setChecked] = React.useState(false);
  const inputRef = React.useRef(null);

  const handleUpdateForecast = () => {
    amount.current === null || amount.current === ""
      ? (amount.current = 0)
      : null;

    dispatch(
      updateForecast({ id: category.id, checked, amount: amount.current })
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
                      icon={"eye-outline"}
                      color={themeColors.onBackground}
                      size={30}
                      className="-mr-2"
                    />
                    <IconButton
                      icon={category.icon}
                      color={themeColors.onBackground}
                      size={30}
                      className="-ml-2"
                    />
                  </View>
                  <Text
                    className="text-xl font-semibold -mt-4 mb-4"
                    style={{ color: themeColors.onBackground }}
                  >
                    {category.title}
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
                    Budget
                  </Text>
                  <View
                    className="flex-row items-center rounded-2xl p-1"
                    style={{
                      backgroundColor: themeColors.onSecondaryContainer,
                      height: 50,
                    }}
                  >
                    <TextInput
                      ref={inputRef}
                      keyboardType="numeric"
                      placeholder="E.g. €120"
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
                <View className="flex-row justify-between items-center mb-5">
                  <View className="flex-1">
                    <Text
                      className="text-lg font-semibold ml-7"
                      style={{ color: themeColors.onSecondaryContainer }}
                    >
                      Set as monthly default
                    </Text>
                  </View>
                  <View
                    className="mr-7 rounded-3xl"
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
                <TouchableOpacity
                  className="py-5 mt-2"
                  style={{
                    backgroundColor: themeColors.primary,
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                  }}
                  onPress={() => {
                    handleUpdateForecast();
                    setModalVisible(false);
                  }}
                >
                  <Text
                    className="font-bold text-center text-xl"
                    style={{ color: themeColors.onPrimary }}
                  >
                    Update Forecast
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}
