import { useSelector, useDispatch } from "react-redux"
import { RootState } from "store/store"
import { cartSliceActions } from "../../store/redux/cartSlice/cartSlice"
import { useNavigate } from "react-router-dom"
import { useState } from "react"  // Импортируем useState для управления состоянием
import {
  BookInfo,
  BookInfoComponent,
  BookInfoSpan,
  BookItemComponent,
  BookPhoto,
  BookPhotoComponent,
  BookTitle,
  BtnComponent,
  CartListBook,
  SpanInfo,
} from "./stylesBook"
import Button from "components/Button/Button"
import { CartBoxComponent, CartSpanMessage, ClearCartBtn, PageTitle } from "./styles"

function CartComponent() {
  const items = useSelector((state: RootState) => state.cart.items)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(true)  // Состояние для видимости

  const handleRemoveClick = (id: string) => {
    dispatch(cartSliceActions.removeItem(id))
  }

  const handleClearCart = () => {
    dispatch(cartSliceActions.clearCart())
    navigate("/")
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)  // Переключение видимости
  }

  if (items.length === 0) {
    return <div>Your cart is empty</div>
  }

  return (
    <CartBoxComponent>
      <PageTitle>Your Cart</PageTitle>
      <CartSpanMessage>
        To reserve books in the library, you must fill in all the necessary
        information.
      </CartSpanMessage>
      <Button name={isVisible ? "Hide Cart" : "Show Cart"} onClick={toggleVisibility} /> {/* Кнопка для переключения видимости */}
      {isVisible && (
        <CartListBook>
          {items.map(book => (
            <li key={book.id}>
              <BookItemComponent>
                <BookPhotoComponent>
                  <BookPhoto
                    src="src/assets/Vectordefault-photo.webp"
                    alt={book.title}
                  />
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
                      <SpanInfo>ISBN:</SpanInfo>{" "}
                      <BookInfoSpan>{book.isbn}</BookInfoSpan>
                    </p>
                    <p>
                      <SpanInfo>Publisher:</SpanInfo>{" "}
                      <BookInfoSpan>{book.publisher}</BookInfoSpan>
                    </p>
                    <p>
                      <SpanInfo>Year:</SpanInfo>{" "}
                      <BookInfoSpan>{book.year}</BookInfoSpan>
                    </p>
                  </BookInfo>
                  <BtnComponent>
                    <Button
                      name="Delete"
                      onClick={() => handleRemoveClick(book.id)}
                    />
                  </BtnComponent>
                </BookInfoComponent>
              </BookItemComponent>
            </li>
          ))}
        </CartListBook>
      )}
      <ClearCartBtn>
        <Button name="Clear Cart" onClick={handleClearCart} />
      </ClearCartBtn>
    </CartBoxComponent>
  )
}

export default CartComponent
