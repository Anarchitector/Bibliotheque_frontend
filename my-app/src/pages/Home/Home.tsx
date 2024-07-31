import Search from "components/Search/Search"
import { SearchBoxComponent, SearchConteiner, Title } from "./styles"

function Home() {
  return (
    <SearchBoxComponent>
      <Title>All available books and libraries - for you.</Title>
      <SearchConteiner>
        <Search
          onSearch={function (query: string): void {
            throw new Error("Function not implemented.")
          }}
        />
      </SearchConteiner>
    </SearchBoxComponent>
  )
}

export default Home
