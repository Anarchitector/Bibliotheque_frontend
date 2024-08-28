import { useEffect, useState } from "react";
import {
  LinkComponent,
  BookManagerContainer,
  ErrorMessage,
  PageTitle,
  LibraryListIntro,
} from "./styles"
import type { OrderByLibrary } from "./types";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "store/store";
import axios from "axios";
import BookItem from "components/BookItem/BookItem";
import Loader from "components/Loader/Loader";
import { TwoTopButtons } from "components/BookListOld/styles";
import Button from "components/Button/Button";
import { switchSliceActions } from "store/redux/switchSlice/switchSlice";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports


function LibraryOrderedBooks() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders] = useState<OrderByLibrary[]>([]);
  const libraryId = useSelector((state: RootState) => state.LIBRARIES_LIST.selectedLibrary);
  console.log("Selected Library ID " + libraryId)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleBookList = () => {
    navigate("/api/books")
  }

  useEffect(() => {
    const fetchLibraryOrders = async () => {
      setLoading(true);
      setError(null);

      const url = `http://localhost:8080/api/reserved/library/${libraryId}`;

      try {
        const response = await axios.get(url);
        setOrders(response.data);
      } catch (err) {
        setError("Failed to fetch reserved books");
      } finally {
        setLoading(false);
      }
    };

    fetchLibraryOrders();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }





  return (
    <BookManagerContainer>
      <LibraryListIntro>
        This is a list of all books ordered from this library.
        <br />      
      </LibraryListIntro>
      <TwoTopButtons>        
        <Button
          name="Show library's book list"
          type="submit"
          onClick={handleBookList}
        />
      </TwoTopButtons>
      { orders.length === 0 ? (
        <>
        <PageTitle>
        <p>No books have been ordered yet...</p>
      </PageTitle>
        </>
      ) : (
        <>
         <PageTitle>
        <p>Current Book Orders</p>
      </PageTitle>
      {orders.map((order) => (
        order.reservedBooks.map((book) => (
          <BookItem
            key={Math.random() * 10}  // Ensure unique key for each BookItem
            book={book}
            specialFunction={"orderByLibrary"}
            orderedBy={order.email + ", (ID: " + order.userId + ")"}
          />
        ))
      ))}
        </>
      )}


     

      <LinkComponent to="/">Return to the main page</LinkComponent>
    </BookManagerContainer>

  )
}

export default LibraryOrderedBooks
