import {
  View,
  Text,
  TextInput,
  Image,
  Modal,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useRef, useState } from "react";
import { themeColors } from "~/theme";
import { Divider, IconButton } from "react-native-paper";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import IngredientSearchComponent from "~/components/groceries/searchbar/IngredientSearchComponent";

export default function AddIngredientModal({
  item,
  modalVisible,
  setModalVisible,
  ingredients,
  setIngredients,
  groceryList,
  setGroceryList,
}) {
  const [selected, setSelected] = useState(getIngredients);

  function getIngredients() {
    let sel = [];

    item.forEach((item) => {
      sel.push({
        id: item.ingredient.id,
        quantity: Math.ceil(item.needed),
      });
    });

    return sel;
  }

  const updateIngredientList = () => {
    selected.forEach((s) => {
      groceryList.added.push(s);

      if (groceryList.excluded.find((e) => e.id === s.id)) {
        groceryList.excluded = groceryList.excluded.filter(
          (e) => e.id !== s.id
        );
      }
    });

    item.forEach((i) => {
      if (!selected.find((s) => i.ingredient.id === s.id)) {
        groceryList.excluded.push({ id: i.ingredient.id, quantity: i.needed });

        if (groceryList.added.find((a) => a.id === i.id)) {
          groceryList.added = groceryList.added.filter((a) => a.id !== i.id);
        }
      }
    });

    setGroceryList({ ...groceryList });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      statusBarTranslucent
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <Image
        className="absolute h-full w-full"
        source={require("~/assets/bg.png")}
        blurRadius={80}
        style={{ opacity: 0.9 }}
      />
      <Pressable
        onPress={() => setModalVisible(false)}
        className="flex-1 justify-end"
      >
        <Pressable>
          <Animated.View
            entering={SlideInDown.duration(500)}
            style={{
              backgroundColor: themeColors.bgWhite(0.6),
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
            }}
          >
            <View className="flex-row justify-between align-center">
              <View />
              <View
                className="px-4 py-3 rounded-3xl -mt-16 items-center"
                style={{
                  backgroundColor: themeColors.bgBlack(1),
                  borderColor: themeColors.bgGrey(1),
                  borderWidth: 5,
                }}
              >
                <>
                  <View className="flex-row">
                    <IconButton
                      icon={"plus"}
                      color={themeColors.bgGrey(1)}
                      size={30}
                      className="-mr-2"
                    />
                    <IconButton
                      icon={"apple"}
                      color={themeColors.bgGrey(1)}
                      size={30}
                      className="-ml-2"
                    />
                  </View>
                  <Text className="text-xl font-semibold -mt-4 mb-4 text-gray-400">
                    Ingredient
                  </Text>
                </>
              </View>
              <View />
            </View>
            <View className="-mt-7 pt-10">
              <IngredientSearchComponent
                ingredients={ingredients}
                selected={selected}
                setSelected={setSelected}
              />
            </View>
            <View className="flex-row justify-between items-center">
              <View className="flex-1">
                <TouchableOpacity
                  className="py-5 px-5 mt-1"
                  style={{
                    backgroundColor: themeColors.chartBlue(1),
                    borderRightColor: themeColors.bgGrey(1),
                    borderRightWidth: 1,
                    borderTopLeftRadius: 24,
                  }}
                  onPress={() => {
                    updateIngredientList();
                    setModalVisible(false);
                  }}
                >
                  <Text className="text-gray-200 font-bold text-center text-xl">
                    Edit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
