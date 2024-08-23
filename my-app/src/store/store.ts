import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import {userSlice} from "./redux/userSlice/userSlice"
import { librarySlice } from './redux/librarySlice/librarySlice';
import { libraryListSlice } from "./redux/libraryListSlice/libraryListSlice";
import { cartSlice } from "./redux/cartSlice/cartSlice";
import { bookSlice } from "./redux/bookSlice/bookSlice";
import { switchSlice } from "./redux/switchSlice/switchSlice";

const rootReducer = combineSlices(userSlice, librarySlice, libraryListSlice, cartSlice, bookSlice, switchSlice)

export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  })
  return store
}

export const store = makeStore()

export type AppStore = typeof store

export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
