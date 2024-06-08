import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getGroceryList, updateGroceryList } from "~/api/apiGroceries";
import { getCurrentWeek } from "~/utils/manageDate";
import { calculateNewList } from "~/utils/calculateGroceryList";
import { checkIngredientQuantity } from "../utils/manageIngredients";

const initialState = {
  groceries: [],
  list: {
    ingredientList: [],
    totalCost: 0,
    groceryList: [],
  },
  categories: [
    {
      id: 0,
      title: "Meal Plan",
    },
    {
      id: 1,
      title: "Groceries",
    },
    {
      id: 2,
      title: "Recipes",
    },
    {
      id: 3,
      title: "Ingredients",
    },
    {
      id: 4,
      title: "General",
    },
  ],
  status: "idle",
  error: null,
  activeCategory: 0,
  week: getCurrentWeek(new Date().toISOString()),
};

export const checkMealsAndIngredients = createAsyncThunk(
  "groceries/checkMealsAndIngredients",
  async (payload, { dispatch, getState }) => {
    checkIngredientQuantity(new Date(), getState(), dispatch);
  }
);

// Async thunk for fetching groceries
export const fetchGroceries = createAsyncThunk(
  "groceries/fetchGroceries",
  async () => {
    const response = await getGroceryList();
    return response;
  }
);

export const updateGrocery = createAsyncThunk(
  "groceries/updateGrocery",
  async (payload, { dispatch, getState }) => {
    dispatch(_updateGrocery(payload));
    const state = getState().groceries;
    updateGroceryList(state.groceries);
  }
);

export const deleteGroceryItem = createAsyncThunk(
  "groceries/deleteGroceryItem",
  async (payload, { dispatch, getState }) => {
    dispatch(_deleteGroceryItem(payload));
    const state = getState().groceries;
    updateGroceryList(state.groceries);
  }
);

export const addGroceryItem = createAsyncThunk(
  "groceries/addGroceryItem",
  async (payload, { dispatch, getState }) => {
    dispatch(_addGroceryItem(payload));
    const state = getState().groceries;
    updateGroceryList(state.groceries);
  }
);

const groceriesSlice = createSlice({
  name: "groceries",
  initialState,
  reducers: {
    updateActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },
    updateWeek(state, action) {
      const offset = action.payload;
      const currentDate = new Date(state.week[0].date);
      currentDate.setDate(currentDate.getDate() + offset);
      state.week = getCurrentWeek(currentDate.toISOString());
    },
    updateList(state, action) {
      const { meals, ingredients, recipes, items } = action.payload;

      const newList = calculateNewList({
        meals,
        ingredients,
        recipes,
        items,
        week: state.week,
        groceryList: state.list.groceryList,
        groceries: state.groceries,
      });

      state.list.ingredientList = newList;
    },
    _updateGrocery(state, action) {
      const selected = action.payload;
      const groceryList = state.list.groceryList;
      const ingredientList = state.list.ingredientList;

      groceryList.added = [];

      selected.forEach((s) => {
        groceryList.added.push(s);

        if (groceryList.excluded.find((e) => e.id === s.id)) {
          groceryList.excluded = groceryList.excluded.filter(
            (e) => e.id !== s.id
          );
        }
      });

      ingredientList.forEach((i) => {
        if (!selected.find((s) => i.ingredient.id === s.id)) {
          groceryList.excluded.push({
            id: i.ingredient.id,
            quantity: i.needed,
          });

          if (groceryList.added.find((a) => a.id === i.ingredient.id)) {
            groceryList.added = groceryList.added.filter(
              (a) => a.id !== i.ingredient.id
            );
          }
        }
      });

      let grocery = state.groceries.find(
        (obj) => obj.date === groceryList.date
      );

      if (grocery) {
        grocery.checked = groceryList.checked;
        grocery.added = groceryList.added;
        grocery.excluded = groceryList.excluded;
      } else {
        groceries.push({ ...groceryList });
      }
    },
    _deleteGroceryItem(state, action) {
      const item = action.payload;
      const groceryList = state.list.groceryList;

      state.list.ingredientList = state.list.ingredientList.filter(
        (obj) => obj.ingredient.id !== item.ingredient.id
      );

      groceryList.excluded.push({
        id: item.ingredient.id,
        quantity: item.needed,
      });

      groceryList.added = groceryList.added.filter(
        (i) => i.id !== item.ingredient.id
      );

      groceryList.checked = groceryList.checked.filter(
        (i) => i.id !== item.ingredient.id
      );

      let grocery = state.groceries.find(
        (obj) => obj.date === groceryList.date
      );

      if (grocery) {
        grocery.checked = groceryList.checked;
        grocery.added = groceryList.added;
        grocery.excluded = groceryList.excluded;
      } else {
        groceries.push({ ...groceryList });
      }
    },
    _addGroceryItem(state, action) {
      const { item, quantity } = action.payload;
      const groceryList = state.list.groceryList;

      if (groceryList.checked.find((i) => i.id === item.ingredient.id)) {
        groceryList.checked.find((i) => i.id === item.ingredient.id).quantity +=
          quantity;

        if (
          groceryList.checked.find((i) => i.id === item.ingredient.id)
            .quantity === 0
        ) {
          groceryList.checked = groceryList.checked.filter(
            (i) => i.id !== item.ingredient.id
          );
        }
      } else {
        groceryList.checked.push({
          id: item.ingredient.id,
          quantity,
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroceries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGroceries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.groceries = action.payload;

        const groceryList = state.groceries.find(
          (obj) => obj.date === state.week[0].dateString
        );

        if (groceryList) {
          state.list.groceryList = groceryList;
        } else {
          const item = {
            date: state.week[0].dateString,
            checked: [],
            added: [],
            excluded: [],
          };
          state.list.groceryList = item;
        }
      })
      .addCase(fetchGroceries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  updateActiveCategory,
  updateWeek,
  updateList,
  _updateGrocery,
  _addGroceryItem,
  _deleteGroceryItem,
} = groceriesSlice.actions;

export default groceriesSlice.reducer;
