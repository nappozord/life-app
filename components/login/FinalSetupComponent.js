import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef } from "react";
import Animated, {
  Easing,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";
import { IconButton } from "react-native-paper";
import { themeColors } from "~/theme";
import { useNavigation } from "@react-navigation/native";

import {
  signIn,
  signInWithRedirect,
  signOut,
  getCurrentUser,
} from "aws-amplify/auth";
import { updateUser, getUser } from "~/api/apiManager";

const height = Dimensions.get("window").height;

export default function FinalSetupComponent({ user, setFinalSetup, setLogin }) {
  const navigation = useNavigation();
  const username = useRef("");
  const balance = useRef("");

  useEffect(() => {
    if (!user || !user.userId) {
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
        .catch((e) => {
          navigation.push("Welcome");
        });
    }
  }, []);

  function configureUser() {
    if (!username.current || username.current === "") username.current = "User";

    if (!balance.current || balance.current === "") balance.current = "0";

    updateUser({
      ...user.current,
      username: username.current,
      balance: parseFloat(parseFloat(balance.current).toFixed(2)),
    });
    navigation.push("Home");
  }

  function onHowPress() {
    Alert.alert(":)", "Do you accept the terms and conditions?", [
      {
        text: "Yes",
        onPress: () => null,
      },
      {
        text: "Yes",
        onPress: () => null,
      },
    ]);
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
            style={{ color: themeColors.onSecondaryContainer }}
          >
            <IconButton
              icon={"account-cog"}
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
          backgroundColor: themeColors.secondaryContainer,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}
      >
        <View className="form space-y-2">
          <Text
            className="ml-2"
            style={{ color: themeColors.onSecondaryContainer }}
          >
            Username
          </Text>
          <TextInput
            className="p-3 rounded-2xl mb-3"
            style={{
              backgroundColor: themeColors.onSecondaryContainer,
              color: themeColors.background,
            }}
            placeholder="Enter Username"
            selectionColor={themeColors.background}
            onChangeText={(text) => {
              username.current = text;
            }}
          />
          <Text
            className="ml-2"
            style={{ color: themeColors.onSecondaryContainer }}
          >
            Initial Balance
          </Text>
          <View
            className="flex-row items-center rounded-2xl p-1 mb-2"
            style={{
              backgroundColor: themeColors.onSecondaryContainer,
              height: 50,
            }}
          >
            <TextInput
              keyboardType="numeric"
              placeholder="Enter Balance"
              className="px-2 flex-1 "
              style={{ color: themeColors.background }}
              selectionColor={themeColors.background}
              onChangeText={(text) => {
                balance.current = text;
              }}
            />
            <Pressable
              className="rounded-2xl pr-0.5"
              style={{ backgroundColor: themeColors.background }}
            >
              <IconButton
                size={20}
                icon="currency-eur"
                color={themeColors.onBackground}
              />
            </Pressable>
          </View>
          <TouchableOpacity
            className="flex items-end mb-7 mr-4"
            onPress={() => onHowPress()}
          >
            <Text
              className="underline"
              style={{ color: themeColors.onSecondaryContainer }}
            >
              How do we use your data?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="py-3 rounded-2xl"
            style={{ backgroundColor: themeColors.primary }}
            onPress={() => configureUser()}
          >
            <Text
              className="font-bold text-center text-xl"
              style={{ color: themeColors.onPrimary }}
            >
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          className="text-xl font-bold text-center py-5"
          style={{ color: themeColors.onSecondaryContainer }}
        >
          Or
        </Text>
        <View className="flex-row justify-center">
          <TouchableOpacity
            className="py-3 rounded-3xl w-full items-center"
            style={{ backgroundColor: themeColors.secondary }}
            onPress={() => {
              signInWithRedirect({ provider: "Google" });
            }}
          >
            <Text className="font-bold text-center text-xl">Go Back</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-7">
          <Text
            className="font-semibold"
            style={{ color: themeColors.onSecondaryContainer }}
          >
            Want to change account?
          </Text>
          <TouchableOpacity
            onPress={() => {
              signOut().then((r) => {
                setLogin(true);
                setFinalSetup(false);
              });
            }}
          >
            <Text
              className="font-bold underline "
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
