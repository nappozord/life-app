import React, { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { getUser, updateUser } from "~/api/apiManager";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import HeaderComponent from "~/components/header/HeaderComponent";
import { themeColors } from "~/theme";
import { IconButton } from "react-native-paper";
import { signOut } from "aws-amplify/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import FinalSetupComponent from "~/components/login/FinalSetupComponent";

export default function SettingsScreen({ user, setUser }) {
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
        <>
          <View className="mt-16 flex-1">
            <Animated.View style={searchBarAnimatedStyle} className="mx-5">
              <HeaderComponent user={user} setUser={setUser} />
            </Animated.View>
            <View className="flex-row mx-5 space-x-3 mt-5 items-center">
              <Text
                className="font-semibold text-4xl -mr-2"
                style={{ color: themeColors.onBackground }}
              >
                Settings
              </Text>
              <IconButton
                className="-m-3"
                size={30}
                icon="cog"
                color={themeColors.onBackground}
              />
            </View>
            <View className="mx-5 my-3 space-y-3">
              <View
                style={{ backgroundColor: themeColors.onBackground, height: 1 }}
              />
              <View className="flex-row items-center justify-between mb-1">
                <View>
                  <Text
                    className="text-xl"
                    style={{ color: themeColors.onBackground }}
                  >
                    Update Information
                  </Text>
                  <Text
                    className="text-sm"
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
                style={{ backgroundColor: themeColors.onBackground, height: 1 }}
              />
              <View className="flex-row items-center justify-between mb-1">
                <View>
                  <Text
                    className="text-xl"
                    style={{ color: themeColors.onBackground }}
                  >
                    Logout
                  </Text>
                  <Text
                    className="text-sm"
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
                style={{ backgroundColor: themeColors.onBackground, height: 1 }}
              />
              <View className="flex-row items-center justify-between mb-1">
                <View>
                  <Text
                    className="text-xl"
                    style={{ color: themeColors.onBackground }}
                  >
                    Reset
                  </Text>
                  <Text
                    className="text-sm"
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
              <View
                style={{ backgroundColor: themeColors.onBackground, height: 1 }}
              />
            </View>
            {finalSetup ? (
              <FinalSetupComponent
                user={user}
                setFinalSetup={setFinalSetup}
                setUser={setUser}
              />
            ) : null}
          </View>
        </>
      ) : (
        <View></View>
      )}
    </View>
  );
}
