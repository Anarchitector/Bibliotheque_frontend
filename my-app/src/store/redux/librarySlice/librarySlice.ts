import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit"
import type { LibrarySliceState } from "./types"

const libraryInitialState: LibrarySliceState = {
  id: null,
  name: null,
  country: null,
  city: null,
  street: null,
  number: null,
  zip: null,
  phone: null,
  librarian_id: null,
  isAuthenticated: false
}

export const librarySlice = createSlice({
  name: "LIBRARY",
  initialState: libraryInitialState,
  reducers: create => ({
    setLibrary: create.reducer(
      (
        state: LibrarySliceState,
        action: PayloadAction<
          Omit<LibrarySliceState, "isAuthenticated">
        >,
      ) => {
        state.id = action.payload.id
        state.name = action.payload.name
        state.country = action.payload.country
        state.city = action.payload.city
        state.street = action.payload.street
        state.number = action.payload.number
        state.zip = action.payload.zip
        state.phone = action.payload.phone
        state.librarian_id = action.payload.librarian_id
        state.isAuthenticated = true // Устанавливаем флаг аутентификации в true
      },
    ),
    clearLibrary: create.reducer((state: LibrarySliceState) => {
      state.id = null
      state.name = null
      state.country = null
      state.city = null
      state.street = null
      state.number = null
      state.zip = null
      state.phone = null
      state.librarian_id = null
      state.isAuthenticated = false // Устанавливаем флаг аутентификации в false
    }),
  }),
})

export const librarySliceActions = librarySlice.actions
export const librarySliceSelector = librarySlice.selectors