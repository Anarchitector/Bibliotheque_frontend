import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit"
import type { UserSlaceState } from "./types"

const userInitialState: UserSlaceState = {
  id: null,
  email: null,
  name: null,
  surname: null,
  country: null,
  city: null,
  street: null,
  number: null,
  zip: null,
  phone: null,
  role: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false
}

export const userSlice = createSlice({
  name: "USER",
  initialState: userInitialState,
  reducers: create => ({
    setUser: create.reducer(
      (
        state: UserSlaceState,
        action: PayloadAction<
          Omit<UserSlaceState, "accessToken" | "refreshToken" | "isAuthenticated">
        >,
      ) => {
        state.id = action.payload.id
        state.email = action.payload.email
        state.name = action.payload.name
        state.surname = action.payload.surname
        state.country = action.payload.country
        state.city = action.payload.city
        state.street = action.payload.street
        state.number = action.payload.number
        state.zip = action.payload.zip
        state.phone = action.payload.phone
        state.role = action.payload.role
        state.isAuthenticated = true // Устанавливаем флаг аутентификации в true
      },
    ),
    setTokens: create.reducer(
      (
        state: UserSlaceState,
        action: PayloadAction<{ accessToken: string; refreshToken: string }>,
      ) => {
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
      },
    ),
    clearUser: create.reducer((state: UserSlaceState) => {
      state.id = null
      state.email = null
      state.name = null
      state.surname = null
      state.country = null
      state.city = null
      state.street = null
      state.number = null
      state.zip = null
      state.phone = null
      state.role = null
      state.accessToken = null
      state.refreshToken = null
      state.isAuthenticated = false // Устанавливаем флаг аутентификации в false
    }),
  }),
})

export const userSliceActions = userSlice.actions
export const userSliceSelector = userSlice.selectors