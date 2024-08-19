import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CartState, Book } from "./types"

const initialState: CartState = {
  items: [],
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: create => ({
    addItem: create.reducer((state, action: PayloadAction<Book>) => {
      state.items.push(action.payload)
    }),
    removeItem: create.reducer((state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    }),
    clearCart: create.reducer(state => {
      state.items = []
    }),
  }),
})

export const cartSliceActions = cartSlice.actions
export const cartSliceSelectors = cartSlice.selectors
