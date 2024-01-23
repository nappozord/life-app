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
          <View
            className="rounded-full p-2"
            style={{ backgroundColor: themeColors.onBackground }}
          >
            <IconButton
              icon={"email-newsletter"}
              color={themeColors.background}
              size={72}
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
            className="p-3 rounded-2xl mb-3"
            style={{
              backgroundColor: themeColors.onSecondaryContainer,
              color: themeColors.background,
            }}
            placeholder="Enter Email"
            defaultValue={email ? email.current : null}
            selectionColor={themeColors.background}
            readOnly={email.current ? true : false}
            onChangeText={(text) => {
              email.current = text;
            }}
          />
          <Text
            className="ml-1"
            style={{ color: themeColors.onSecondaryContainer }}
          >
            OTP Code
          </Text>
          <TextInput
            keyboardType="numeric"
            className="p-3 rounded-2xl mb-0"
            style={{
              backgroundColor: themeColors.onSecondaryContainer,
              color: themeColors.background,
            }}
            placeholder="Enter Code"
            selectionColor={themeColors.background}
            onChangeText={(text) => {
              code.current = text;
            }}
          />
          <Text
            className="mb-3 ml-1 text-base"
            style={{ color: themeColors.onSecondaryContainer }}
          >
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
              <Text
                className="underline"
                style={{ color: themeColors.primary }}
              >
                Resend Code
              </Text>
            </TouchableOpacity>
          ) : (
            <View className="mr-4 mb-3 items-end">
              <Text style={{ color: themeColors.onSecondaryContainer }}>
                A new OTP code has been sent to your email
              </Text>
            </View>
          )}
          {errorResend ? (
            <View className="mr-4 mb-3 items-end">
              <Text style={{ color: themeColors.errorContainer }}>
                {errorResend}
              </Text>
            </View>
          ) : null}
          <View className="flex items-end mb-7 mr-4">
            <View className="flex-row">
              <Text style={{ color: themeColors.onSecondaryContainer }}>
                Don't have a code?{" "}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setSignup(true);
                  setConfirmCode(false);
                }}
              >
                <Text
                  className="underline"
                  style={{ color: themeColors.primary }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            className="py-3 rounded-2xl"
            style={{ backgroundColor: themeColors.primary }}
            onPress={() => {
              handleConfirmation();
            }}
          >
            {!loading ? (
              <Text
                className="font-bold text-center text-xl"
                style={{ color: themeColors.onPrimary }}
              >
                Confirm Code
              </Text>
            ) : (
              <ActivityIndicator
                className="py-0.5"
                animating={true}
                color={themeColors.onSecondaryContainer}
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
              setConfirmCode(false);
            }}
          >
            <Text
              className="font-bold underline"
              style={{ color: themeColors.primary }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}
