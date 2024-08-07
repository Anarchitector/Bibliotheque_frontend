import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserSlaceState } from "./types"

const userInitialState: UserSlaceState = {
  id: null,
  email: null,
  role: null,
  accessToken: null,
  refreshToken: null,
}

export const userSlice = createSlice({
  name: "USER",
  initialState: userInitialState,
  reducers: create => ({
    setUser: create.reducer(
      (
        state: UserSlaceState,
        action: PayloadAction<
          Omit<UserSlaceState, "accessToken" | "refreshToken">
        >,
      ) => {
        state.id = action.payload.id
        state.email = action.payload.email
        state.role = action.payload.role
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
      state.role = null
      state.accessToken = null
      state.refreshToken = null
    }),
  }),
})

export const userSliceActions = userSlice.actions
export const userSliceSelector = userSlice.selectors