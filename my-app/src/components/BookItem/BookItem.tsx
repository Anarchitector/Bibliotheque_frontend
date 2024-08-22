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
import { BookProps } from "./types"
import { useDispatch } from "react-redux"
import { cartSliceActions } from "../../store/redux/cartSlice/cartSlice"
import { useNavigate } from "react-router-dom"

function BookItem({ book }: BookProps) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleOrderClick = () => {
    dispatch(cartSliceActions.addItem(book))
    navigate("/cart")
  }

  return (
    <BookItemComponent>
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
    </BookItemComponent>
  )
}

export default BookItem
