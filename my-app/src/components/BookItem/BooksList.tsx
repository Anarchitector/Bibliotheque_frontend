import { useState, useEffect } from 'react';
import axios from 'axios';
import BookItem from './BookItem'; // Импортируем компонент для отображения книги
import Pagination from 'components/Pagination/Pagination';
import { BooksListComponent } from './stylesList';
import type { BookProps } from './types';
import Loader from 'components/Loader/Loader';

function BookList() {
  const [books, setBooks] = useState<BookProps['book'][]>([]); // Состояние для списка книг
  const [currentPage, setCurrentPage] = useState(1); // Состояние для текущей страницы
  const [loading, setLoading] = useState(true); // Состояние для отслеживания загрузки
  const [error, setError] = useState<string | null>(null); // Состояние для отслеживания ошибок
  const booksPerPage = 10; // Количество книг на одной странице

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/books/all');
        setBooks(response.data);
        setLoading(false); // Устанавливаем, что загрузка завершена
      } catch (err) {
        setError('Failed to fetch books'); // Устанавливаем сообщение об ошибке
        setLoading(false);
      }
    };

    fetchBooks();
  }, []); // Пустой массив зависимостей, чтобы запрос выполнялся один раз при монтировании

  // Расчет индексов текущих книг
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  // Функция для изменения текущей страницы
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return <div><Loader /></div>; // Пока идет загрузка, показываем индикатор загрузки
  }

  if (error) {
    return <div>{error}</div>; // В случае ошибки отображаем сообщение
  }

  return (
    <>
      <BooksListComponent>
        {currentBooks.map((book) => (
          <BookItem
            key={book.id}
            book={book} // Передаем книгу в компонент BookItem
          />
        ))}
        {books.length > booksPerPage && (
  <Pagination
    usersPerPage={booksPerPage}
    totalUsers={books.length}
    paginate={paginate}
    currentPage={currentPage}
  />
)}

      </BooksListComponent>
    </>
  );
}

export default BookList;