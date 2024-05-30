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
import {
  updateCardPressed,
  updateFinishedAnimation,
} from "~/app/categoriesSlice";

export default function UserCategoryComponent({ categoryId, loading }) {
  const { finishedAnimation, cardPressed } = useSelector(
    (state) => state.categories
  );

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
              categoryId={categoryId}
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
          categoryId={categoryId}
          modalVisible={modalForecastVisible}
          setModalVisible={setModalForecastVisible}
        />
        <Pressable
          className="-mt-12"
          onPress={() => setModalForecastVisible(true)}
        >
          <DonutChartComponent
            categoryId={categoryId}
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
                updateFinishedAnimation(false);
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
          key={categoryId + cardPressed}
          entering={FadeIn.duration(500)}
          exiting={FadeOut.duration(500)}
        >
          <UserCategorySummaryComponent categoryId={categoryId} />
        </Animated.View>
      ) : (
        <Animated.View
          key={categoryId + cardPressed}
          entering={FadeIn.duration(500)}
        >
          <ExpensesListComponent categoryId={categoryId} />
        </Animated.View>
      )}
    </View>
  );
}
