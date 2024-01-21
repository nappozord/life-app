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
  SlideInLeft,
  SlideInRight,
  SlideOutDown,
  SlideOutLeft,
  SlideOutRight,
} from "react-native-reanimated";
import { ActivityIndicator, IconButton } from "react-native-paper";
import { themeColors } from "~/theme";

import { confirmSignUp, autoSignIn, resendSignUpCode } from "aws-amplify/auth";

const height = Dimensions.get("window").height;

export default function ConfirmCodeComponent({
  setConfirmCode,
  setSignup,
  setLogin,
  email,
  setFinalSetup,
}) {
  const code = useRef("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorResend, setErrorResend] = useState(null);
  const [loadingResend, setLoadingResend] = useState(null);

  function handleConfirmation() {
    setError(null);
    setLoading(true);
    confirmSignUp({ username: email.current, confirmationCode: code.current })
      .then((r) => {
        autoSignIn()
          .then((r) => {
            setConfirmCode(false);
            setFinalSetup(true);
            setLoading(false);
          })
          .catch((e) => {
            setLoading(false);
            setError(e.message);
          });
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
          <View className="bg-gray-300 rounded-full p-2">
            <IconButton
              icon={"email-newsletter"}
              color={themeColors.bgBlack(1)}
              size={72}
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
        <View className="space-y-2">
          <Text className="text-gray-300 ml-2">Email Addres</Text>
          <TextInput
            className="p-3 text-gray-950 rounded-2xl mb-3"
            style={{ backgroundColor: themeColors.bgWhite(0.6) }}
            placeholder="Enter Email"
            defaultValue={email ? email.current : null}
            selectionColor={themeColors.bgBlack(1)}
            readOnly={email.current ? true : false}
            onChangeText={(text) => {
              email.current = text;
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
          <Text className="mb-3 text-gray-800 ml-1 text-base font-semibold">
            {"Check your email for the OTP code we sent you!"}
          </Text>
          {!loadingResend ? (
            <TouchableOpacity
              className="flex items-end mr-4"
              onPress={() => {
                setErrorResend(null);
                resendSignUpCode({ username: email.current })
                  .then((r) => {
                    setLoadingResend(true);
                  })
                  .catch((e) => {
                    setErrorResend(e.message);
                  });
              }}
            >
              <Text className="text-gray-200 underline">Resend Code</Text>
            </TouchableOpacity>
          ) : (
            <View className="mr-4 mb-3 items-end">
              <Text className="text-green-200">
                A new OTP code has been sent to your email
              </Text>
            </View>
          )}
          {errorResend ? (
            <View className="mr-4 mb-3 items-end">
              <Text className="text-red-800">{errorResend}</Text>
            </View>
          ) : null}
          <View className="flex items-end mb-7 mr-4">
            <View className="flex-row">
              <Text className="text-gray-200">Don't have a code? </Text>
              <TouchableOpacity
                onPress={() => {
                  setSignup(true);
                  setConfirmCode(false);
                }}
              >
                <Text className="text-gray-200 underline">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            className="py-3 rounded-2xl"
            style={{ backgroundColor: themeColors.chartBlue(1) }}
            onPress={() => {
              handleConfirmation();
            }}
          >
            {!loading ? (
              <Text className="text-gray-200 font-bold text-center text-xl">
                Confirm Code
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
            Already have an account?
          </Text>
          <Text> </Text>
          <TouchableOpacity
            onPress={() => {
              setLogin(true);
              setConfirmCode(false);
            }}
          >
            <Text className="font-bold underline text-gray-300">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}
