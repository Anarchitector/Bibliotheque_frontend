import BookItem from "components/BookItem/BookItem";
import { BooksListComponent } from "components/BookItem/stylesList";
import { useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector } from "react-redux";
import type { IBook } from "./types";
import type { RootState } from "store/store";
import { PageTitle } from "pages/RegistrLoginError/styles";



 

function BookListOld() {  
  // storage for procured books
  const [currentBooks, setCurrentBooks] = useState<IBook[]>([]);

  // needed to procure data from a particular library
  const currentLibId = useSelector(
    (state: RootState) => state.LIBRARIES_LIST.selectedLibrary,

  ) 
  // just to make the title more appealing
  const currentLibName = useSelector((state: RootState) => state.LIBRARIES_LIST.librariesList).filter(({id} )=>( id === currentLibId))[0].name
  
  // Function to fetch library's books from the server
  const fetchLibraryBooks = async () => {
    try {
      const response = await fetch(
        // eslint-disable-next-line no-template-curly-in-string
        `http://localhost:8080/api/books/all`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      )

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const filteredData = data.filter((book: { libraryId: string; }) => (book.libraryId === currentLibId));
      setCurrentBooks(filteredData); // Set the fetched libraries to the state
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Fetch libraries when the component mounts
  useEffect(() => {
    fetchLibraryBooks();
  }, []);  

  // Функция для изменения текущей страницы
  return (
    <>
      <BooksListComponent>
          <PageTitle>
              <h2>{currentLibName}: List of books</h2>            
          </PageTitle> 
         { currentBooks.length === 0 ? (
          <p>There are currently no books in this library.</p>
         ): (
          <>
          {currentBooks.map((book: { id: any; title?: string; author?: string; isbn?: string; publisher?: string; year?: string; }) => (
            <BookItem
              key={book.id}
              librarianFunction={true}
              book={book} // Передаем книгу в компонент BookItem
            />
          ))}   
            </>
         )} 
             
      </BooksListComponent>
    </>
    
  );
}

export default BookListOld