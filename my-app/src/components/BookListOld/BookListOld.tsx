import BookItem from "components/BookItem/BookItem";
import { BooksListComponent } from "components/BookItem/stylesList";
import { useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useDispatch, useSelector } from "react-redux";
import type { BookListOldProps, IBook } from "./types";
import type { RootState } from "store/store";
import { PageTitle, TwoTopButtons } from "./styles";
import Button from "components/Button/Button";
import { switchSliceActions } from "store/redux/switchSlice/switchSlice";
import type { ILibrary } from "./types";
import { TwoButtons } from "components/LibrariesList/styles";
import { useNavigate } from "react-router-dom";




function BookListOld({ front }: BookListOldProps) {
  const aT = useSelector((state: RootState) => state.USER.accessToken)
  const navigate = useNavigate()

  const dispatch = useDispatch()
  // storage for procured books
  const [currentBooks, setCurrentBooks] = useState<IBook[]>([]);
  const [currentLib, setCurrentLib] = useState<ILibrary>();

  // needed to procure data from a particular library
  const currentLibId = useSelector(
    (state: RootState) => state.LIBRARIES_LIST.selectedLibrary,

  )

  const handleOrdersView = () => {
    navigate("/api/bibliotek/orders")
  }

  const fetchLibrary = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/libraries/${currentLibId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        },
      )

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setCurrentLib(data);
    } catch (error) {
      console.error("Error fetching library:", error);
    }
  };

  // Function to fetch library's books from the server
  const fetchLibraryBooks = async () => {
    try {
      const response = await fetch(
        // eslint-disable-next-line no-template-curly-in-string
        `http://localhost:8080/api/books/library/${currentLibId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        },
      )

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      //const filteredData = data.filter((book: { libraryId: string; }) => (book.libraryId === currentLibId));
      //setCurrentBooks(filteredData); // Set the fetched libraries to the state
      setCurrentBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Fetch libraries when the component mounts
  useEffect(() => {
    fetchLibrary();
    fetchLibraryBooks();
  }, []);

  // just to make the title more appealing



  const handleBack = () => {
    dispatch(switchSliceActions.setFrontLLState("libs"))
  }

  // Функция для изменения текущей страницы
  return (
    <>
      {front ? (
        <BooksListComponent>
          <Button name="Back to the libraries" type="button" onClick={handleBack} />
          <PageTitle>
            <p>{currentLib?.name}: List of books</p>
          </PageTitle>
          {currentBooks.length === 0 ? (
            <p>There are currently no books in this library.</p>
          ) : (
            <>
              {currentBooks.map((book: { id: any; title?: string; author?: string; isbn?: string; publisher?: string; year?: string; picture?: string }) => (
                <BookItem
                  key={book.id}
                  book={book} // Передаем книгу в компонент BookItem
                />
              ))}
            </>
          )}

        </BooksListComponent>
      ) : (
        <BooksListComponent>
            <TwoTopButtons>
          <Button
            name="Add new book(s)"
            type="submit"
            color="#45A42D"
            onClick={() => dispatch(switchSliceActions.setLbmState("add"))}
          />
          <Button
              name="Show library orders"
              type="submit"
              onClick={handleOrdersView}
            />
          
        </TwoTopButtons>
          <PageTitle>
            <p>{currentLib?.name}: List of books</p>
          </PageTitle>
          {currentBooks.length === 0 ? (
            <p>There are currently no books in this library.</p>
          ) : (
            <>
              {currentBooks.map((book: { id: any; title?: string; author?: string; isbn?: string; publisher?: string; year?: string; picture?: string }) => (
                <BookItem
                  key={book.id}
                  specialFunction={"librarian"}
                  book={book} // Передаем книгу в компонент BookItem
                />
              ))}
            </>
          )}

        </BooksListComponent>
      )}
    </>
  );
}

export default BookListOld