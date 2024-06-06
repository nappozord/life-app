import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMeals, updateMeals } from "~/api/apiMeals";
import { getCurrentWeek } from "../utils/manageDate";

const defaultWeek = [
  {
    date: "Default_Mon",
    dateString: "Default_Mon",
    dayName: "Mon",
    dayNumber: "1",
  },
  {
    date: "Default_Tue",
    dateString: "Default_Tue",
    dayName: "Tue",
    dayNumber: "2",
  },
  {
    date: "Default_Wed",
    dateString: "Default_Wed",
    dayName: "Wed",
    dayNumber: "3",
  },
  {
    date: "Default_Thu",
    dateString: "Default_Thu",
    dayName: "Thu",
    dayNumber: "4",
  },
  {
    date: "Default_Fri",
    dateString: "Default_Fri",
    dayName: "Fri",
    dayNumber: "5",
  },
  {
    date: "Default_Sat",
    dateString: "Default_Sat",
    dayName: "Sat",
    dayNumber: "6",
  },
  {
    date: "Default_Sun",
    dateString: "Default_Sun",
    dayName: "Sun",
    dayNumber: "7",
  },
];

const initialState = {
  meals: [],
  status: "idle",
  error: null,
  date: new Date().toISOString(),
  defaultWeek: false,
  currentWeek: getCurrentWeek(new Date().toISOString()),
  activeDay: 0,
};

// Async thunk for fetching meals
export const fetchMeals = createAsyncThunk("meals/fetchMeals", async () => {
  const response = await getMeals();
  return response;
});

export const addMeal = createAsyncThunk(
  "meals/addMeal",
  async (payload, { dispatch, getState }) => {
    dispatch(_addMeal(payload));
    const state = getState().meals;
    updateMeals(state.meals);
  }
);

export const updateMeal = createAsyncThunk(
  "meals/updateMeal",
  async (payload, { dispatch, getState }) => {
    dispatch(_updateMeal(payload));
    const state = getState().meals;
    updateMeals(state.meals);
  }
);

export const deleteMeal = createAsyncThunk(
  "meals/deleteMeal",
  async (payload, { dispatch, getState }) => {
    dispatch(_deleteMeal(payload));
    const state = getState().meals;
    updateMeals(state.meals);
    //deleteMealFromRecipe
    //deleteMealFromMeal
  }
);

export const incrementMeal = createAsyncThunk(
  "meals/incrementMeal",
  async (payload, { dispatch }) => {
    dispatch(_incrementMeal(payload));
    updateMeals(state.meals);
  }
);

export const decrementMeal = createAsyncThunk(
  "meals/incrementMeal",
  async (payload, { dispatch }) => {
    dispatch(_decrementMeal(payload));
    updateMeals(state.meals);
  }
);

const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    _addMeal(state, action) {
      const { cost, quantity, name, calories } = action.payload;

      if (cost === "" || cost === null) cost = 0.0;

      if (quantity === "" || quantity === null) quantity = 1;

      if (name === "" || name === null) name = "New Meal";

      if (calories === "" || calories === null) calories = 0;

      const ids = state.meals.map((object) => {
        return object.id;
      });

      const max = ids.length > 0 ? Math.max(...ids) : 0;

      state.meals.push({
        id: max + 1,
        title: name,
        cost: parseFloat(cost),
        quantity: parseFloat(quantity),
        calories: parseFloat(calories),
        stock: 0,
        duration: 7,
        lastUpdate: new Date().toLocaleDateString("it-IT"),
        history: [
          {
            id: 0,
            date: new Date().toLocaleDateString("it-IT"),
            cost: parseFloat(cost),
          },
        ],
      });
    },
    _deleteMeal(state, action) {
      state.meals = state.meals.filter((obj) => obj.id !== action.payload);
    },
    _updateMeal(state, action) {
      const { cost, quantity, name, calories, mealId } = action.payload;

      const meal = state.meals.find((obj) => obj.id === mealId);

      if (cost === "" || cost === null) cost = 0.0;

      if (quantity === "" || quantity === null) quantity = 1;

      if (name === "" || name === null) name = "New Meal";

      if (calories === "" || calories === null) calories = 0;

      meal.title = name;
      meal.cost = parseFloat(cost);
      meal.quantity = parseFloat(quantity);
      meal.lastUpdate = new Date().toLocaleDateString("it-IT");
      meal.calories = parseFloat(calories);
      if (meal.history) {
        if (meal.history.find((i) => i.id === meal.history.length - 1))
          if (
            meal.history.find((i) => i.id === meal.history.length - 1).cost !==
            parseFloat(cost)
          )
            meal.history.push({
              id: meal.history.length,
              date: new Date().toLocaleDateString("it-IT"),
              cost: parseFloat(cost),
            });
      } else {
        meal.history = [
          {
            id: 0,
            date: new Date().toLocaleDateString("it-IT"),
            cost: parseFloat(cost),
          },
        ];
      }
    },
    _incrementMeal(state, action) {
      const meal = state.meals.find((i) => action.payload === i.id);
      meal.stock += 1;
    },
    _decrementMeal(state, action) {
      const meal = state.meals.find((i) => action.payload === i.id);
      meal.stock >= 1 ? (meal.stock -= 1) : (meal.stock = 0);
    },
    updateDate(state, action) {
      state.date = action.payload;
      state.defaultWeek = false;
      state.currentWeek = getCurrentWeek(action.payload);
    },
    updateDefault(state, action) {
      state.defaultWeek = true;
      state.currentWeek = defaultWeek;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meals = action.payload;
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  _addMeal,
  _deleteMeal,
  _updateMeal,
  _incrementMeal,
  _decrementMeal,
  updateDate,
  updateDefault,
} = mealsSlice.actions;

export const getMeal = (state, id) =>
  state.meals.meals.find((i) => i.id === id);

export default mealsSlice.reducer;
