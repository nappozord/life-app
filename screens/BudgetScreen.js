import {
  View,
  Image,
  Dimensions,
  SafeAreaView,
  BackHandler,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useRef, useEffect } from "react";
import ChipCategoryListComponent from "~/components/budget/chip/ChipCategoryListComponent";
import BudgetCarouselComponent from "~/components/budget/carousel/BudgetCarouselComponent";
import DatePickerComponent from "~/components/budget/datepicker/DatePickerComponent";
import Animated, {
  withTiming,
  FadeIn,
  FadeOut,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { formatDate } from "~/utils/manageDate";
import {
  getCategories,
  restoreBackup,
  saveCategories,
  getUser,
  updateUser,
} from "~/api/apiManager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaultUser, realCategories } from "~/data";
import HeaderComponent from "~/components/header/HeaderComponent";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "aws-amplify/auth";

export default function BudgetScreen() {
  const navigation = useNavigation();
  const [date, setDate] = useState(() => formatDate(new Date()));
  const [user, setUser] = useState({});
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0);
  const [cardPressed, setCardPressed] = useState(false);
  const categoryListRef = useRef(null);

  const searchBarHeight = useSharedValue(76);

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to log out?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "YES",
          onPress: () => {
            signOut()
              .then(() => navigation.push("Welcome"))
              .catch((e) => navigation.push("Welcome"));
          },
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    !user.userId ? getUser().then((r) => setUser(r)) : updateUser(user);
  }, [user]);

  useEffect(() => {
    cardPressed
      ? (searchBarHeight.value = withTiming(0, { duration: 500 }))
      : (searchBarHeight.value = withTiming(76, { duration: 500 }));
  }, [cardPressed]);

  useEffect(() => {
    if (!categories.find((obj) => obj.index === activeCategory))
      setActiveCategory(0);
    if (categories.length > 0) saveCategories(categories, date);
  }, [categories]);

  const searchBarAnimatedStyle = useAnimatedStyle(() => ({
    height: searchBarHeight.value,
  }));

  useEffect(() => {
    getCategories(date).then((r) => {
      setCategories(r);
    });
  }, [date]);

  useEffect(() => {
    if (activeCategory === 0) setCardPressed(false);
  }, [activeCategory]);

  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        className="absolute h-full w-full"
        source={require("~/assets/bg.png")}
        blurRadius={80}
      />
      {user.userId ? (
        <View className="mt-16">
          <Animated.View style={searchBarAnimatedStyle} className="mx-5">
            {cardPressed ? (
              <View></View>
            ) : (
              <HeaderComponent user={user} setUser={setUser} />
            )}
          </Animated.View>
          <View className="mb-3 -mt-4">
            <DatePickerComponent date={date} setDate={setDate} />
          </View>
          <View>
            <ChipCategoryListComponent
              categories={categories}
              setCategories={setCategories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              categoryListRef={categoryListRef}
            />
          </View>
          <Animated.View
            className="mt-1 py-2"
            key={date.date}
            entering={FadeIn}
            exiting={FadeOut}
          >
            <BudgetCarouselComponent
              date={date}
              categories={categories}
              setCategories={setCategories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              categoryListRef={categoryListRef}
              cardPressed={cardPressed}
              setCardPressed={setCardPressed}
              user={user}
              setUser={setUser}
            />
          </Animated.View>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}
