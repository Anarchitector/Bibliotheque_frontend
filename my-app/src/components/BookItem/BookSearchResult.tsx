import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"
import BookItem from "./BookItem"
import Pagination from "components/Pagination/Pagination"
import { BooksListComponent } from "./stylesList"
import { BookProps } from "./types"
import Loader from "components/Loader/Loader"

function BookSearchResult() {
  const [books, setBooks] = useState<BookProps["book"][]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const booksPerPage = 10

  const location = useLocation()

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true)
      setError(null)

      const searchParams = new URLSearchParams(location.search)
      let url = ""

      if (searchParams.has("book")) {
        url = `http://localhost:8080/api/books/title=${searchParams.get("book")}`
      } else if (searchParams.has("author")) {
        url = `http://localhost:8080/api/books/author=${searchParams.get("author")}`
      } else if (searchParams.has("isbn")) {
        url = `http://localhost:8080/api/books/isbn=${searchParams.get("isbn")}`
      }

      try {
        const response = await axios.get(url)
        setBooks(response.data)
      } catch (err) {
        setError("Failed to fetch books")
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [location.search])

  const indexOfLastBook = currentPage * booksPerPage
  const indexOfFirstBook = indexOfLastBook - booksPerPage
  const currentBooks = books.slice(
    indexOfFirstBook,
    indexOfFirstBook + booksPerPage,
  )

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <>
      <BooksListComponent>
        {currentBooks.map(book => (
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
  )
}

export default BookSearchResult
