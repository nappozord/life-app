import { View, Text, RefreshControl, TouchableOpacity } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { MasonryFlashList } from "@shopify/flash-list";
import { getIngredientFromMeal } from "~/utils/manageIngredients";
import { themeColors } from "~/theme";
import GroceryComponent from "./GroceryComponent";
import { IconButton } from "react-native-paper";
import Animated, {
  FadeIn,
  SlideInUp,
  SlideOutUp,
} from "react-native-reanimated";
import { getPreviousWeeks } from "~/utils/manageDate";
import { sortByChecked } from "~/utils/sortItems";

export default function GroceriesList({
  meals,
  ingredients,
  setIngredients,
  recipes,
  week,
  groceryList,
  setGroceryList,
  items,
  setItems,
  totalGroceryList,
}) {
  const [refreshing, setRefreshing] = useState(false);
  const [ingredientList, setIngredientList] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
    setIngredientList(calculateNewList);
  }, [meals, ingredients, recipes, week, groceryList, items]);

  useEffect(() => {
    setIngredientList([]);
    setIngredientList(calculateNewList);
  }, [meals, ingredients, recipes, week, groceryList, items]);

  useEffect(() => {
    let count = 0;

    ingredientList.forEach((item) => {
      if (item.ingredient) {
        count +=
          parseFloat(item.ingredient.cost) *
          Math.ceil(
            item.needed /
              (item.ingredient.quantity
                ? parseFloat(item.ingredient.quantity)
                : 1)
          );
      }
    });

    setTotalCost(count);
  }, [ingredientList]);

  const calculateNewList = () => {
    const weeks = getPreviousWeeks(week[0].dateString);

    let futureIngredients = JSON.parse(JSON.stringify(ingredients));

    let weeklyList = [];

    for (let w = 0; w < weeks.length; w++) {
      if (w != weeks.length - 1)
        futureIngredients = setPreviousWeekIngredients(
          [...calculateWeeklyList(weeks[w], futureIngredients)],
          futureIngredients,
          w
        );
      else {
        weeklyList = calculateWeeklyList(weeks[w], futureIngredients);
      }
    }

    weeklyList = weeklyList.filter(
      (obj) =>
        obj.needed > obj.ingredient.stock * obj.ingredient.quantity ||
        obj.checked
    );

    return sortByChecked(weeklyList);
  };

  const calculateWeeklyList = (thisWeek, futureIngredients) => {
    let ingredientList = [];

    const filteredWeek = thisWeek.filter((day) => day.date > new Date());

    filteredWeek.forEach((day) => {
      const meal = meals.find((obj) => obj.date === day.dateString);
      if (meal) {
        getIngredientFromMeal(
          meal,
          "breakfast",
          futureIngredients,
          recipes,
          ingredientList
        );
        getIngredientFromMeal(
          meal,
          "snack",
          futureIngredients,
          recipes,
          ingredientList
        );
        getIngredientFromMeal(
          meal,
          "lunch",
          futureIngredients,
          recipes,
          ingredientList
        );
        getIngredientFromMeal(
          meal,
          "dinner",
          futureIngredients,
          recipes,
          ingredientList
        );
      }
    });

    ingredientList.forEach((i) => (i.reallyNeeded = i.needed));

    ingredientList = mergeLists(ingredientList, thisWeek);

    return ingredientList.sort((a, b) =>
      a.ingredient.title > b.ingredient.title
        ? 1
        : b.ingredient.title > a.ingredient.title
        ? -1
        : 0
    );
  };

  function mergeLists(ingredientList, thisWeek) {
    let gList = {
      date: thisWeek[0].dateString,
      checked: [],
      added: [],
      excluded: [],
    };

    if (
      totalGroceryList &&
      totalGroceryList.find((obj) => obj.date === thisWeek[0].dateString)
    ) {
      gList = totalGroceryList.find(
        (obj) => obj.date === thisWeek[0].dateString
      );
    }

    ingredientList = setAdded(ingredientList, gList);
    ingredientList = setExcluded(ingredientList, gList);
    ingredientList = setChecked(ingredientList, gList);

    return ingredientList;
  }

  function setAdded(ingredientList, gList) {
    total = [...ingredients, ...items];
    gList.added.forEach((obj) => {
      if (ingredientList.find((i) => i.ingredient.id === obj.id)) {
        ingredientList.find((i) => i.ingredient.id === obj.id).needed =
          obj.quantity;
      } else if (total.find((i) => i.id === obj.id)) {
        ingredientList.push({
          ingredient: total.find((i) => i.id === obj.id),
          needed: obj.quantity,
          onCart: 0,
        });
      }
    });

    return ingredientList;
  }

  function setExcluded(ingredientList, gList) {
    gList.excluded.forEach((obj) => {
      if (ingredientList.find((i) => i.ingredient.id === obj.id)) {
        ingredientList.find((i) => i.ingredient.id === obj.id).needed -=
          obj.quantity;
        if (
          ingredientList.find((i) => i.ingredient.id === obj.id).needed <= 0
        ) {
          ingredientList = ingredientList.filter(
            (i) => i.ingredient.id !== obj.id
          );
        }
      }
    });

    return ingredientList;
  }

  function setChecked(ingredientList, gList) {
    total = [...ingredients, ...items];
    gList.checked.forEach((obj) => {
      if (ingredientList.find((i) => i.ingredient.id === obj.id)) {
        ingredientList.find((i) => i.ingredient.id === obj.id).onCart =
          obj.quantity;
        ingredientList.find((i) => i.ingredient.id === obj.id).checked = true;
      } else {
        const ing = total.find((i) => i.id === obj.id);
        ingredientList.push({
          ingredient: ing,
          needed: obj.quantity,
          onCart: obj.quantity,
          checked: true,
        });
      }
    });

    return ingredientList;
  }

  function setPreviousWeekIngredients(list, futureIngredients, w) {
    list.forEach((i) => {
      const total = (
        Math.ceil(
          i.needed / (i.ingredient.quantity ? i.ingredient.quantity : 1) -
            i.ingredient.stock
        ) - parseFloat(i.reallyNeeded / i.ingredient.quantity)
      ).toFixed(4);
      const stock = (futureIngredients.find(
        (obj) => obj.id === i.ingredient.id
      ).stock += parseFloat(total)).toFixed(4);
      futureIngredients.find((obj) => obj.id === i.ingredient.id).stock =
        parseFloat(stock);
    });

    return futureIngredients;
  }

  return (
    <View className="flex-1 overflow-hidden" key={week[0].dateString}>
      <>
        <Animated.View
          entering={SlideInUp.duration(500)}
          exiting={SlideOutUp.duration(500)}
          style={{ elevation: 5 }}
        >
          <View
            className="px-4 py-1"
            style={{ backgroundColor: themeColors.success }}
            needsOffscreenAlphaCompositing={true}
          >
            <Text
              className=" text-lg font-semibold"
              style={{ color: themeColors.onSuccess }}
            >
              {"Total: €" + parseFloat(totalCost).toFixed(2)}
            </Text>
          </View>
        </Animated.View>
        <View className="flex-1 px-1">
          {ingredientList && ingredientList.length > 0 ? (
            <MasonryFlashList
              numColumns={2}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  progressBackgroundColor={themeColors.primaryContainer}
                  colors={[themeColors.onPrimaryContainer]}
                />
              }
              estimatedItemSize={600}
              fadingEdgeLength={50}
              showsVerticalScrollIndicator={false}
              data={[
                ...ingredientList,
                ...Array.from(
                  { length: ingredientList.length % 2 === 0 ? 2 : 1 },
                  (_, i) => {
                    return {
                      ingredient: { id: -i - 1, title: "Add to List" },
                    };
                  }
                ),
              ]}
              keyExtractor={(item) => item.ingredient.id}
              renderItem={({ item }) => {
                return (
                  <GroceryComponent
                    item={item}
                    ingredientList={ingredientList}
                    setIngredientList={setIngredientList}
                    groceryList={groceryList}
                    setGroceryList={setGroceryList}
                    ingredients={ingredients}
                    setIngredients={setIngredients}
                    items={items}
                    setItems={setItems}
                  />
                );
              }}
            />
          ) : (
            <Animated.View entering={FadeIn} className="p-2">
              <TouchableOpacity
                className="m-1 rounded-2xl p-10 overflow-hidden"
                style={{
                  backgroundColor: themeColors.secondary,
                  elevation: 5,
                }}
              >
                <View className="justify-between items-center space-y-1">
                  <View className="">
                    <TouchableOpacity
                      className="rounded-full"
                      style={{ backgroundColor: themeColors.onSecondary }}
                    >
                      <IconButton
                        icon="emoticon-happy-outline"
                        size={28}
                        color={themeColors.secondary}
                      />
                    </TouchableOpacity>
                  </View>
                  <View className="">
                    <Text
                      className="text-lg text-center"
                      style={{ color: themeColors.onSecondary }}
                    >
                      You are all set up!
                    </Text>
                    <Text
                      className="text-sm text-center"
                      style={{ color: themeColors.onSecondary }}
                    >
                      No more things to buy this week
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>
      </>
    </View>
  );
}
