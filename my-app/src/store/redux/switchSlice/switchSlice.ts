import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import type { SwitchSliceState } from "./types"

const switchInitialState: SwitchSliceState = {    
  lbmState: "list",
  frontLL: "libs"
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
    )
  }),
})

export const switchSliceActions = switchSlice.actions
export const switchSliceSelector = switchSlice.selectors
