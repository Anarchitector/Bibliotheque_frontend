import { useState } from "react"
import {
  LinkComponent,
  LibraryListIntro,
  BookManagerContainer,
  TwoButtons,
} from "./styles"
import Button from "components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "store/store";
import BookListOld from "components/BookListOld/BookListOld";
import BookAddAndEdit from "components/BookAddAndEdit/BookAddAndEdit";
import { LBMState } from "./types";
import { switchSliceActions } from "store/redux/switchSlice/switchSlice";


function LibraryBookManager() {
  const chosenLibrary = useSelector(
    (state: RootState) => state.LIBRARIES_LIST.selectedLibrary,
  )

  const dispatch = useDispatch();
  const lbmState = useSelector((state: RootState) => state.SWITCH.lbmState);

  return (
    <BookManagerContainer>
      <LibraryListIntro>
        Welcome to your book management page!
        <br />
        <br />
        Here you can:
        <br />
        - add new books
        <br />
        - show your book list
        <br />
        - modify existing books
        <br />
        - delete books
        <br />
      </LibraryListIntro>
      
      <div>
        { lbmState === LBMState.LIST && (
          <>
          <BookListOld/></>
          
          )}
        { lbmState === LBMState.ADD && (
          <>
          
          <BookAddAndEdit editSwitch={false}/>
          </>
          
          
          )}
        { lbmState === LBMState.EDIT && (
          <>
          
           <BookAddAndEdit editSwitch={true}/>
          </>
          
         )}
      </div>
      {/* <div>
        <p>Your current library number is ${chosenLibrary}</p>
      </div> */}

      <LinkComponent to="/">Return to the main page</LinkComponent>
    </BookManagerContainer>
  )
}

export default LibraryBookManager
