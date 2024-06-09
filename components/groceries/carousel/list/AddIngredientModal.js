import {
  View,
  Text,
  Image,
  Modal,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { themeColors } from "~/theme";
import { IconButton } from "react-native-paper";
import Animated, { SlideInDown } from "react-native-reanimated";
import IngredientSearchComponent from "~/components/groceries/searchbar/IngredientSearchComponent";
import { useDispatch, useSelector } from "react-redux";
import { updateGrocery } from "~/app/groceriesSlice";

export default function AddIngredientModal({ modalVisible, setModalVisible }) {
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const items = useSelector((state) => state.items.items);
  const ingredientList = useSelector(
    (state) => state.groceries.list.ingredientList
  );

  const dispatch = useDispatch();

  const [selected, setSelected] = useState(getItemList);

  function getItemList() {
    let sel = [];

    ingredientList.forEach((ingr) => {
      sel.push({
        id: ingr.ingredient.id,
        quantity: Math.ceil(ingr.needed),
      });
    });

    return sel;
  }

  const updateItemList = () => {
    dispatch(updateGrocery([...selected]));
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      statusBarTranslucent
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <Image
        className="absolute h-full w-full"
        source={require("~/assets/splash.png")}
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
              backgroundColor: themeColors.onSecondary,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
            }}
          >
            <View className="flex-row justify-between align-center">
              <View />
              <View
                className="px-4 py-3 rounded-3xl -mt-16 items-center"
                style={{
                  backgroundColor: themeColors.background,
                  borderColor: themeColors.onSecondary,
                  borderWidth: 5,
                }}
              >
                <>
                  <View className="flex-row">
                    <IconButton
                      icon={"plus"}
                      color={themeColors.onBackground}
                      size={30}
                      className="-mr-2"
                    />
                    <IconButton
                      icon={"apple"}
                      color={themeColors.onBackground}
                      size={30}
                      className="-ml-2"
                    />
                  </View>
                  <Text
                    className="text-xl font-semibold -mt-4 mb-4"
                    style={{ color: themeColors.onBackground }}
                  >
                    Ingredient
                  </Text>
                </>
              </View>
              <View />
            </View>
            <View className="-mt-7 pt-10">
              <IngredientSearchComponent
                ingredients={ingredients}
                items={items}
                selected={selected}
                setSelected={setSelected}
              />
            </View>
            <View className="flex-row justify-between items-center">
              <View className="flex-1">
                <TouchableOpacity
                  className="py-5 px-5 mt-1"
                  style={{
                    backgroundColor: themeColors.primary,
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                  }}
                  onPress={() => {
                    updateItemList();
                    setModalVisible(false);
                  }}
                >
                  <Text
                    className="font-bold text-center text-xl"
                    style={{ color: themeColors.onPrimary }}
                  >
                    Update Grocery List
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
