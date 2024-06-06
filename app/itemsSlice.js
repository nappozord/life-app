import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getItems, updateItems } from "~/api/apiItems";
import { sortByDate } from "~/utils/sortItems";

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

// Async thunk for fetching items
export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  const response = await getItems();
  return response;
});

export const addItem = createAsyncThunk(
  "items/addItem",
  async (payload, { dispatch, getState }) => {
    dispatch(_addItem(payload));
    const state = getState().items;
    updateItems(state.items);
  }
);

export const updateItem = createAsyncThunk(
  "items/updateItem",
  async (payload, { dispatch, getState }) => {
    dispatch(_updateItem(payload));
    const state = getState().items;
    updateItems(state.items);
  }
);

export const deleteItem = createAsyncThunk(
  "items/deleteItem",
  async (payload, { dispatch, getState }) => {
    dispatch(_deleteItem(payload));
    const state = getState().items;
    updateItems(state.items);
  }
);

export const incrementItem = createAsyncThunk(
  "items/incrementItem",
  async (payload, { dispatch, getState }) => {
    dispatch(_incrementItem(payload));
    const state = getState().items;
    updateItems(state.items);
  }
);

export const decrementItem = createAsyncThunk(
  "items/incrementItem",
  async (payload, { dispatch, getState }) => {
    dispatch(_decrementItem(payload));
    const state = getState().items;
    updateItems(state.items);
  }
);

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    _addItem(state, action) {
      const { cost, duration, name } = action.payload;

      if (cost === "" || cost === null) cost = 0.0;

      if (duration === "" || duration === null) duration = 1;

      if (name === "" || name === null) name = "New Item";

      const ids = state.items.map((object) => {
        return object.id;
      });

      const max = ids.length > 0 ? Math.max(...ids) : 10000;

      state.items.push({
        id: max + 1,
        title: name,
        cost: parseFloat(cost),
        duration: parseFloat(duration),
        stock: 0,
        lastUpdate: new Date().toLocaleDateString("it-IT"),
        buyingDate: [],
        history: [
          {
            id: 0,
            date: new Date().toLocaleDateString("it-IT"),
            cost: parseFloat(cost),
          },
        ],
      });
    },
    _deleteItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    _updateItem(state, action) {
      const { cost, duration, name, itemId } = action.payload;

      if (cost === "" || cost === null) cost = 0.0;

      if (duration === "" || duration === null) duration = 1;

      if (name === "" || name === null) name = "New Item";

      const it = state.items.find((obj) => obj.id === itemId);

      it.title = name;
      it.cost = parseFloat(cost);
      it.duration = parseFloat(duration);
      it.lastUpdate = new Date().toLocaleDateString("it-IT");
      if (it.history) {
        if (it.history.find((i) => i.id === it.history.length - 1))
          if (
            it.history.find((i) => i.id === it.history.length - 1).cost !==
            parseFloat(cost)
          )
            it.history.push({
              id: it.history.length,
              date: new Date().toLocaleDateString("it-IT"),
              cost: parseFloat(cost),
            });
      } else {
        i.history = [
          {
            id: 0,
            date: new Date().toLocaleDateString("it-IT"),
            cost: parseFloat(cost),
          },
        ];
      }
    },
    _incrementItem(state, action) {
      const item = state.items.find((i) => action.payload === i.id);
      item.stock += 1;
    },
    _decrementItem(state, action) {
      const item = state.items.find((i) => action.payload === i.id);
      item.stock >= 1 ? (item.stock -= 1) : (item.stock = 0);
      item.buyingDate.push(new Date().toISOString());
      item.buyingDate = sortByDate(item.buyingDate);
      item.buyingDate.splice(0, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  _addItem,
  _deleteItem,
  _updateItem,
  _incrementItem,
  _decrementItem,
} = itemsSlice.actions;

export const getItem = (state, id) =>
  state.items.items.find((i) => i.id === id);

export default itemsSlice.reducer;
