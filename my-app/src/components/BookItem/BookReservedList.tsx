import { useState, useEffect } from "react";
import axios from "axios";
import BookItem from "./BookItem";
import Pagination from "components/Pagination/Pagination";
import { BooksListComponent } from "./stylesList";
import { BookProps } from "./types";
import Loader from "components/Loader/Loader";
import { useSelector } from "react-redux"; // Добавляем импорт useSelector
import { RootState } from "../../store/store"; // Импортируем RootState для типа глобального состояния

function BookReservedList() {
  const [books, setBooks] = useState<BookProps["book"][]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const booksPerPage = 10;

  // Получаем userId из глобального состояния
  const userId = useSelector((state: RootState) => state.USER.id);

  useEffect(() => {
    const fetchReservedBooks = async () => {
      setLoading(true);
      setError(null);

      // Проверяем, что userId определен
      if (!userId) {
        setError("User ID not found");
        setLoading(false);
        return;
      }

      const url = `http://localhost:8080/api/reserved/${userId}`;

      try {
        const response = await axios.get(url);
        setBooks(response.data);
      } catch (err) {
        setError("Failed to fetch reserved books");
      } finally {
        setLoading(false);
      }
    };

    fetchReservedBooks();
  }, [userId]); // Зависимость от userId

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfFirstBook + booksPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <BooksListComponent>
        <h3>Your reserved books</h3>
        {currentBooks.map((book) => (
          <BookItem key={book.id} book={book} />
        ))}
      </BooksListComponent>
      {books.length > booksPerPage && (
        <Pagination
          usersPerPage={booksPerPage}
          totalUsers={books.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
    </>
  );
}

export default BookReservedList;
