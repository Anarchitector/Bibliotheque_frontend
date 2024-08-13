import { useState } from "react";
import {
  LinkComponent,
  LibraryListIntro,
  BookManagerContainer,
  TwoButtons
} from "./styles"
import Button from "components/Button/Button";
import BookRegistration from "components/BookRegistration/BookRegistration";
import BookList from "components/BookList/BookList";


function BookManager() {

  const [isAddBook, setAddBook] = useState(false);
  return (
    <BookManagerContainer>
      <LibraryListIntro>
        Welcome to your book management page!<br />
        <br />
        Here you can:<br />
        - add new books<br />
        - show your book list<br />
        - modify existing books<br />
        - delete books<br />
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
        {isAddBook ? (<BookRegistration/>) : (<BookList/>) }
      </div>

     
      <LinkComponent to="/">Return to the main page</LinkComponent>     
    </BookManagerContainer>
  )
}

export default BookManager