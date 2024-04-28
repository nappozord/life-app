import { View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useRef, useEffect } from "react";
import ChipCategoryListComponent from "~/components/budget/chip/ChipCategoryListComponent";
import BudgetCarouselComponent from "~/components/budget/carousel/BudgetCarouselComponent";
import Animated, {
  withTiming,
  FadeIn,
  FadeOut,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { formatDate } from "~/utils/manageDate";
import { getListCategories, updateListCategories } from "~/api/apiManager";
import HeaderComponent from "~/components/header/HeaderComponent";
import SearchComponent from "~/components/groceries/searchbar/SearchComponent";

export default function ListScreen({ user, setUser }) {
  const [date, setDate] = useState(() => formatDate(new Date()));
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0);
  const [cardPressed, setCardPressed] = useState(false);
  const [itemsForSearch, setItemsForSearch] = useState([]);
  const categoryListRef = useRef(null);

  const searchBarHeight = useSharedValue(76);

  useEffect(() => {
    cardPressed
      ? (searchBarHeight.value = withTiming(0, { duration: 500 }))
      : (searchBarHeight.value = withTiming(76, { duration: 500 }));
  }, [cardPressed]);

  useEffect(() => {
    if (!categories.find((obj) => obj.index === activeCategory))
      setActiveCategory(0);
    if (categories.length > 0) updateListCategories(categories);

    itemsForSearch.length = 0;

    categories.forEach((c) => {
      itemsForSearch.push({ title: c.title, index: c.index, list: true });

      if (c.id > 0)
        c.expenses.forEach((e) => {
          itemsForSearch.push({ title: e.title, index: c.index, list: false });
          setItemsForSearch([...itemsForSearch]);
        });
    });
  }, [categories]);

  const searchBarAnimatedStyle = useAnimatedStyle(() => ({
    height: searchBarHeight.value,
  }));

  useEffect(() => {
    getListCategories(date).then((r) => {
      setCategories(r);
    });
  }, [date]);

  useEffect(() => {
    if (activeCategory === 0) setCardPressed(false);
  }, [activeCategory]);

  function setSearch(item) {
    const lists = item.filter((obj) => obj.list);
    if (lists.length > 0) {
      const lowest = lists.reduce((acc, curr) => {
        return curr.index < acc.index ? curr : acc;
      });
      setActiveCategory(lowest.index);
      setCardPressed(false);
    } else {
      const lowest = item.reduce((acc, curr) => {
        return curr.index < acc.index ? curr : acc;
      });
      setActiveCategory(lowest.index);
      setCardPressed(true);
    }
  }

  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        className="absolute h-full w-full"
        source={require("~/assets/splash.png")}
        //blurRadius={80}
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
          <View className="mb-5 mx-4">
            <SearchComponent
              items={[]}
              ingredients={itemsForSearch}
              placeholderText={"Search a list or item"}
              setSearch={setSearch}
              setOnlySelected={() => {}}
            />
          </View>
          <View>
            <ChipCategoryListComponent
              categories={categories}
              setCategories={setCategories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              categoryListRef={categoryListRef}
              isList={true}
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
              isList={true}
            />
          </Animated.View>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}
