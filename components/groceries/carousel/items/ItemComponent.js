import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { themeColors } from "~/theme";
import { Divider, IconButton } from "react-native-paper";
import Animated, {
  SlideInRight,
  SlideInUp,
  SlideOutDown,
  SlideOutLeft,
} from "react-native-reanimated";
import ItemModal from "./ItemModal";
import ItemPercentageComponent from "./ItemPercentageComponent";
import { updateLogs } from "~/api/apiManager";

export default function ItemComponent({
  items,
  setItems,
  item,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const addItem = () => {
    item.stock += 1;
    item.buyingDate.push(new Date().toISOString());
    setItems([...items]);
    updateLogs([{
      text: 'ADD ' + item.title,
      description: 'Manual add of item ' + item.title + ' for a total of ' + item.stock + '.',
      icon: 'plus',
      auto: false,
    }])
  };

  const subItem = () => {
    item.stock >= 1 ? (item.stock -= 1) : (item.stock = 0);

    // Parse ISO string dates into Date objects
    item.buyingDate = item.buyingDate.sort(function(a,b){
      return Date.parse(a) > Date.parse(b);
    });

    // Remove the oldest date from the array
    item.buyingDate.splice(0, 1);

    setItems([...items]);
    updateLogs([{
      text: 'REMOVE ' + item.title,
      description: 'Manual remove of item ' + item.title + ' for a total of ' + item.stock + '.',
      icon: 'minus',
      auto: false,
    }])
  };

  useEffect(() => {
    item.buyingDate.forEach(i => {
      let currentDate = new Date();

      currentDate.setDate(currentDate.getDate() - (item.duration * 7));

      if(Date.parse(currentDate) > Date.parse(i))
        subItem();
    })
  }, [])

  return (
    <>
      {modalVisible ? (
        <ItemModal
          item={item}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          items={items}
          setItems={setItems}
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
                  key={item.id + item.stock}
                >
                  <Text
                    className="text-lg font-semibold"
                    style={{ color: themeColors.onSecondary }}
                  >
                    {Math.ceil(item.stock)}
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
                onPress={() => subItem()}
              />
              <IconButton
                icon={"plus"}
                color={themeColors.onSecondaryContainer}
                size={28}
                className="m-0 p-0"
                onPress={() => addItem()}
              />
            </View>
          </View>
          <View className="mt-1 -mb-1 -mx-1">
            <ItemPercentageComponent
              item={item}
            />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}
