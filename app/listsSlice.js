import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getListCategories, updateListCategories } from "~/api/apiLists";
import { formatDate } from "~/utils/manageDate";

const date = formatDate(new Date());

const initialState = {
  lists: [],
  defaultLists: [],
  status: "idle",
  error: null,
  cardPressed: false,
  activeCategory: 0,
  finishedAnimation: false,
};

// Async thunk for fetching lists
export const fetchLists = createAsyncThunk("lists/fetchLists", async () => {
  const response = await getListCategories();
  return response;
});

export const addList = createAsyncThunk(
  "lists/addList",
  async (payload, { dispatch, getState }) => {
    dispatch(_addList(payload));
    const state = getState().lists;
    updateListCategories(state.lists);
  }
);

export const updateList = createAsyncThunk(
  "lists/updateList",
  async (payload, { dispatch, getState }) => {
    dispatch(_updateList(payload));
    const state = getState().lists;
    updateListCategories(state.lists);
  }
);

export const deleteList = createAsyncThunk(
  "lists/deleteList",
  async (payload, { dispatch, getState }) => {
    dispatch(_deleteList(payload));
    const state = getState().lists;
    updateListCategories(state.lists);
  }
);

export const addExpense = createAsyncThunk(
  "lists/addExpense",
  async (payload, { dispatch, getState }) => {
    dispatch(_addExpense(payload));
    const state = getState().lists;
    updateListCategories(state.lists);
  }
);

export const deleteExpense = createAsyncThunk(
  "lists/deleteExpense",
  async (payload, { dispatch, getState }) => {
    dispatch(_deleteExpense(payload));
    const state = getState().lists;
    updateListCategories(state.lists);
  }
);

export const updateExpenseBoughtDate = createAsyncThunk(
  "lists/updateExpenseBoughtDate",
  async (payload, { dispatch, getState }) => {
    dispatch(_updateExpenseBoughtDate(payload));
    const state = getState().lists;
    updateListCategories(state.lists);
  }
);

const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    _addList(state, action) {
      state.lists.push(action.payload);
    },
    _updateList(state, action) {
      const { id, title, icon } = action.payload;
      const index = state.lists.findIndex((cat) => cat.id === id);
      if (index !== -1) {
        const list = state.lists[index];
        state.lists[index] = { ...list, title, icon };
      }
    },
    _deleteList(state, action) {
      state.lists = state.lists.filter((cat) => cat.id !== action.payload);

      let i = 0;

      state.lists.forEach((c) => {
        c.id = i;
        i++;
      });

      state.activeCategory = 0;
    },
    _addExpense(state, action) {
      let { listId, description, amount, url } = action.payload;

      amount === null || amount === "" ? (amount = 0) : null;
      description === null || description === ""
        ? (description = "New Expense")
        : null;
      url === null || url === "" ? (url = "") : null;

      const list = state.lists.find((list) => list.id === listId);

      let occurrences = 1;

      list.expenses.forEach((obj) => {
        if (obj.title === description) occurrences += 1;
      });

      list.expenses.push({
        title: description,
        total: parseFloat(amount),
        id: list.expenses[list.expenses.length - 1]
          ? list.expenses[list.expenses.length - 1].id + 1
          : 0,
        occurrence: occurrences,
        url,
        bought: false,
      });
    },
    _deleteExpense(state, action) {
      const { listId, expenseId } = action.payload;

      const list = state.lists.find((list) => list.id === listId);

      const expense = list.expenses.find((expense) => expense.id === expenseId);

      const filteredArray = list.expenses.filter((obj) => obj.id !== expenseId);

      let occurrences = 1;

      filteredArray.forEach((obj) => {
        if (obj.title === expense.title) {
          obj.occurrence = occurrences;
          occurrences += 1;
        }
      });

      list.expenses = filteredArray;
    },
    _updateExpenseBoughtDate(state, action) {
      const { listId, expenseId } = action.payload;
      const currentDate = new Date();

      const list = state.lists.find((obj) => obj.id === listId);
      const expense = list.expenses.find((obj) => obj.id === expenseId);
      expense.dateBought = !expense.dateBought
        ? currentDate.toISOString()
        : null;
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
      .addCase(fetchLists.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lists = action.payload;
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  _addList,
  _updateList,
  _deleteList,
  updateCardPressed,
  updateActiveCategory,
  _addExpense,
  _deleteExpense,
  _updateExpenseBoughtDate,
  updateFinishedAnimation,
} = listsSlice.actions;

export const getList = (state, id) =>
  state.lists.lists.find((list) => list.id === id);

export const getExpense = (state, expenseId, listId) => {
  const list = state.lists.lists.find((list) => list.id === listId);
  return list.expenses.find((expense) => expense.id === expenseId);
};

export default listsSlice.reducer;
