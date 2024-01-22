import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import LottieView from "lottie-react-native";
import Animated, {
  Easing,
  SlideInLeft,
  SlideOutRight,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "~/theme";

import LoginComponent from "~/components/login/LoginComponent";
import SignUpComponent from "~/components/login/SignUpComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getCurrentUser, autoSignIn } from "@aws-amplify/auth";
import ConfirmCodeComponent from "../components/login/ConfirmCodeComponent";
import { getUser } from "~/api/apiManager";
import FinalSetupComponent from "../components/login/FinalSetupComponent";
import PassRecoveryComponent from "../components/login/PassRecoveryComponent";

import { restoreBackup } from "~/api/apiManager";
import { updateUser } from "../api/apiManager";

const height = Dimensions.get("window").height;

export default function WelcomeScreen() {
  const navigation = useNavigation();
  [login, setLogin] = useState(false);
  [signup, setSignup] = useState(false);
  [confirmCode, setConfirmCode] = useState(false);
  [finalSetup, setFinalSetup] = useState(false);
  [passRecovery, setPassRecovery] = useState(false);
  const user = useRef({});
  const email = useRef("");
  const pageTitle = login
    ? "Login"
    : signup
    ? "Sign Up"
    : confirmCode
    ? "Confirm Email"
    : finalSetup
    ? "One Last Step"
    : passRecovery
    ? "Password Recovery"
    : "Welcome to Life!";

  const dev = false;
  const reset = false;

  useEffect(() => {
    if (dev) {
      updateUser({
        userId: "abc",
        username: "Nappozord",
        balance: 2000,
      }).then(() => navigation.push("Home"));
    }

    if (reset) {
      updateUser(defaultUser);
      restoreBackup("January, 2024");
      restoreBackup("December, 2023");
      AsyncStorage.clear();
      AsyncStorage.removeItem("groceries");
      AsyncStorage.removeItem("defaultCategories");
    }
    AsyncStorage.getAllKeys().then((r) => console.log(r));

    getCurrentUser()
      .then((r) => {
        if (r && r.userId) {
          getUser().then((u) => {
            if (u && u.userId === r.userId) {
              navigation.push("Home");
            } else {
              user.current = {
                userId: r.userId,
              };
              setFinalSetup(true);
            }
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <Image
        className="absolute h-full w-full"
        source={require("~/assets/splash.png")}
        //blurRadius={80}
      />
      <Pressable
        className="flex-1 absolute w-full"
        onPress={() => {
          setLogin(false);
          setSignup(false);
        }}
        style={{ top: 0, height: height }}
      >
        <View className="flex-1 justify-around my-4 mt-16">
          <Animated.Text
            key={pageTitle}
            entering={SlideInLeft.duration(400).easing(Easing.ease)}
            exiting={SlideOutRight.duration(400).easing(Easing.ease)}
            className="font-bold text-4xl text-center"
            style={{ color: themeColors.onBackground }}
          >
            {pageTitle}
          </Animated.Text>
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            className="flex-row justify-center"
          >
            <LottieView
              source={require("~/assets/welcome.json")}
              autoPlay
              loop
              style={{ width: 350, height: 350 }}
            />
          </Animated.View>
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            className="space-y-4"
          >
            <TouchableOpacity
              className="py-3 mx-7 rounded-xl"
              style={{ backgroundColor: themeColors.primary }}
              onPress={() => setSignup(true)}
            >
              <Text
                className="text-xl font-bold text-center"
                style={{ color: themeColors.onPrimary }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
            <View className="flex-row justify-center">
              <Text
                className="font-semibold"
                style={{ color: themeColors.onBackground }}
              >
                Already have an account?
              </Text>
              <Text> </Text>
              <TouchableOpacity onPress={() => setLogin(true)}>
                <Text
                  className="font-bold underline"
                  style={{ color: themeColors.primary }}
                >
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Pressable>
      {login ? (
        <LoginComponent
          setFinalSetup={setFinalSetup}
          setSignup={setSignup}
          setLogin={setLogin}
          setPassRecovery={setPassRecovery}
        />
      ) : null}
      {signup ? (
        <SignUpComponent
          email={email}
          setLogin={setLogin}
          setSignup={setSignup}
          setConfirmCode={setConfirmCode}
        />
      ) : null}
      {confirmCode ? (
        <ConfirmCodeComponent
          setFinalSetup={setFinalSetup}
          email={email}
          setLogin={setLogin}
          setSignup={setSignup}
          setConfirmCode={setConfirmCode}
        />
      ) : null}
      {finalSetup ? (
        <FinalSetupComponent
          user={user}
          setFinalSetup={setFinalSetup}
          setLogin={setLogin}
        />
      ) : null}
      {passRecovery ? (
        <PassRecoveryComponent
          setPassRecovery={setPassRecovery}
          setLogin={setLogin}
        />
      ) : null}
    </View>
  );
}
