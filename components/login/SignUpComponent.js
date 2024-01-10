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
import { IconButton } from "react-native-paper";
import { themeColors } from "../../theme";
import { useNavigation } from "@react-navigation/native";

const height = Dimensions.get("window").height;

export default function SignUpComponent(props) {
  const navigation = useNavigation();

  return (
    <Animated.View
      entering={SlideInDown.duration(400).easing(Easing.ease)}
      exiting={SlideOutDown.duration(400).easing(Easing.ease)}
      className="flex-1 bg-transparent pt-16 w-full absolute"
      style={{
        top: height / 5,
        height: height / 0.5,
      }}
    >
      <View className="absolute w-full mt-2 z-10">
        <View className="flex-row justify-center">
          <View className="bg-gray-300 rounded-full">
            <IconButton
              icon={"account-supervisor-circle"}
              color={themeColors.bgBlack}
              size={80}
            />
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
        className="flex-1 px-8 pt-16"
        style={{
          backgroundColor: themeColors.bgWhite(0.3),
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}
      >
        <View className="form space-y-2">
          <Text className="text-gray-300 ml-1">Username</Text>
          <TextInput
            className="p-3 text-gray-950 rounded-2xl"
            style={{ backgroundColor: themeColors.bgWhite(0.6) }}
            placeholder="Enter Username"
            selectionColor={themeColors.bgBlack}
          />
          <Text className="text-gray-300 ml-1">Email Addres</Text>
          <TextInput
            className="p-3 text-gray-950 rounded-2xl"
            style={{ backgroundColor: themeColors.bgWhite(0.6) }}
            placeholder="Enter Email"
            selectionColor={themeColors.bgBlack}
          />
          <Text className="text-gray-300 ml-1">Password</Text>
          <TextInput
            className="p-3 text-gray-950 rounded-2xl mb-14"
            style={{ backgroundColor: themeColors.bgWhite(0.6) }}
            placeholder="Enter Password"
            secureTextEntry
            selectionColor={themeColors.bgBlack}
          />
          <TouchableOpacity
            className="py-3 rounded-2xl"
            style={{ backgroundColor: themeColors.chartBlue }}
            onPress={() => {
              navigation.push("Home");
            }}
          >
            <Text className="text-gray-200 font-bold text-center text-xl">
              Sign Up
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
            Already have an account?
          </Text>
          <Text> </Text>
          <TouchableOpacity
            onPress={() => {
              props.setLogin(true);
              props.setSignup(false);
            }}
          >
            <Text className="font-bold underline text-gray-300">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}
