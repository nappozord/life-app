import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getGroceryList, updateGroceryList } from "~/api/apiGroceries";
import { getCurrentWeek } from "~/utils/manageDate";
import { calculateNewList } from "~/utils/calculateGroceryList";

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
    updateGroceryList(state.list.groceryList);
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

      state.list.ingredientList = calculateNewList({
        meals,
        ingredients,
        recipes,
        items,
        week: state.week,
        groceryList: state.list.groceryList,
        groceries: state.groceries,
      });
    },
    _updateGrocery(state, action) {
      const selected = action.payload;
      const groceryList = state.list.groceryList;
      const ingredientList = state.list.ingredientList;

      groceryList.added = [];

      selected.forEach((s) => {
        console.log(s);
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

export const { updateActiveCategory, updateWeek, updateList, _updateGrocery } =
  groceriesSlice.actions;

export default groceriesSlice.reducer;
