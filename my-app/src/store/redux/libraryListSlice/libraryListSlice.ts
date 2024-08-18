import type { PayloadAction } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { LibrariesListState } from "./types"
import type { ILibrary } from "./types"
import type { RootState } from "store/store"
// eslint-disable-next-line @typescript-eslint/no-restricted-imports

const librariesListInitialState: LibrariesListState = {
  librariesList: [],
  selectedLibrary: ""
}

//async not required due to using of axios
export const fetchList = createAsyncThunk<ILibrary[], void, { state: RootState }>("LIBRARIES_LIST/fetchList", async (_, thunkAPI) => {
  //procure the state of 
  const state = thunkAPI.getState();
  const currentUser = state.USER.id;

  /// CREATE A PROPER REQUEST FOR GETTING LIBRARIES LIST for a particular user
  const response = await fetch(
    // eslint-disable-next-line no-template-curly-in-string
    `http://localhost:8080/api/libraries?librarianId=${currentUser}`,
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

export const libraryListSlice = createSlice({
  name: "LIBRARIES_LIST",
  initialState: librariesListInitialState,
  reducers: create => ({
    setLibrariesList: create.reducer(
      (
        state: LibrariesListState,
        action: PayloadAction<LibrariesListState>,
      ) => {
        state.librariesList = action.payload.librariesList
        state.selectedLibrary = action.payload.selectedLibrary        
      },
    ),    
    clearLibrariesList: create.reducer(
      (
        state: LibrariesListState
      ) => {
        state.librariesList = []
        state.selectedLibrary = ""
      }
    ),

    changeSelectedLibrary: create.reducer(
      (
        state: LibrariesListState, 
        action: PayloadAction<
        Omit<LibrariesListState, "librariesList">
        >,
      ) => {       
        state.selectedLibrary = action.payload.selectedLibrary
      },
    ),
  }),
  extraReducers(builder) {
    builder
      .addCase(fetchList.pending, () => {
        console.log("Fetching libraries...")
      })
      .addCase(fetchList.fulfilled, (state, action) => {
        state.librariesList = action.payload
        console.log("Libraries fetched!")
      })
      .addCase(fetchList.rejected, () => {
        console.log("Libraries fetch FAIL!")
      })
  },
})

export const libraryListSliceActions = libraryListSlice.actions
export const libraryListSliceSelector = libraryListSlice.selectors
