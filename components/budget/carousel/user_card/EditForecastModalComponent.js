import {
  View,
  Text,
  TextInput,
  Image,
  Modal,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useRef } from "react";
import { themeColors } from "~/theme";
import { Checkbox, IconButton } from "react-native-paper";
import { setDefaultCategoryForecast } from "~/api/apiManager";
import { KeyboardAvoidingView } from "react-native";
import Animated, {SlideInDown} from "react-native-reanimated";

export default function EditForecastModalComponent({
  item,
  modalVisible,
  setModalVisible,
  categories,
  setCategories,
}) {
  const amount = useRef(Math.abs(item.forecast).toString());
  const [checked, setChecked] = React.useState(false);
  const inputRef = React.useRef(null);

  const updateForecast = () => {
    amount.current === null || amount.current === ""
      ? (amount.current = 0)
      : null;

    const category = categories.find((obj) => item.id === obj.id);

    const prevForecast = parseFloat(category.forecast);

    if (category.income) {
      categories[0].forecast.in =
        parseFloat(categories[0].forecast.in) +
        prevForecast +
        parseFloat(amount.current);
      category.forecast = -parseFloat(amount.current);
    } else {
      categories[0].forecast.out =
        parseFloat(categories[0].forecast.out) -
        prevForecast +
        parseFloat(amount.current);
      category.forecast = parseFloat(amount.current);
    }

    if (checked) {
      setDefaultCategoryForecast(category);
    }

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
        source={require("~/assets/bg.png")}
        blurRadius={80}
        style={{ opacity: 0.95 }}
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
                    backgroundColor: themeColors.bgBlack(1),
                    borderColor: themeColors.bgGrey(1),
                    borderWidth: 5,
                  }}
                >
                  <View className="flex-row">
                    <IconButton
                      icon={"eye-outline"}
                      color={themeColors.bgGrey(1)}
                      size={30}
                      className="-mr-2"
                    />
                    <IconButton
                      icon={item.icon}
                      color={themeColors.bgGrey(1)}
                      size={30}
                      className="-ml-2"
                    />
                  </View>
                  <Text className="text-xl font-semibold -mt-4 mb-4 text-gray-400">
                    {item.title}
                  </Text>
                </View>
                <View />
              </View>
              <View className="-mt-7">
                <View className="space-y-1 p-5">
                  <Text className="text-gray-700 font-semibold text-lg ml-2">
                    Forecast
                  </Text>
                  <View
                    className="flex-row items-center rounded-2xl p-1"
                    style={{
                      backgroundColor: themeColors.bgWhite(0.6),
                      height: 50,
                    }}
                  >
                    <TextInput
                      ref={inputRef}
                      keyboardType="numeric"
                      placeholder="E.g. €120"
                      className="px-2 flex-1 text-gray-700 text-base"
                      selectionColor={themeColors.bgBlack(1)}
                      defaultValue={amount.current}
                      onChangeText={(text) => {
                        amount.current = text.split(" ").join("");
                      }}
                    />
                    <Pressable
                      className="rounded-2xl pr-0.5"
                      style={{ backgroundColor: themeColors.bgBlack(1) }}
                    >
                      <IconButton
                        size={20}
                        icon="currency-eur"
                        color={themeColors.bgGrey(1)}
                      />
                    </Pressable>
                  </View>
                </View>
                <View className="flex-row justify-between items-center mb-5">
                  <View className="flex-1">
                    <Text className="text-lg font-semibold ml-7 text-gray-700">
                      Set as monthly default
                    </Text>
                  </View>
                  <View className="mr-7">
                    <Checkbox
                      color={themeColors.bgBlack(1)}
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
                    backgroundColor: themeColors.chartBlue(1),
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                  }}
                  onPress={() => {
                    updateForecast();
                    setModalVisible(false);
                  }}
                >
                  <Text className="text-gray-200 font-bold text-center text-xl">
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
