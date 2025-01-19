import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} from "../services/itemService";

export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  return await getItems();
});

export const addItem = createAsyncThunk("items/addItem", async (item) => {
  return await createItem(item);
});

export const editItem = createAsyncThunk("items/editItem", async (item) => {
  return await updateItem(item);
});

export const removeItem = createAsyncThunk("items/removeItem", async (id) => {
  await deleteItem(id);
  return id;
});

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.notes;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push(action.payload.note);
      })
      .addCase(editItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item._id === action.payload.note._id
        );
        state.items[index] = action.payload.note;
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      });
  },
});

export default itemsSlice.reducer;
