import { useState } from 'react';
import BookItem from './BookItem'; // Импортируем компонент для отображения книги
import Pagination from 'components/Pagination/Pagination';
import { BooksListComponent, PageTitle } from './stylesList';

const defaultBooks = [
  { id: 1, title: 'Book One', author: 'Author One', isbn: '123456', publisher: 'Publisher One', year: '2021' },
  { id: 2, title: 'Book Two', author: 'Author Two', isbn: '789012', publisher: 'Publisher Two', year: '2020' },
  { id: 3, title: 'Book Three', author: 'Author Three', isbn: '345678', publisher: 'Publisher Three', year: '2019' },
  { id: 4, title: 'Book Four', author: 'Author Four', isbn: '901234', publisher: 'Publisher Four', year: '2018' },
  // Добавьте больше книг, если нужно
];

function BookList() {
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 2; // Количество книг на одной странице

  // Расчет индексов текущих книг
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = defaultBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Функция для изменения текущей страницы
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <BooksListComponent>
          <PageTitle>
              <h3>List of books</h3>            
          </PageTitle>
        {currentBooks.map((book) => (
          <BookItem
            key={book.id}
            book={book} // Передаем книгу в компонент BookItem
          />
        ))}
        <Pagination
          usersPerPage={booksPerPage}
          totalUsers={defaultBooks.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </BooksListComponent>
    </>
    
  );
}

export default BookList;
