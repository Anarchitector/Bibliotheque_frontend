import { useState } from "react"
import { useNavigate } from "react-router-dom" // Импортируем hook для навигации
import {
  InputField,
  SearchButton,
  SearchContainer,
  SelectField,
} from "./styles"
import type { SearchProps, SearchType } from "./types"

function Search({ onSearch }: SearchProps) {
  const placeholderTexts: Record<SearchType, string> = {
    book: "Enter book's title",
    author: "Enter author's name",
    isbn: "Enter ISBN number",
  }

  const [query, setQuery] = useState("")
  const [searchType, setSearchType] = useState<SearchType>("book")
  const navigate = useNavigate() // Используем хук для навигации

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const handleSearchTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSearchType(event.target.value as SearchType)
  }

  const handleSearch = () => {
    if (query.trim() !== "") {
      // Формируем путь и параметры запроса
      const path = `/search?${searchType}=${encodeURIComponent(query.trim())}`
      navigate(path) // Перенаправляем пользователя на страницу поиска
    }
  }

  return (
    <SearchContainer>
      <SelectField
        aria-label="Select search type"
        value={searchType}
        onChange={handleSearchTypeChange}
      >
        <option value="book">Title</option>
        <option value="author">Author</option>
        <option value="isbn">ISBN</option>
      </SelectField>
      <InputField
        type="text"
        aria-label="Book-Search"
        placeholder={placeholderTexts[searchType]}
        value={query}
        onChange={handleInputChange}
      />
      <SearchButton onClick={handleSearch} disabled={!query.trim()}>
        Search
      </SearchButton>
    </SearchContainer>
  )
}

export default Search
