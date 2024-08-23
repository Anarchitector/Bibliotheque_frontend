import Button from "components/Button/Button"
import {
  BookInfo,
  BookInfoComponent,
  BookInfoSpan,
  BookItemComponent,
  BookPhoto,
  BookPhotoComponent,
  BookTitle,
  BtnComponent,
  SpanInfo,
} from "./styles"
import type { BookProps } from "./types"
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useDispatch } from "react-redux"
import { cartSliceActions } from "../../store/redux/cartSlice/cartSlice"
import { useNavigate } from "react-router-dom"
import { BookItemStates } from "./types"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { bookSliceActions } from "store/redux/bookSlice/bookSlice"
import { switchSliceActions } from "store/redux/switchSlice/switchSlice"

function BookItem({ book, librarianFunction }: BookProps) {

  const [bookState, setBookState] = useState<BookItemStates>(BookItemStates.NORMAL)

  useEffect(() => {
    if (librarianFunction) {
      setBookState(BookItemStates.LIBRARIAN);
    } else {
      setBookState(BookItemStates.NORMAL);
    }
  }, [librarianFunction]);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  //Buttons: Edit, Delete, Order

  const handleOrderClick = () => {
    dispatch(cartSliceActions.addItem(book))
    navigate("/cart")
  }

  const handleEditClick = () => {
    //store the selected book inside a slice
    dispatch(bookSliceActions.setBook({
      id: book.id,
      title: book.title,
      authorName: book.authorName,
      authorSurname: book.authorSurname,
      year: book.year,
      ISBN: book.isbn,
      publisher: book.publisher,
      libraryId: book.libraryId,
      quantity: book.quantity,
      available: book.available,
      picture: book.picture,
    }
    ))
    //switch the page outlook in library book manager to Edit
    dispatch(switchSliceActions.setLbmState("edit"))  
  }

  async function handleDeleteClick() {

    try {
      const response = await fetch(
        `http://localhost:8080/api/books/${book.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      )

      if (response.ok) {
        console.log(`Book with ID: ${book.id} successfully deleted`);
        setBookState(BookItemStates.DELETED);
        toast.success("Book successfully deleted!");        
      }

    } catch (error: any) {
      console.error("Error during Book's removal:", error)
      toast.error(`"Book's removal has failed..." - ${error}`)
    }

  }

  return (
    <>
    {/* // ----- NORMAL REPRESENTATION ------ // */}
    {bookState===BookItemStates.NORMAL && (<BookItemComponent>
      <BookPhotoComponent>
        <BookPhoto src="src/assets/Vectordefault-photo.webp" alt={book.title} />
      </BookPhotoComponent>
      <BookInfoComponent>
        <BookInfo>
          <p>
            <BookTitle>{book.title}</BookTitle>
          </p>
          <p>
            <SpanInfo>Author:</SpanInfo>{" "}
            <BookInfoSpan>{book.authorName} {book.authorSurname}</BookInfoSpan>
          </p>
          <p>
            <SpanInfo>ISBN:</SpanInfo> <BookInfoSpan>{book.isbn}</BookInfoSpan>
          </p>
          <p>
            <SpanInfo>Publisher:</SpanInfo>{" "}
            <BookInfoSpan>{book.publisher}</BookInfoSpan>
          </p>
          <p>
            <SpanInfo>Year:</SpanInfo> <BookInfoSpan>{book.year}</BookInfoSpan>
          </p>
        </BookInfo>
            <BtnComponent>  
            <Button name="Order" onClick={handleOrderClick} />
            </BtnComponent>
      </BookInfoComponent>
    </BookItemComponent>)}

    {/* // ------ LIBRARIAN REPRESENTATION ------ // */}

    {bookState===BookItemStates.LIBRARIAN && (<BookItemComponent>
      <BookPhotoComponent>
        <BookPhoto src="src/assets/Vectordefault-photo.webp" alt={book.title} />
      </BookPhotoComponent>
      <BookInfoComponent>
        <BookInfo>
          <p>
            <BookTitle>{book.title}</BookTitle>
          </p>
          <p>
            <SpanInfo>Author:</SpanInfo>{" "}
            <BookInfoSpan>{book.authorName} {book.authorSurname}</BookInfoSpan>
          </p>
          <p>
            <SpanInfo>ISBN:</SpanInfo> <BookInfoSpan>{book.isbn}</BookInfoSpan>
          </p>
          <p>
            <SpanInfo>Publisher:</SpanInfo>{" "}
            <BookInfoSpan>{book.publisher}</BookInfoSpan>
          </p>
          <p>
            <SpanInfo>Year:</SpanInfo> <BookInfoSpan>{book.year}</BookInfoSpan>
          </p>
        </BookInfo>
            <BtnComponent librarianFunction={true}>
              <Button name="Edit" onClick={handleEditClick} color="#4A90E2"/>
              <Button name="Delete" onClick={() => handleDeleteClick()} />
              <Button name="Order" onClick={handleOrderClick} />
            </BtnComponent>
      
      </BookInfoComponent>
    </BookItemComponent>)}

    {/* // ----- DELETED REPRESENTATION ------- // */}

    {bookState===BookItemStates.DELETED && (<></>)}
    
    </>
  )
}

export default BookItem
