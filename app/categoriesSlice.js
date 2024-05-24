import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCategories,
  updateCategories,
  setDefaultCategoryForecast,
} from "~/api/apiCategories";

const initialState = {
  categories: [],
  defaultCategories: [],
  status: "idle",
  error: null,
  date: new Date(),
  cardPressed: false,
  activeCategory: 0,
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
    return JSON.stringify(response);
  }
);

const userSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory(state, action) {
      state.categories.push(action.payload);
      updateCategories(state.categories, state.date);
    },
    updateCategory(state, action) {
      const { id, title, icon } = action.payload;
      const index = state.categories.findIndex((cat) => cat.id === id);
      if (index !== -1) {
        state.categories[index] = { ...category, title, icon };
        updateCategories(state.categories, state.categories[index].date);
      }
    },
    deleteCategory(state, action) {
      state.categories = state.categories.filter(
        (cat) => cat.id !== action.payload
      );
      updateCategories(state.categories, state.date);
    },
    addExpense(state, action) {
      const { itemCategory, expenseDate, description, amount } = action.payload;

      const category = state.categories.find(
        (obj) => itemCategory === obj.title
      );

      if (category.income) category.real -= parseFloat(amount);
      else category.real += parseFloat(amount);

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
    deleteExpense(state, action) {
      const { itemCategory, id, title, total } = action.payload;

      const category = state.categories.find(
        (obj) => itemCategory === obj.title
      );

      if (category.income) category.real += parseFloat(total);
      else category.real -= parseFloat(total);

      const filteredArray = category.expenses.filter((obj) => obj.id !== id);

      let occurrences = 1;

      filteredArray.forEach((obj) => {
        if (obj.title === title) {
          obj.occurrence = occurrences;
          occurrences += 1;
        }
      });

      category.expenses = filteredArray;
    },
    updateForecast(state, action) {
      const { id, checked, amount } = action.payload;

      const category = state.categories.find((obj) => id === obj.id);

      if (category.income) {
        category.forecast = -parseFloat(amount);
      } else {
        category.forecast = parseFloat(amount);
      }

      if (checked) {
        setDefaultCategoryForecast(category);
      }
    },
    updateDate(state, action) {
      state.date = action.payload;
    },
    updateCardPressed(state, action) {
      state.cardPressed = action.payload;
    },
    updateActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchDefaultCategories.fulfilled, (state, action) => {
        state.defaultCategories = action.payload;
      })
      .addMatcher(
        (action) => {
          return action.type === updateDate.type;
        },
        (state, action) => {
          // Dispatch fetchCategories after updating date
          fetchCategories(state.date)
            .then((response) => {
              state.categories = response;
            })
            .catch((error) => {
              state.error = error.message;
            });
        }
      );
  },
});

export const {
  addCategory,
  updateCategory,
  deleteCategory,
  updateDate,
  updateCardPressed,
  updateActiveCategory,
  addExpense,
  deleteExpense,
  updateForecast,
} = userSlice.actions;

export default userSlice.reducer;
