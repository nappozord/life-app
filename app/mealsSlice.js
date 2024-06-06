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

const currentWeek = getCurrentWeek(new Date().toISOString());

const initialState = {
  meals: [],
  status: "idle",
  error: null,
  date: new Date().toISOString(),
  defaultWeek: false,
  currentWeek,
  activeDay: currentWeek.find(
    (day) => day.dateString === new Date().toISOString().split("T")[0]
  ).index,
};

// Async thunk for fetching meals
export const fetchMeals = createAsyncThunk("meals/fetchMeals", async () => {
  const response = await getMeals();
  return response;
});

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
  }
);

const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    _deleteMeal(state, action) {
      const { recipe, type, mealId, day } = action.payload;

      const meal = state.meals.find((obj) => obj.date === day);

      if (recipe) {
        meal[type]["recipes"] = meal[type]["recipes"].filter(
          (obj) => obj !== mealId
        );
      } else {
        meal[type]["ingredients"] = meal[type]["ingredients"].filter(
          (obj) => obj.id !== mealId
        );
      }
    },
    _updateMeal(state, action) {
      const { selected, day, type } = action.payload;

      if (!state.meals.find((obj) => obj.date === day)) {
        state.meals.push({
          date: day,
          breakfast: {
            ingredients: [],
            recipes: [],
          },
          lunch: {
            ingredients: [],
            recipes: [],
          },
          dinner: {
            ingredients: [],
            recipes: [],
          },
          snack: {
            ingredients: [],
            recipes: [],
          },
        });
      }

      state.meals.find((obj) => obj.date === day)[type] = selected;
    },
    updateDate(state, action) {
      state.date = action.payload;
      state.defaultWeek = false;
      state.currentWeek = getCurrentWeek(action.payload);
      state.activeDay = state.currentWeek.find(
        (day) => day.dateString === action.payload.split("T")[0]
      ).index;
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

export const { _deleteMeal, _updateMeal, updateDate, updateDefault } =
  mealsSlice.actions;

export default mealsSlice.reducer;
