import { View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo } from "react";
import Animated, {
  withTiming,
  FadeIn,
  FadeOut,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";

import HeaderComponent from "~/components/header/HeaderComponent";
import SearchComponent from "~/components/groceries/searchbar/SearchComponent";
import ChipCategoryListComponent from "~/components/list/chip/ChipListCategoryListComponent";
import ListCarouselComponent from "~/components/list/carousel/ListCarouselComponent";
import { updateActiveCategory, updateCardPressed } from "~/app/listsSlice";

const MemoizedChipCategoryListComponent = React.memo(ChipCategoryListComponent);
const MemoizedListCarouselComponent = React.memo(ListCarouselComponent);

export default function ListScreen() {
  const user = useSelector((state) => state.user.user);
  const cardPressed = useSelector((state) => state.lists.cardPressed);
  const lists = useSelector((state) => state.lists.lists);

  const dispatch = useDispatch();

  const searchBarHeight = useSharedValue(76);
  const searchBarAnimatedStyle = useAnimatedStyle(() => ({
    height: searchBarHeight.value,
  }));

  useEffect(() => {
    cardPressed
      ? (searchBarHeight.value = withTiming(0, { duration: 500 }))
      : (searchBarHeight.value = withTiming(76, { duration: 500 }));
  }, [cardPressed]);

  const itemsForSearch = useMemo(() => {
    const items = [];
    lists.forEach((c) => {
      items.push({ title: c.title, id: c.id, list: true });

      if (c.id > 0) {
        c.expenses.forEach((e) => {
          items.push({ title: e.title, id: c.id, list: false });
        });
      }
    });
    return items;
  }, [lists]);

  function setSearch(item) {
    const lists = item.filter((obj) => obj.list);
    if (lists.length > 0) {
      const lowest = lists.reduce((acc, curr) => {
        return curr.id < acc.id ? curr : acc;
      });
      dispatch(updateActiveCategory(lowest.id));
      dispatch(updateCardPressed(false));
    } else {
      const lowest = item.reduce((acc, curr) => {
        return curr.id < acc.id ? curr : acc;
      });
      dispatch(updateActiveCategory(lowest.id));
      dispatch(updateCardPressed(true));
    }
  }

  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        className="absolute h-full w-full"
        source={require("~/assets/splash.png")}
      />
      {user.userId ? (
        <View className="mt-16">
          <Animated.View style={searchBarAnimatedStyle} className="mx-5">
            {cardPressed ? (
              <View></View>
            ) : (
              <HeaderComponent text={"Your Wishlists"} />
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
            <MemoizedChipCategoryListComponent />
          </View>
          <Animated.View
            className="mt-1 py-2"
            entering={FadeIn}
            exiting={FadeOut}
          >
            <MemoizedListCarouselComponent />
          </Animated.View>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}
