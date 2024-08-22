import type { PayloadAction } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { BookSliceState } from "./types"
import type { IBook } from "./types"
import type { RootState } from "store/store"

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
  available: ""
}

//async not required due to using of axios
export const fetchBookByISBN = createAsyncThunk<IBook, void, { state: RootState }>("BOOK/fetchBookByISBN", async (_, thunkAPI) => {
  //procure the state of 
  const state = thunkAPI.getState();
  const currentISBN = state.BOOK.ISBN;

  /// CREATE A REQUEST FOR GETTING A BOOK BY ISBN
  const response = await fetch(
    // eslint-disable-next-line no-template-curly-in-string
    `http://localhost:8080/api/books/isbn=${currentISBN}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  )

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(
      errorData.message || `HTTP error! Status: ${response.status}`,
    )
  }

  const data = await response.json()
  return data
})

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
      }
    ),
  }),
  extraReducers(builder) {
    builder
      .addCase(fetchBookByISBN.pending, () => {
        console.log("Fetching this book...")
      })
      .addCase(fetchBookByISBN.fulfilled, (state, action) => {
        Object.assign(state, action.payload); 
        console.log("Book fetched!")
      })
      .addCase(fetchBookByISBN.rejected, () => {
        console.log("Book fetch FAIL!")
      })        
  },
})

export const bookSliceActions = bookSlice.actions
export const bookSliceSelector = bookSlice.selectors
