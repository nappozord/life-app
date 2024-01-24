import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  useWindowDimensions,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { getUser, updateUser } from "~/api/apiManager";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  FadeIn,
} from "react-native-reanimated";
import HeaderComponent from "~/components/header/HeaderComponent";
import { themeColors } from "~/theme";
import { IconButton } from "react-native-paper";
import { signOut } from "aws-amplify/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import FinalSetupComponent from "~/components/login/FinalSetupComponent";

export default function SettingsScreen({ user, setUser }) {
  const dimensions = useWindowDimensions();

  const [finalSetup, setFinalSetup] = useState(false);
  const searchBarHeight = useSharedValue(76);
  const navigation = useNavigation();

  const searchBarAnimatedStyle = useAnimatedStyle(() => ({
    height: searchBarHeight.value,
  }));

  function onSignOutPress() {
    signOut()
      .then(() => navigation.push("Welcome"))
      .catch(() => navigation.push("Welcome"));
  }

  function onDataDelete() {
    Alert.alert(
      "Warning!",
      "You are going to delete all your account data (your account will not be deleted)\nThis action is not reversible.\nDo you want to proceed?",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            AsyncStorage.clear();
            onSignOutPress();
          },
        },
      ]
    );
  }

  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <Image
        className="absolute h-full w-full"
        source={require("~/assets/splash.png")}
        //blurRadius={80}
      />
      {user.userId ? (
        <View className="mt-16 flex-1">
          <Animated.View style={searchBarAnimatedStyle} className="mx-5 mb-10">
            <HeaderComponent user={user} setUser={setUser} />
          </Animated.View>

          <Animated.View
            entering={FadeIn}
            className="h-full"
            style={{
              width: dimensions.width,
              borderRadius: 25,
              backgroundColor: themeColors.onSecondary,
            }}
          >
            <View className="absolute w-full -mt-10 z-10">
              <View className="flex-row justify-center">
                <TouchableOpacity
                  className="rounded-full p-0 m-0"
                  style={{
                    backgroundColor: themeColors.primary,
                    borderColor: themeColors.onSecondary,
                    borderWidth: 8,
                  }}
                >
                  <IconButton
                    icon={"cogs"}
                    size={40}
                    color={themeColors.onPrimary}
                    className="p-0 m-0.5"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex-row mx-5 space-x-3 mt-10 items-center">
              <Text
                className="font-semibold text-3xl -mr-2"
                style={{ color: themeColors.onBackground }}
              >
                Settings
              </Text>
              <IconButton
                className="-m-3"
                icon="wrench"
                color={themeColors.primary}
              />
            </View>
            <View className="mx-5 my-3 space-y-3">
              <View
                className="flex-row items-center justify-between mt-2 p-3 rounded-2xl"
                style={{ backgroundColor: themeColors.secondaryContainer }}
              >
                <View>
                  <Text
                    className="text-lg"
                    style={{ color: themeColors.onBackground }}
                  >
                    Update Information
                  </Text>
                  <Text
                    className="text-xs"
                    style={{ color: themeColors.onBackground }}
                  >
                    Edit username and balance
                  </Text>
                </View>
                <TouchableOpacity
                  className="rounded-2xl px-7"
                  style={{ backgroundColor: themeColors.primaryContainer }}
                  onPress={() => setFinalSetup(true)}
                >
                  <IconButton
                    size={24}
                    color={themeColors.onPrimaryContainer}
                    icon="account-edit-outline"
                  />
                </TouchableOpacity>
              </View>
              <View
                className="flex-row items-center justify-between p-3 rounded-2xl"
                style={{ backgroundColor: themeColors.secondaryContainer }}
              >
                <View>
                  <Text
                    className="text-lg"
                    style={{ color: themeColors.onBackground }}
                  >
                    Logout
                  </Text>
                  <Text
                    className="text-xs"
                    style={{ color: themeColors.onBackground }}
                  >
                    Log out the application
                  </Text>
                </View>
                <TouchableOpacity
                  className="rounded-2xl px-7"
                  style={{ backgroundColor: themeColors.errorContainer }}
                  onPress={() => onSignOutPress()}
                >
                  <IconButton
                    size={24}
                    color={themeColors.onErrorContainer}
                    icon="logout-variant"
                  />
                </TouchableOpacity>
              </View>
              <View
                className="flex-row items-center justify-between p-3 rounded-2xl"
                style={{ backgroundColor: themeColors.secondaryContainer }}
              >
                <View>
                  <Text
                    className="text-lg"
                    style={{ color: themeColors.onBackground }}
                  >
                    Reset
                  </Text>
                  <Text
                    className="text-xs"
                    style={{ color: themeColors.onBackground }}
                  >
                    Delete all of your account data
                  </Text>
                </View>
                <TouchableOpacity
                  className="rounded-2xl px-7"
                  style={{ backgroundColor: themeColors.errorContainer }}
                  onPress={() => onDataDelete()}
                >
                  <IconButton
                    size={24}
                    color={themeColors.onErrorContainer}
                    icon="account-cancel-outline"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
          {finalSetup ? (
            <FinalSetupComponent
              user={user}
              setFinalSetup={setFinalSetup}
              setUser={setUser}
            />
          ) : null}
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}
