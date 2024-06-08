import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { themeColors } from "~/theme";
import { IconButton } from "react-native-paper";
import Animated, {
  SlideInRight,
  SlideInUp,
  SlideOutDown,
  SlideOutLeft,
} from "react-native-reanimated";
import ItemModal from "./ItemModal";
import ItemPercentageComponent from "./ItemPercentageComponent";
import { useSelector, useDispatch } from "react-redux";
import { getItem, incrementItem } from "~/app/itemsSlice";

export default function ItemComponent({ itemId }) {
  const item = useSelector((state) => getItem(state, itemId));

  const dispatch = useDispatch();

  const [counter, setCounter] = useState(item.stock);
  const [modalVisible, setModalVisible] = useState(false);

  const firstRender = useRef(true);

  useEffect(() => {
    if (!firstRender.current) {
      dispatch(
        incrementItem({
          id: itemId,
          quantity: counter,
          added: counter > item.stock,
        })
      );
    } else {
      firstRender.current = false;
    }
  }, [counter]);

  useEffect(() => {
    item.buyingDate.forEach((i) => {
      let currentDate = new Date();

      currentDate.setDate(currentDate.getDate() - item.duration * 7);

      if (Date.parse(currentDate) > Date.parse(i))
        setCounter((prev) => (prev > 0 ? prev - 1 : 0));
    });
  }, []);

  return (
    <>
      {item ? (
        <>
          {modalVisible ? (
            <ItemModal
              itemId={itemId}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
          ) : null}
          <Animated.View exiting={SlideOutLeft} entering={SlideInRight}>
            <TouchableOpacity
              style={{
                backgroundColor: themeColors.secondaryContainer,
              }}
              className="mb-1 px-1 py-1 rounded-xl overflow-hidden"
              onPress={() => setModalVisible(!modalVisible)}
            >
              <View className="flex-row justify-between p-0">
                <View className="flex-row items-center">
                  <View
                    className="rounded-full px-4 py-1 mx-1 overflow-hidden"
                    style={{
                      backgroundColor: themeColors.secondary,
                      elevation: 5,
                    }}
                  >
                    <Animated.View
                      entering={SlideInUp}
                      exiting={SlideOutDown}
                      key={itemId + counter}
                    >
                      <Text
                        className="text-lg font-semibold"
                        style={{ color: themeColors.onSecondary }}
                      >
                        {Math.ceil(counter)}
                      </Text>
                    </Animated.View>
                  </View>
                  <View className="ml-1 items-start">
                    <Text
                      className="text-lg "
                      style={{ color: themeColors.onSecondaryContainer }}
                    >
                      {item.title}
                    </Text>
                    <View className="flex-row items-center space-x-1">
                      <Text
                        className="text-sm "
                        style={{ color: themeColors.onSecondaryContainer }}
                      >
                        {"€" + parseFloat(item.cost).toFixed(2)}
                      </Text>
                      <View
                        className="rounded-full px-1.5 py-0"
                        style={{ backgroundColor: themeColors.secondary }}
                      >
                        <Text
                          className=" text-xs font-semibold"
                          style={{ color: themeColors.onSecondary }}
                        >
                          {"Weeks: " + item.duration}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View className="flex-row items-center">
                  <IconButton
                    icon={"minus"}
                    color={themeColors.onSecondaryContainer}
                    size={28}
                    className="m-0 p-0"
                    onPress={() =>
                      setCounter((prev) => (prev > 0 ? prev - 1 : 0))
                    }
                  />
                  <IconButton
                    icon={"plus"}
                    color={themeColors.onSecondaryContainer}
                    size={28}
                    className="m-0 p-0"
                    onPress={() => setCounter((prev) => prev + 1)}
                  />
                </View>
              </View>
              <View className="mt-1 -mb-1 -mx-1">
                <ItemPercentageComponent itemId={itemId} />
              </View>
            </TouchableOpacity>
          </Animated.View>
        </>
      ) : null}
    </>
  );
}
