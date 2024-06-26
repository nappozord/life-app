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
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native-paper";
import { getCurrentUser } from "@aws-amplify/auth";
import * as LocalAuthentication from "expo-local-authentication";

import { restoreBackup } from "~/api/apiManager";
import { updateUser } from "~/app/userSlice";
import { themeColors } from "~/theme";
import LoginComponent from "~/components/login/LoginComponent";
import SignUpComponent from "~/components/login/SignUpComponent";
import ConfirmCodeComponent from "~/components/login/ConfirmCodeComponent";
import FinalSetupComponent from "~/components/login/FinalSetupComponent";
import PassRecoveryComponent from "~/components/login/PassRecoveryComponent";

const height = Dimensions.get("window").height;

export default function WelcomeScreen() {
  const user = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.user.status);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  const [confirmCode, setConfirmCode] = useState(false);
  const [finalSetup, setFinalSetup] = useState(false);
  const [passRecovery, setPassRecovery] = useState(false);

  const isBiometricSupported = useRef(false);
  const fingerprint = useRef(false);
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

  const checkBiometric = () => {
    if (isBiometricSupported.current && fingerprint.current) {
      LocalAuthentication.authenticateAsync({
        promptMessage: "Login with Biometrics",
        disableDeviceFallback: true,
        cancelLabel: "Cancel",
      })
        .then((b) => {
          if (b.success) {
            navigation.push("Home");
          }
        })
        .catch((e) => console.log(e));
    } else {
      navigation.push("Home");
    }
  };

  useEffect(() => {
    if (status === "succeeded") {
      setTimeout(() => {
        if (dev) {
          if (!user) {
            dispatch(
              updateUser({
                userId: "abc",
                username: "Nappozord",
                balance: 3000,
              })
            );
          }
          AsyncStorage.getAllKeys().then((r) => console.log(r));
          checkBiometric();
        }

        if (reset) {
          //updateUser(defaultUser);
          //restoreBackup("January, 2024");
          //restoreBackup("December, 2023");
          //AsyncStorage.clear();
          //AsyncStorage.removeItem("logs");
          //AsyncStorage.removeItem("defaultCategories");
          //AsyncStorage.removeItem("categories");
          //AsyncStorage.removeItem("lists");
          //AsyncStorage.removeItem("recipes");
          //AsyncStorage.removeItem("meals");
          //AsyncStorage.removeItem("groceries");
        }

        getCurrentUser()
          .then((r) => {
            if (r && r.userId) {
              if (user && user.userId === r.userId) {
                checkBiometric();
              } else {
                setLoading(false);
                dispatch(updateUser({ ...user, userId: r.userId }));
                setFinalSetup(true);
              }
            } else {
              setLoading(false);
            }
          })
          .catch(() => {
            setLoading(false);
          });
      }, 700);
    }
  }, [status]);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      isBiometricSupported.current = compatible;
      const enroll = await LocalAuthentication.isEnrolledAsync();
      if (enroll) {
        fingerprint.current = true;
      }
    })();
  }, []);

  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <Image
        className="absolute h-full w-full"
        source={require("~/assets/splash.png")}
      />
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <View className="absolute">
            <ActivityIndicator
              animating={true}
              color={themeColors.primary}
              size={250}
            />
          </View>
          <Image
            className="absolute h-52 w-52"
            source={require("~/assets/adaptive-icon.png")}
          />
        </View>
      ) : (
        <View>
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
      )}
    </View>
  );
}
