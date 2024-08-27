import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import type { SwitchSliceState } from "./types"

const switchInitialState: SwitchSliceState = {    
  lbmState: "list",
  frontLL: "libs",
  profileState: "profile"
}

export const switchSlice = createSlice({
  name: "SWITCH",
  initialState: switchInitialState,
  reducers: create => ({    
    setLbmState: create.reducer(
      (
        state: SwitchSliceState,
        action: PayloadAction<"list" | "add" | "edit">,
      ) => {
        state.lbmState = action.payload
      }
    ),
    setFrontLLState: create.reducer(
      (
        state: SwitchSliceState,
        action: PayloadAction<"libs" | "books">,
      ) => {
        state.frontLL = action.payload
      }
    ),
    setProfileState: create.reducer(
      (
        state: SwitchSliceState,
        action: PayloadAction<"profile" | "edit">,
      ) => {
        state.profileState = action.payload
      }
    ),
    resetSwitcher: create.reducer(
      (
        state: SwitchSliceState
      ) => {
        state.lbmState = "list"
        state.frontLL = "libs"
        state.profileState = "profile"
      }
    )
  }),
})

export const switchSliceActions = switchSlice.actions
export const switchSliceSelector = switchSlice.selectors
