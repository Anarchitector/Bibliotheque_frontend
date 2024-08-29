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
import { useDispatch, useSelector } from "react-redux"
import { cartSliceActions } from "../../store/redux/cartSlice/cartSlice"
import { useNavigate } from "react-router-dom"
import { BookItemStates } from "./types"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { bookSliceActions } from "store/redux/bookSlice/bookSlice"
import { switchSliceActions } from "store/redux/switchSlice/switchSlice"
import type { RootState } from "store/store"



function BookItem({ book, specialFunction, orderedBy }: BookProps) {
  const [bookState, setBookState] = useState<BookItemStates>(BookItemStates.NORMAL)
  const [libName, setLibName] = useState<string>("");
  const [libLoc, setLibLoc] = useState<string>("");
  const libId = book.libraryId
  const aT = useSelector((state: RootState) => state.USER.accessToken)

  ////// Handle the view of the book

  useEffect(() => {
    switch (specialFunction) {
      case "librarian":
        setBookState(BookItemStates.LIBRARIAN);
        break;
      case "cart":
        setBookState(BookItemStates.CART);
        break;
      case "orderByLibrary":
        setBookState(BookItemStates.OBL);
        break;
      default:
        setBookState(BookItemStates.NORMAL);
        break;
    }
  }, []);

  useEffect(()=> {

    fetchLibrary();
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const fetchLibrary = async () => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/libraries/${libId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      },
    )

    if (response.ok) {
      const data = await response.json()
      //console.log(`Library data procured`);  
      //console.log(data)  
      setLibName(data.name)
      setLibLoc(data.country+", "+data.city+", "+data.street+" "+data.number)
      //libraryLocation = data.country+", "+data.city+", "+data.street+" "+data.number 
    }

      

  } catch (error: any) {
    console.error("Library data NOT procured:", error)
  }
}

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
            'Authorization': `Bearer ${aT}`
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
    {/* // ----- LIST OF BOOK ORDERED FROM X LIBRARY REPRESENTATION ------ // */}

    {bookState===BookItemStates.OBL && (<BookItemComponent>
      <BookPhotoComponent>
        <BookPhoto src="/src/assets/Vectordefault-photo.webp" alt={book.title} />
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
          <p>
            <SpanInfo>Ordered by:</SpanInfo>{" "}
            <BookInfoSpan>{orderedBy}</BookInfoSpan>
          </p>
        </BookInfo>          
      </BookInfoComponent>
    </BookItemComponent>)}

    {/* // ----- NORMAL REPRESENTATION ------ // */}

    {bookState===BookItemStates.NORMAL && (<BookItemComponent>
      <BookPhotoComponent>
        <BookPhoto src="/src/assets/Vectordefault-photo.webp" alt={book.title} />
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
          <p>
            <SpanInfo>Library:</SpanInfo>{" "}
            <BookInfoSpan>{libName}</BookInfoSpan>
          </p>
          <p>
            <SpanInfo>Location:</SpanInfo>{" "}
            <BookInfoSpan>{libLoc}</BookInfoSpan>
          </p>
        </BookInfo>
            <BtnComponent>  
            <Button name="Order" onClick={handleOrderClick} />
            </BtnComponent>
      </BookInfoComponent>
    </BookItemComponent>)}

    {/* // ----- CART REPRESENTATION ------ // */}

    {bookState===BookItemStates.CART && (<BookItemComponent>
      <BookPhotoComponent>
        <BookPhoto src="/src/assets/Vectordefault-photo.webp" alt={book.title} />
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
          <p>
            <SpanInfo>Library:</SpanInfo>{" "}
            <BookInfoSpan>{libName}</BookInfoSpan>
          </p>
          <p>
            <SpanInfo>Location:</SpanInfo>{" "}
            <BookInfoSpan>{libLoc}</BookInfoSpan>
          </p>
        </BookInfo>
      </BookInfoComponent>
    </BookItemComponent>)}

    {/* // ------ LIBRARIAN REPRESENTATION ------ // */}

    {bookState===BookItemStates.LIBRARIAN && (<BookItemComponent>
      <BookPhotoComponent>
        <BookPhoto src="/src/assets/Vectordefault-photo.webp" alt={book.title} />
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
          <p>
            <SpanInfo>Library:</SpanInfo>{" "}
            <BookInfoSpan>{libName}</BookInfoSpan>
          </p>
          <p>
            <SpanInfo>Location:</SpanInfo>{" "}
            <BookInfoSpan>{libLoc}</BookInfoSpan>
          </p>
        </BookInfo>
            <BtnComponent specialFunction={"librarian"}>
              <Button name="Edit" onClick={handleEditClick} color="#4A90E2"/>
              <Button name="Delete" onClick={() => handleDeleteClick()} />
            </BtnComponent>
      
      </BookInfoComponent>
    </BookItemComponent>)}

    {/* // ----- DELETED REPRESENTATION ------- // */}

    {bookState===BookItemStates.DELETED && (<></>)}
    
    </>
  )
}

export default BookItem
