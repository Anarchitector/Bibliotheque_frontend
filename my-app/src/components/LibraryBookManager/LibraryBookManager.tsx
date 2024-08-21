import { useState } from "react"
import {
  LinkComponent,
  LibraryListIntro,
  BookManagerContainer,
  TwoButtons,
} from "./styles"
import Button from "components/Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import BookListOld from "components/BookListOld/BookListOld";
import BookAddAndEdit from "components/BookAddAndEdit/BookAddAndEdit";


function LibraryBookManager() {
  const chosenLibrary = useSelector(
    (state: RootState) => state.LIBRARIES_LIST.selectedLibrary,
  )

  const [isAddBook, setAddBook] = useState(false)
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
      <TwoButtons>
            <Button
              name="Add new book(s)"
              type="submit"
              color="#4A90E2"
              onClick={() => {setAddBook(true)              
              }}
            />
            <Button
              name="Show a book list"
              type="submit"
              onClick={() => {
                setAddBook(false)
              }}
            />
          </TwoButtons>
      <div>
        {isAddBook ? (<BookAddAndEdit editSwitch={false}/>) : (<BookListOld/>) }
      </div>
      <div>
        <p>Your current library number is ${chosenLibrary}</p>
      </div>

      <LinkComponent to="/">Return to the main page</LinkComponent>
    </BookManagerContainer>
  )
}

export default LibraryBookManager
