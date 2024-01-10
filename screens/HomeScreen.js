import { View, Image, Dimensions, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useRef, useEffect } from "react";
import ChipCategoryListComponent from "../components/chip/ChipCategoryListComponent";
import CarouselComponent from "../components/carousel/CarouselComponent";
import DatePickerComponent from "../components/datepicker/DatePickerComponent";
import Animated, {
  withTiming,
  FadeIn,
  FadeOut,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { formatDate } from "../utils/manageDate";
import {
  getCategories,
  restoreBackup,
  saveCategories,
  getUser,
  updateUser,
} from "../api/apiManager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaultUser, realCategories } from "../data";
import HeaderComponent from "../components/header/HeaderComponent";

export default function HomeScreen() {
  const [date, setDate] = useState(() => formatDate(new Date()));
  const [user, setUser] = useState({});
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0);
  const [cardPressed, setCardPressed] = useState(false);
  const categoryListRef = useRef(null);

  const searchBarHeight = useSharedValue(76);

  useEffect(() => {
    !user.email ? getUser().then((r) => setUser(r)) : updateUser(user);
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
    //updateUser(defaultUser)
    //restoreBackup("January, 2024");
    //restoreBackup("December, 2023");
    //AsyncStorage.clear();
    //AsyncStorage.removeItem("February, 2024")
    //AsyncStorage.removeItem("defaultCategories")
    //AsyncStorage.getAllKeys().then((r) => console.log(r));
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
    if(activeCategory === 0)
      setCardPressed(false);
  }, [activeCategory])

  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        className="absolute h-full w-full"
        source={require("../assets/bg.png")}
        blurRadius={80}
      />
      {user.email ? (
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
          <View className="px-5">
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
            <CarouselComponent
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
