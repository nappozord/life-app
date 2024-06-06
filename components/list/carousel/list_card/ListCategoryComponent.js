import { View, TouchableOpacity, Pressable } from "react-native";
import React, { useState } from "react";
import DonutChartComponent from "~/components/budget/charts/DonutChartComponent";
import ListCategorySummaryComponent from "./ListCategorySummaryComponent";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { ActivityIndicator, IconButton } from "react-native-paper";
import { themeColors } from "~/theme";
import EditCategoryListModalComponent from "~/components/list/chip/EditCategoryListModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { getList, updateCardPressed } from "~/app/listsSlice";
import ItemsListComponent from "./ItemsListComponent";

export default function ListCategoryComponent({ listId, loading }) {
  const dispatch = useDispatch();

  const finishedAnimation = useSelector(
    (state) => state.lists.finishedAnimation
  );

  const cardPressed = useSelector((state) => state.lists.cardPressed);

  const list = useSelector((state) => getList(state, listId));

  const [modalCategoryVisible, setModalCategoryVisible] = useState(false);

  return (
    <View>
      <View className="flex-row justify-between align-center">
        {finishedAnimation && cardPressed ? (
          <Animated.View
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(200)}
          >
            <EditCategoryListModalComponent
              listId={listId}
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
        <Pressable className="-mt-12">
          <DonutChartComponent
            item={{
              id: listId,
              real: list.expenses.reduce((total, e) => {
                return e.dateBought ? total + e.total : total;
              }, 0),
              forecast: list.expenses.reduce((total, e) => total + e.total, 0),
            }}
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
          key={listId + cardPressed}
          entering={FadeIn.duration(500)}
          exiting={FadeOut.duration(500)}
        >
          <ListCategorySummaryComponent listId={listId} />
        </Animated.View>
      ) : (
        <Animated.View
          key={listId + cardPressed}
          entering={FadeIn.duration(500)}
        >
          <ItemsListComponent listId={listId} />
        </Animated.View>
      )}
    </View>
  );
}
