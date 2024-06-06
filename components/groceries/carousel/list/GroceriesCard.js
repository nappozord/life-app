import { View, TouchableOpacity, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { IconButton } from "react-native-paper";
import { themeColors } from "~/theme";
import { getCurrentWeek } from "~/utils/manageDate";
import GroceriesList from "./GroceriesList";
import { useDispatch, useSelector } from "react-redux";
import { updateWeek } from "~/app/groceriesSlice";

export default function GroceriesCard() {
  const week = useSelector((state) => state.groceries.week);

  const dispatch = useDispatch();

  const text =
    week[0].dateString ===
    getCurrentWeek(new Date().toISOString())[0].dateString
      ? "This week"
      : new Date(week[0].date).toLocaleString("default", {
          month: "long",
        }) ===
        new Date(week[6].date).toLocaleString("default", {
          month: "long",
        })
      ? "From " +
        week[0].dayNumber +
        " to " +
        week[6].dayNumber +
        ", " +
        new Date(week[0].date).toLocaleString("default", {
          month: "long",
        })
      : "From " +
        week[0].dayNumber +
        ", " +
        new Date(week[0].date).toLocaleString("default", {
          month: "short",
        }) +
        " to " +
        week[6].dayNumber +
        ", " +
        new Date(week[6].date).toLocaleString("default", {
          month: "short",
        });

  return (
    <View className="flex-1">
      <View className="absolute w-full -mt-10 z-10">
        <View className="flex-row justify-center">
          <TouchableOpacity
            className="rounded-full"
            style={{
              backgroundColor: themeColors.primary,
              borderColor: themeColors.onSecondary,
              borderWidth: 8,
            }}
          >
            <IconButton
              icon="basket-check"
              size={40}
              color={themeColors.onPrimary}
              className="p-0 m-0.5"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        className="flex-row items-center justify-between py-3 px-4"
        style={{
          backgroundColor: themeColors.onSecondary,
          elevation: 5,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
      >
        <View className="flex-row items-center space-x-2">
          <View>
            <View className="flex-row items-center">
              <Text
                className="text-xl font-semibold"
                style={{ color: themeColors.onBackground }}
              >
                Grocery List
              </Text>
              <IconButton
                className="p-0 m-0"
                icon="blank"
                size={24}
                color={themeColors.onBackground}
              />
            </View>
            <View className="flex-row items-center">
              <IconButton
                className="p-0 m-0 -ml-1"
                icon="calendar-week-begin"
                size={15}
                color={themeColors.secondary}
              />
              <Text
                className="text-sm"
                style={{ color: themeColors.secondary }}
              >
                {text}
              </Text>
            </View>
          </View>
        </View>
        <View className="flex-row items-center space-x-0">
          <TouchableOpacity
            className="rounded-full"
            style={{
              backgroundColor: themeColors.onPrimaryContainer,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }}
            onPress={() => {
              dispatch(updateWeek(-7));
            }}
          >
            <IconButton size={24} icon="menu-left" />
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-full"
            style={{
              backgroundColor: themeColors.onPrimaryContainer,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderLeftWidth: 1,
            }}
            onPress={() => {
              dispatch(updateWeek(7));
            }}
          >
            <IconButton size={24} icon="menu-right" />
          </TouchableOpacity>
        </View>
      </View>
      <GroceriesList />
    </View>
  );
}
