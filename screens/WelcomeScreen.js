import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import LottieView from "lottie-react-native";
import Animated, {
  Easing,
  SlideInLeft,
  SlideOutRight,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import { themeColors } from "../theme";

import LoginComponent from "../components/login/LoginComponent";
import SignUpComponent from "../components/login/SignUpComponent";

const height = Dimensions.get("window").height;

export default function WelcomeScreen() {
  [login, setLogin] = useState(false);
  [signup, setSignup] = useState(false);

  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <Image
        className="absolute h-full w-full"
        source={require("../assets/bg.png")}
        blurRadius={80}
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
            key={login ? "login" : signup ? "signup" : "welcome"}
            entering={SlideInLeft.duration(400).easing(Easing.ease)}
            exiting={SlideOutRight.duration(400).easing(Easing.ease)}
            className="text-gray-200 font-bold text-4xl text-center"
          >
            {login ? "Login" : signup ? "Sign Up" : "Welcome!"}
          </Animated.Text>

          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            className="flex-row justify-center"
          >
            <LottieView
              source={require("../assets/welcome.json")}
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
              style={{backgroundColor: themeColors.chartBlue}}
              onPress={() => setSignup(true)}
            >
              <Text className="text-xl font-bold text-center text-gray-200">
                Sign Up
              </Text>
            </TouchableOpacity>
            <View className="flex-row justify-center">
              <Text className="text-gray-300 font-semibold">
                Already have an account?
              </Text>
              <Text> </Text>
              <TouchableOpacity onPress={() => setLogin(true)}>
                <Text className="font-bold underline text-gray-300">Login</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Pressable>
      {login ? (
        <LoginComponent setSignup={setSignup} setLogin={setLogin} />
      ) : (
        <></>
      )}
      {signup ? (
        <SignUpComponent setLogin={setLogin} setSignup={setSignup} />
      ) : (
        <></>
      )}
    </View>
  );
}
