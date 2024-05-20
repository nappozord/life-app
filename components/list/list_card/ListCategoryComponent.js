import { View, TouchableOpacity, Pressable } from "react-native";
import React, { useState } from "react";
import DonutChartComponent from "~/components/budget/charts/DonutChartComponent";
import ListCategorySummaryComponent from "./ListCategorySummaryComponent";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import ExpensesListComponent from "~/components/budget/carousel/user_card/ExpensesListComponent";
import { ActivityIndicator, IconButton } from "react-native-paper";
import { themeColors } from "~/theme";
import EditCategoryModalComponent from "~/components/budget/chip/EditCategoryModalComponent";

export default function ListCategoryComponent({
  item,
  loading,
  categories,
  setCategories,
  cardPressed,
  setCardPressed,
  finishedAnimation,
  setFinishedAnimation,
  date,
}) {
  const [modalCategoryVisible, setModalCategoryVisible] = useState(false);

  return (
    <View>
      <View className="flex-row justify-between align-center">
        {finishedAnimation && cardPressed ? (
          <Animated.View
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(200)}
          >
            <EditCategoryModalComponent
              item={item}
              modalVisible={modalCategoryVisible}
              setModalVisible={setModalCategoryVisible}
              categories={categories}
              setCategories={setCategories}
              isList={true}
            />
            <TouchableOpacity
              className="p-5 rounded-full"
              onPress={() => setModalCategoryVisible(true)}
            >
              <IconButton
                icon="pencil"
                color={themeColors.onSecondaryContainer}
                size={30}
              />
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <View></View>
        )}
        <Pressable
          className="-mt-12"
        >
          <DonutChartComponent
            item={{
              ...item,
              real: item.realBought,
              forecast: item.real, 
            }}
            categories={categories}
            setCategories={setCategories}
            showTotal={false}
          />
        </Pressable>
        {finishedAnimation && cardPressed ? (
          <Animated.View
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(200)}
          >
            <TouchableOpacity
              className="p-5 rounded-full"
              onPress={() => {
                setFinishedAnimation(false);
                setCardPressed(false);
              }}
            >
              <IconButton
                icon="close"
                color={themeColors.onSecondaryContainer}
                size={30}
              />
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <View></View>
        )}
      </View>
      {loading ? (
        <Animated.View
          entering={FadeIn.duration(1000)}
          className="flex-row justify-center mt-20"
        >
          <ActivityIndicator
            animating={true}
            size={48}
            color={themeColors.onSecondaryContainer}
          />
        </Animated.View>
      ) : !cardPressed ? (
        <Animated.View
          key={item.id + cardPressed}
          entering={FadeIn.duration(500)}
          exiting={FadeOut.duration(500)}
        >
          <ListCategorySummaryComponent
            categories={categories}
            setCategories={setCategories}
            item={item}
            date={date}
          />
        </Animated.View>
      ) : (
        <Animated.View
          key={item.id + cardPressed}
          entering={FadeIn.duration(500)}
        >
          <ExpensesListComponent
            item={item}
            categories={categories}
            setCategories={setCategories}
            date={date}
            isList={true}
          />
        </Animated.View>
      )}
    </View>
  );
}
