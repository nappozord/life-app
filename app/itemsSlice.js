import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getItems, updateItems } from "~/api/apiItems";

const initialState = {
  items: [],
  defaultItems: [],
  status: "idle",
  error: null,
};

// Async thunk for fetching items
export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (range) => {
    const response = await getItems(range);
    return response;
  }
);

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload);
      updateItems(state.items);
    },
    updateItem(state, action) {
      const item = action.payload;
      const index = state.items.findIndex((i) => item.id === i.id);
      if (index !== -1) {
        state.items[index] = item;
        updateItems(state.items, state.items[index].date);
      }
    },
    deleteItem(state, action) {
      const item = action.payload;
      state.items = state.items.filter((i) => i.id !== item.id);
      updateItems(state.items);
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

export const { addItem, updateItem, deleteItem } = itemsSlice.actions;

export default itemsSlice.reducer;
