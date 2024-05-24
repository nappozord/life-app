import { View, TouchableOpacity, Pressable } from "react-native";
import React, { useState } from "react";
import DonutChartComponent from "~/components/budget/charts/DonutChartComponent";
import UserCategorySummaryComponent from "./UserCategorySummaryComponent";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import ExpensesListComponent from "./ExpensesListComponent";
import { ActivityIndicator, IconButton } from "react-native-paper";
import { themeColors } from "~/theme";
import EditForecastModalComponent from "./EditForecastModalComponent";
import EditCategoryModalComponent from "~/components/budget/chip/EditCategoryModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { updateCardPressed } from "~/app/categoriesSlice";

export default function UserCategoryComponent({
  item,
  loading,
  finishedAnimation,
  setFinishedAnimation,
}) {
  const { categories, cardPressed } = useSelector((state) => state.categories);

  const dispatch = useDispatch();

  const [modalForecastVisible, setModalForecastVisible] = useState(false);
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
        <EditForecastModalComponent
          item={item}
          modalVisible={modalForecastVisible}
          setModalVisible={setModalForecastVisible}
        />
        <Pressable
          className="-mt-12"
          onPress={() => setModalForecastVisible(true)}
        >
          <DonutChartComponent
            item={item}
            showTotal={cardPressed ? true : false}
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
                dispatch(updateCardPressed(false));
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
          <UserCategorySummaryComponent item={item} />
        </Animated.View>
      ) : (
        <Animated.View
          key={item.id + cardPressed}
          entering={FadeIn.duration(500)}
        >
          <ExpensesListComponent item={item} />
        </Animated.View>
      )}
    </View>
  );
}
