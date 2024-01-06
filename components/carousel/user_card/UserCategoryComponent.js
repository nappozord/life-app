import { View, TouchableOpacity, Pressable, Modal } from "react-native";
import React, { useState } from "react";
import DonutChartComponent from "../../charts/DonutChartComponent";
import UserCategorySummaryComponent from "./UserCategorySummaryComponent";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import ExpensesListComponent from "./ExpensesListComponent";
import { ActivityIndicator, IconButton } from "react-native-paper";
import { themeColors } from "../../../theme";
import EditForecastModalComponent from "./EditForecastModalComponent";
import EditCategoryModalComponent from "../../chip/EditCategoryModalComponent";

export default function UserCategoryComponent({
  item,
  loading,
  categories,
  setCategories,
  cardPressed,
  setCardPressed,
  finishedAnimation,
  setFinishedAnimation,
  user,
  setUser,
}) {
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
              categories={categories}
              setCategories={setCategories}
            />
            <TouchableOpacity
              className="p-5 rounded-full"
              onPress={() => setModalCategoryVisible(true)}
            >
              <IconButton icon="pencil" color={themeColors.bgBlack} size={30} />
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <View></View>
        )}
        <EditForecastModalComponent
          item={item}
          modalVisible={modalForecastVisible}
          setModalVisible={setModalForecastVisible}
          categories={categories}
          setCategories={setCategories}
        />
        <Pressable className="-mt-12" onPress={() => setModalForecastVisible(true)}>
          <DonutChartComponent
            item={item}
            categories={categories}
            setCategories={setCategories}
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
                setCardPressed(false);
              }}
            >
              <IconButton icon="close" color={themeColors.bgBlack} size={30} />
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
            color={themeColors.bgWhite(0.4)}
          />
        </Animated.View>
      ) : !cardPressed ? (
        <Animated.View
          key={item.id + cardPressed}
          entering={FadeIn.duration(500)}
          exiting={FadeOut.duration(500)}
        >
          <UserCategorySummaryComponent
            categories={categories}
            setCategories={setCategories}
            item={item}
            user={user}
            setUser={setUser}
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
            user={user}
            setUser={setUser}
          />
        </Animated.View>
      )}
    </View>
  );
}
