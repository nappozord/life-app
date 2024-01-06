import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import React from "react";
import Animated, {
  Easing,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";
import { ChartPieIcon } from "react-native-heroicons/solid";
import { themeColors } from "../../theme";
import { useNavigation } from "@react-navigation/native";

const height = Dimensions.get("window").height;

export default function LoginComponent(props) {
  const navigation = useNavigation();

  return (
    <Animated.View
      entering={SlideInDown.duration(400).easing(Easing.ease)}
      exiting={SlideOutDown.duration(400).easing(Easing.ease)}
      className="flex-1 bg-transparent pt-16 w-full absolute"
      style={{
        top: height / 4,
        height: height / 0.5,
      }}
    >
      <View className="absolute w-full mt-2 z-10">
        <View className="flex-row justify-center">
          <View className="p-4 bg-gray-300 rounded-full">
            <ChartPieIcon size={80} fill={"black"} />
          </View>
        </View>
      </View>
      <Image
        className="absolute w-full mt-16"
        source={require("../../assets/bg.png")}
        blurRadius={80}
        style={{
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}
      ></Image>
      <View
        className="flex-1 px-8 pt-20"
        style={{
          backgroundColor: themeColors.bgWhite(0.3),
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}
      >
        <View className="form space-y-2">
          <Text className="text-gray-300 ml-2">Email Address</Text>
          <TextInput
            className="p-3 text-gray-950 rounded-2xl mb-3"
            style={{ backgroundColor: themeColors.bgWhite(0.6) }}
            placeholder="Enter Email"
            selectionColor={themeColors.bgBlack}
          />
          <Text className="text-gray-300 ml-2">Password</Text>
          <TextInput
            className="p-3 text-gray-950 rounded-2xl mb-3"
            style={{ backgroundColor: themeColors.bgWhite(0.6) }}
            placeholder="Enter Password"
            secureTextEntry
            selectionColor={themeColors.bgBlack}
          />
          <TouchableOpacity className="flex items-end mb-7 mr-4">
            <Text className="text-gray-200 underline">Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="py-3 rounded-2xl"
            style={{backgroundColor: themeColors.chartBlue}}
            onPress={() => navigation.push("Home")}
          >
            <Text className="text-gray-200 font-bold text-center text-xl">
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-xl text-gray-300 font-bold text-center py-5">
          Or
        </Text>
        <View className="flex-row justify-center">
          <TouchableOpacity
            className="p-2 rounded-3xl w-full items-center"
            style={{ backgroundColor: themeColors.bgWhite(0.7) }}
          >
            <Image
              source={require("../../assets/google.png")}
              className="w-10 h-10"
            />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-300 font-semibold">
            Don't have an account?
          </Text>
          <Text> </Text>
          <TouchableOpacity
            onPress={() => {
              props.setLogin(false);
              props.setSignup(true);
            }}
          >
            <Text className="font-bold underline text-gray-300">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}
