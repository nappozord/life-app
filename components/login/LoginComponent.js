import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useState, useRef } from "react";
import Animated, {
  Easing,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";
import { ActivityIndicator, IconButton } from "react-native-paper";
import { themeColors } from "~/theme";
import { useNavigation } from "@react-navigation/native";
import { getUser } from "~/api/apiManager";

import { signIn, signInWithRedirect } from "aws-amplify/auth";

const height = Dimensions.get("window").height;

export default function LoginComponent({
  setSignup,
  setLogin,
  setFinalSetup,
  setPassRecovery,
}) {
  const navigation = useNavigation();
  const email = useRef("");
  const password = useRef("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleSignIn() {
    setError(null);
    setLoading(true);
    signIn({
      username: email.current,
      password: password.current,
    })
      .then((r) => {
        setFinalSetup(true);
        setLogin(false);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
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
          <View className="bg-gray-300 rounded-full">
            <IconButton
              icon={"account-circle"}
              color={themeColors.bgBlack(1)}
              size={80}
            />
          </View>
        </View>
      </View>
      <Image
        className="absolute w-full mt-16"
        source={require("~/assets/splash.png")}
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
            selectionColor={themeColors.bgBlack(1)}
            onChangeText={(text) => {
              email.current = text;
            }}
          />
          <Text className="text-gray-300 ml-2">Password</Text>
          <TextInput
            className="p-3 text-gray-950 rounded-2xl mb-3"
            style={{ backgroundColor: themeColors.bgWhite(0.6) }}
            placeholder="Enter Password"
            secureTextEntry
            selectionColor={themeColors.bgBlack(1)}
            onChangeText={(text) => {
              password.current = text;
            }}
          />
          <TouchableOpacity
            className="flex items-end mb-7 mr-4"
            onPress={() => {
              setPassRecovery(true);
              setLogin(false);
            }}
          >
            <Text className="text-gray-200 underline">Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="py-3 rounded-2xl"
            style={{ backgroundColor: themeColors.chartBlue(1) }}
            onPress={() => handleSignIn()}
          >
            {!loading ? (
              <Text className="text-gray-200 font-bold text-center text-xl">
                Login
              </Text>
            ) : (
              <ActivityIndicator
                className="py-0.5"
                animating={true}
                color={themeColors.bgWhite(0.8)}
              />
            )}
          </TouchableOpacity>
          {error ? (
            <Text className="text-red-800 ml-1 text-base">{error}</Text>
          ) : null}
        </View>
        <Text className="text-xl text-gray-300 font-bold text-center py-5">
          Or
        </Text>
        <View className="flex-row justify-center">
          <TouchableOpacity
            className="p-2 rounded-3xl w-full items-center"
            style={{ backgroundColor: themeColors.bgWhite(0.7) }}
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
          <Text className="text-gray-300 font-semibold">
            Don't have an account?
          </Text>
          <Text> </Text>
          <TouchableOpacity
            onPress={() => {
              setLogin(false);
              setSignup(true);
            }}
          >
            <Text className="font-bold underline text-gray-300">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}
