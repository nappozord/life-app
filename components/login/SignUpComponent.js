import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useRef, useState } from "react";
import Animated, {
  Easing,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";
import { ActivityIndicator, IconButton } from "react-native-paper";
import { themeColors } from "~/theme";
import { useNavigation } from "@react-navigation/native";

import { signUp, signInWithRedirect } from "aws-amplify/auth";

const height = Dimensions.get("window").height;

export default function SignUpComponent({
  setConfirmCode,
  setSignup,
  setLogin,
  email,
}) {
  const navigation = useNavigation();
  const password = useRef("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleSignUp() {
    setError(null);
    setLoading(true);
    signUp({
      username: email.current,
      password: password.current,
      options: {
        autoSignIn: true,
      },
    })
      .then((r) => {
        setConfirmCode(true);
        setSignup(false);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setError(e.message);
      });
  }

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
          <View
            className="rounded-full"
            style={{ backgroundColor: themeColors.onBackground }}
          >
            <IconButton
              icon={"account-supervisor-circle"}
              color={themeColors.background}
              size={80}
            />
          </View>
        </View>
      </View>
      <Image
        className="absolute w-full mt-16"
        source={require("~/assets/splash.png")}
        //blurRadius={80}
        style={{
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}
      ></Image>
      <View
        className="flex-1 px-8 pt-20"
        style={{
          backgroundColor: themeColors.onSecondary,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}
      >
        <View className="space-y-2">
          <Text
            className="ml-2"
            style={{ color: themeColors.onSecondaryContainer }}
          >
            Email Addres
          </Text>
          <TextInput
            className="p-3 text-gray-950 rounded-2xl mb-3"
            style={{
              backgroundColor: themeColors.onSecondaryContainer,
              color: themeColors.background,
            }}
            placeholder="Enter Email"
            selectionColor={themeColors.background}
            onChangeText={(text) => {
              email.current = text;
            }}
          />
          <Text
            className="ml-2"
            style={{ color: themeColors.onSecondaryContainer }}
          >
            Password
          </Text>
          <TextInput
            className="p-3 rounded-2xl mb-3"
            style={{
              backgroundColor: themeColors.onSecondaryContainer,
              color: themeColors.background,
            }}
            placeholder="Enter Password"
            secureTextEntry
            selectionColor={themeColors.background}
            onChangeText={(text) => {
              password.current = text;
            }}
          />
          <TouchableOpacity
            className="flex items-end mb-7 mr-4"
            onPress={() => {
              setConfirmCode(true);
              setSignup(false);
            }}
          >
            <Text
              className="underline"
              style={{ color: themeColors.onSecondaryContainer }}
            >
              Already have an OTP?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="py-3 rounded-2xl"
            style={{ backgroundColor: themeColors.primary }}
            onPress={() => {
              handleSignUp();
            }}
          >
            {!loading ? (
              <Text
                className="font-bold text-center text-xl"
                style={{ color: themeColors.onPrimary }}
              >
                Sign Up
              </Text>
            ) : (
              <ActivityIndicator
                className="py-0.5"
                animating={true}
                color={themeColors.onPrimary}
              />
            )}
          </TouchableOpacity>
          {error ? (
            <Text
              className="ml-1 text-base"
              style={{ color: themeColors.errorContainer }}
            >
              {error}
            </Text>
          ) : null}
        </View>
        <Text
          className="text-xl font-bold text-center py-5"
          style={{ color: themeColors.onSecondaryContainer }}
        >
          Or
        </Text>
        <View className="flex-row justify-center">
          <TouchableOpacity
            className="p-2 rounded-3xl w-full items-center"
            style={{ backgroundColor: themeColors.secondary }}
            onPress={() => {
              signInWithRedirect({ provider: "Google" })
                .then((r) => {
                  navigation.push("Welcome");
                })
                .catch((e) => {
                  setError(e.message);
                });
            }}
          >
            <Image
              source={require("~/assets/google.png")}
              className="w-10 h-10"
            />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-7">
          <Text
            className="font-semibold"
            style={{ color: themeColors.onSecondaryContainer }}
          >
            Already have an account?
          </Text>
          <Text> </Text>
          <TouchableOpacity
            onPress={() => {
              setLogin(true);
              setSignup(false);
            }}
          >
            <Text
              className="font-bold underline "
              style={{
                color: themeColors.primary,
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}
