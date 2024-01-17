import { View, Text, Modal, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import IngredientSearchComponent from "~/components/groceries/carousel/recipes/IngredientSearchComponent";
import { themeColors } from "~/theme";

export default function AddIngredientModal({
  item,
  modalVisible,
  setModalVisible,
  ingredients,
  setIngredients,
  grocer
}) {
  const [selected, setSelected] = useState(getIngredients);

  function getIngredients(){
    let sel = [];

    item.forEach(item => {
      sel.push( {
        id: item.ingredient.id,
        quantity: Math.ceil(item.needed),
      })
    })

    return sel;
  }

  useEffect(() => {
    console.log(selected)

  }, [selected])

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
          <IngredientSearchComponent
            ingredients={ingredients}
            selected={selected}
            setSelected={setSelected}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
}
