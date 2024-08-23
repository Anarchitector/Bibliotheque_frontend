import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import type { BookSliceState } from "./types"

const bookInitialState: BookSliceState = {  
  id: "",
  title: "",
  authorName: "",
  authorSurname: "",
  year: "",
  ISBN: "",
  publisher: "",
  libraryId: "",
  quantity: "",
  available: "",
  picture: ""
}

export const bookSlice = createSlice({
  name: "BOOK",
  initialState: bookInitialState,
  reducers: create => ({
    setBook: create.reducer(
      (
        state: BookSliceState,
        action: PayloadAction<BookSliceState>,
      ) => {
        state.id = action.payload.id    
        state.title = action.payload.title 
        state.authorName = action.payload.authorName 
        state.authorSurname = action.payload.authorSurname 
        state.year = action.payload.year 
        state.ISBN = action.payload.ISBN 
        state.publisher = action.payload.publisher 
        state.libraryId = action.payload.libraryId 
        state.quantity = action.payload.quantity 
        state.available = action.payload.available 
        state.picture = action.payload.picture
      },
    ),    
    clearBook: create.reducer(
      (
        state: BookSliceState
      ) => {
        state.id = null
        state.title = null 
        state.authorName = null 
        state.authorName = null 
        state.year = null 
        state.ISBN = null 
        state.publisher = null 
        state.libraryId = null 
        state.quantity = null 
        state.available = null
        state.picture = null
      }
    ),
  }),
})

export const bookSliceActions = bookSlice.actions
export const bookSliceSelector = bookSlice.selectors
