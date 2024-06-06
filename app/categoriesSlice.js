import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCategories,
  updateCategories,
  setDefaultCategoryForecast,
} from "~/api/apiCategories";
import { formatDate } from "~/utils/manageDate";
import AsyncStorage from "@react-native-async-storage/async-storage";

const date = formatDate(new Date());

const initialState = {
  categories: [],
  defaultCategories: [],
  status: "idle",
  error: null,
  date,
  cardPressed: false,
  activeCategory: 0,
  finishedAnimation: false,
  startingBalance: 0,
};

// Async thunk for fetching categories
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (range) => {
    const response = await getCategories(range);
    return response;
  }
);

export const fetchDefaultCategories = createAsyncThunk(
  "categories/fetchDefaultCategories",
  async () => {
    const response = await AsyncStorage.getItem("defaultCategories");
    return JSON.parse(response);
  }
);

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (payload, { dispatch, getState }) => {
    dispatch(_addCategory(payload));
    const state = getState().categories;
    updateCategories(state.categories, state.date);
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (payload, { dispatch, getState }) => {
    dispatch(_updateCategory(payload));
    const state = getState().categories;
    updateCategories(state.categories, state.date);
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (payload, { dispatch, getState }) => {
    dispatch(_deleteCategory(payload));
    const state = getState().categories;
    updateCategories(state.categories, state.date);
  }
);

export const updateDate = createAsyncThunk(
  "categories/updateDate",
  async (payload, { dispatch, getState }) => {
    dispatch(_updateDate(payload));
    const state = getState().categories;
    dispatch(fetchCategories(state.date));
  }
);

export const updateForecast = createAsyncThunk(
  "categories/updateForecast",
  async (payload, { dispatch, getState }) => {
    const { id, checked, amount } = payload;
    dispatch(_updateForecast(payload));
    const state = getState().categories;
    updateCategories(state.categories, state.date);
    if (checked) setDefaultCategoryForecast({ id, forecast: amount });
  }
);

export const addExpense = createAsyncThunk(
  "categories/addExpense",
  async (payload, { dispatch, getState }) => {
    dispatch(_addExpense(payload));
    const state = getState().categories;
    updateCategories(state.categories, state.date);
  }
);

export const deleteExpense = createAsyncThunk(
  "categories/deleteExpense",
  async (payload, { dispatch, getState }) => {
    dispatch(_deleteExpense(payload));
    const state = getState().categories;
    updateCategories(state.categories, state.date);
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    _addCategory(state, action) {
      state.categories.push(action.payload);
    },
    _updateCategory(state, action) {
      const { id, title, icon } = action.payload;
      const index = state.categories.findIndex((cat) => cat.id === id);
      if (index !== -1) {
        const category = state.categories[index];
        state.categories[index] = { ...category, title, icon };
      }
    },
    _deleteCategory(state, action) {
      state.categories = state.categories.filter(
        (cat) => cat.id !== action.payload
      );

      let i = 0;

      state.categories.forEach((c) => {
        c.id = i;
        i++;
      });

      state.activeCategory = 0;
    },
    _addExpense(state, action) {
      let { categoryId, expenseDate, description, amount } = action.payload;

      amount === null || amount === "" ? (amount = 0) : null;
      description === null || description === ""
        ? (description = "New Expense")
        : null;

      const category = state.categories.find(
        (category) => category.id === categoryId
      );

      let occurrences = 1;

      category.expenses.forEach((obj) => {
        if (obj.title === description) occurrences += 1;
      });

      category.expenses.push({
        title: description,
        total: parseFloat(amount),
        id: category.expenses[category.expenses.length - 1]
          ? category.expenses[category.expenses.length - 1].id + 1
          : 0,
        occurrence: occurrences,
        date: expenseDate,
      });
    },
    _deleteExpense(state, action) {
      const { categoryId, expenseId } = action.payload;

      const category = state.categories.find(
        (category) => category.id === categoryId
      );

      const expense = category.expenses.find(
        (expense) => expense.id === expenseId
      );

      const filteredArray = category.expenses.filter(
        (obj) => obj.id !== expenseId
      );

      let occurrences = 1;

      filteredArray.forEach((obj) => {
        if (obj.title === expense.title) {
          obj.occurrence = occurrences;
          occurrences += 1;
        }
      });

      category.expenses = filteredArray;
    },
    _updateForecast(state, action) {
      const { id, amount } = action.payload;

      const category = state.categories.find((obj) => id === obj.id);

      if (category.income) {
        category.forecast = -parseFloat(amount);
      } else {
        category.forecast = parseFloat(amount);
      }
    },
    _updateDate(state, action) {
      state.date = action.payload;
    },
    updateCardPressed(state, action) {
      state.cardPressed = action.payload;
      if (!action.payload) state.finishedAnimation = false;
    },
    updateActiveCategory(state, action) {
      state.activeCategory = action.payload;
      if (action.payload === 0) state.cardPressed = false;
      if (action.payload === 0 && state.finishedAnimation)
        state.finishedAnimation = false;
    },
    updateFinishedAnimation(state, action) {
      state.finishedAnimation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.startingBalance = action.payload.startingBalance;
        state.categories = action.payload.categories;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchDefaultCategories.fulfilled, (state, action) => {
        state.defaultCategories = action.payload;
      });
  },
});

export const {
  _addCategory,
  _updateCategory,
  _deleteCategory,
  _updateDate,
  updateCardPressed,
  updateActiveCategory,
  _addExpense,
  _deleteExpense,
  _updateForecast,
  updateFinishedAnimation,
} = categoriesSlice.actions;

export const getCategory = (state, id) =>
  state.categories.categories.find((category) => category.id === id);

export const getExpense = (state, expenseId, categoryId) => {
  const category = state.categories.categories.find(
    (category) => category.id === categoryId
  );
  return category.expenses.find((expense) => expense.id === expenseId);
};

export default categoriesSlice.reducer;
