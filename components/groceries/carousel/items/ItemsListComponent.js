import {
  View,
  TouchableOpacity,
  Text,
  RefreshControl,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { IconButton } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { useSelector } from "react-redux";

import { themeColors } from "~/theme";
import ItemComponent from "./ItemComponent";
import ItemModal from "./ItemModal";
import SearchComponent from "~/components/groceries/searchbar/SearchComponent";
import { sortByName, sortByStock } from "~/utils/sortItems";

export default function ItemsListComponent() {
  const items = useSelector((state) => state.items.items);

  const [sort, setSort] = useState("alphabetical");
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState(items);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (search.length < items.length) {
      for (const i of search) {
        const item = items.find((obj) => obj.id === i.id);
        if (item.quantity === i.quantity && item.stock !== i.stock) {
          const updatedSearch = search.map((obj) =>
            obj.id === i.id ? { ...obj, stock: item.stock } : obj
          );
          setSearch(updatedSearch);
          return;
        }
      }
      setSearch([...items]);
    } else {
      setSearch([...items]);
    }
  }, [items]);

  return (
    <View className="flex-1">
      {modalVisible ? (
        <ItemModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      ) : null}
      <View className="absolute w-full -mt-10">
        <View className="absolute w-full flex-row justify-center z-10">
          <TouchableOpacity
            className="rounded-full"
            style={{
              backgroundColor: themeColors.primary,
              borderColor: themeColors.onSecondary,
              borderWidth: 8,
            }}
          >
            <IconButton
              icon="plus"
              size={40}
              color={themeColors.onPrimary}
              className="p-0 m-0.5"
              onPress={() => setModalVisible(!modalVisible)}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        className="py-3 px-3"
        style={{
          backgroundColor: themeColors.onSecondary,
          elevation: 5,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center space-x-2">
            <View>
              <View className="flex-row items-center">
                <Text
                  className="text-xl font-semibold"
                  style={{ color: themeColors.onBackground }}
                >
                  General
                </Text>
                <IconButton
                  className="p-0 m-0"
                  icon="coffee-maker"
                  size={24}
                  color={themeColors.onBackground}
                />
              </View>
              <View className="flex-row items-center">
                <IconButton
                  className="p-0 m-0 -ml-1"
                  icon="sort"
                  size={15}
                  color={themeColors.secondary}
                />
                <Text
                  className="text-sm"
                  style={{ color: themeColors.secondary }}
                >
                  {sort === "alphabetical" ? "A-Z order" : "Usage order"}
                </Text>
              </View>
            </View>
          </View>
          <View className="flex-row items-center space-x-0">
            <TouchableOpacity
              className="rounded-full"
              style={{
                backgroundColor:
                  sort === "alphabetical"
                    ? themeColors.primary
                    : themeColors.onPrimaryContainer,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
              onPress={() => {
                setSort("alphabetical");
              }}
            >
              <IconButton
                size={sort === "alphabetical" ? 25 : 24}
                icon={"sort-alphabetical-variant"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              className="rounded-full"
              style={{
                backgroundColor:
                  sort === "use"
                    ? themeColors.primary
                    : themeColors.onPrimaryContainer,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderLeftWidth: 1,
              }}
              onPress={() => {
                setSort("use");
              }}
            >
              <IconButton
                size={sort === "use" ? 25 : 24}
                icon={"sort-variant"}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View className="mt-2">
          <SearchComponent
            items={[]}
            ingredients={items}
            setSearch={setSearch}
            onlyIngredients={false}
            setOnlySelected={() => {}}
            placeholderText={"Search General Items"}
          />
        </View>
      </View>
      <View className="mx-3 flex-1">
        <FlatList
          key={"items_" + sort}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              progressBackgroundColor={themeColors.primaryContainer}
              colors={[themeColors.onPrimaryContainer]}
            />
          }
          keyExtractor={(item) => "items_" + item.id}
          fadingEdgeLength={50}
          showsVerticalScrollIndicator={false}
          data={
            sort === "alphabetical"
              ? sortByName([...search])
              : sortByStock([...search])
          }
          renderItem={({ index, item }) => {
            return (
              <View
                className={
                  (index === 0 ? "mt-3 " : "") +
                  (index === search.length - 1 ? "mb-2 " : "")
                }
              >
                <ItemComponent itemId={item.id} />
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}
