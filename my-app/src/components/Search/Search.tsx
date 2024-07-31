import { ChangeEvent, useState } from "react"
import {
  InputField,
  SearchButton,
  SearchContainer,
  SelectField,
} from "./styles"
import { SearchProps, SearchType } from "./types"

function Search({ onSearch }: SearchProps) {
  const placeholderTexts: Record<SearchType, string> = {
    book: "Введите название книги",
    author: "Введите фамилию автора",
  }

  const [query, setQuery] = useState("")
  const [searchType, setSearchType] = useState<SearchType>("book")

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const handleSearchTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSearchType(event.target.value as SearchType) // Приведение к типу SearchType
  }

  const handleSearch = () => {
    if (onSearch && query.trim() !== "") {
      onSearch(query.trim())
    }
  }

  return (
    <SearchContainer>
      <SelectField value={searchType} onChange={handleSearchTypeChange}>
        <option value="book">Книга</option>
        <option value="author">Автор</option>
      </SelectField>
      <InputField
        type="text"
        placeholder={placeholderTexts[searchType]} // Типизированный доступ к объекту
        value={query}
        onChange={handleInputChange}
      />
      <SearchButton onClick={handleSearch} disabled={!query.trim()}>
        Поиск
      </SearchButton>
    </SearchContainer>
  )
}

export default Search
