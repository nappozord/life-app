import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  Touchable,
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

import { confirmResetPassword, resetPassword } from "aws-amplify/auth";

const height = Dimensions.get("window").height;

export default function PassRecoveryComponent({
  setPassRecovery,
  setLogin,
}) {
  const navigation = useNavigation();
  const code = useRef("");
  const email = useRef("");
  const password = useRef("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [emailSent, setEmailSent] = useState(false);

  function handleEmailConfirmation() {
    setLoading(true);
    setError(false);
    resetPassword({ username: email.current })
      .then((r) => {
        setLoading(false);
        setEmailSent(true);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }

  function handleCodeConfirmation(){
    setLoading(true);
    setError(false);
    confirmResetPassword({username: email.current, confirmationCode: code.current, newPassword: password.current})
    .then(r => {
      setLoading(false);
      setLogin(true);
      setPassRecovery(false);
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
          <View className="bg-gray-300 rounded-full p-2">
            <IconButton
              icon={"lock-reset"}
              color={themeColors.bgBlack(1)}
              size={72}
            />
          </View>
        </View>
      </View>
      <Image
        className="absolute w-full mt-16"
        source={require("~/assets/bg.png")}
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
        <View className="space-y-2">
          <Text className="text-gray-300 ml-2">Email Addres</Text>
          <TextInput
            className={"p-3 text-gray-950 rounded-2xl " + (emailSent ? "mb-3" : "mb-7")}
            style={{ backgroundColor: themeColors.bgWhite(0.6) }}
            placeholder="Enter Email"
            readOnly={emailSent}
            selectionColor={themeColors.bgBlack(1)}
            onChangeText={(text) => {
              email.current = text;
            }}
          />
          {emailSent ? (
            <View className="space-y-2">
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
              <Text className="text-gray-300 ml-1">OTP Code</Text>
              <TextInput
                keyboardType="numeric"
                className="p-3 text-gray-950 rounded-2xl mb-0"
                style={{ backgroundColor: themeColors.bgWhite(0.6) }}
                placeholder="Enter Code"
                selectionColor={themeColors.bgBlack(1)}
                onChangeText={(text) => {
                  code.current = text;
                }}
              />
              <Text className="mb-7 text-gray-800 ml-1 text-base font-semibold">
                {"Check your email for the OTP code we sent you!"}
              </Text>
            </View>
          ) : null}
          <TouchableOpacity
            className="py-3 rounded-2xl"
            style={{ backgroundColor: themeColors.chartBlue(1) }}
            onPress={() => {
              !emailSent ? handleEmailConfirmation() : handleCodeConfirmation();
            }}
          >
            {!loading ? (
              <Text className="text-gray-200 font-bold text-center text-xl">
                {!emailSent ? "Confirm email and send code" : "Confirm Code"}
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
        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-300 font-semibold">
            Or you can choose to
          </Text>
          <Text> </Text>
          <TouchableOpacity
            onPress={() => {
              setLogin(true);
              setPassRecovery(false);
            }}
          >
            <Text className="font-bold underline text-gray-300">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}
