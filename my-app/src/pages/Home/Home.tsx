import Search from "components/Search/Search"
import { HomePageComponent, SearchBoxComponent, SearchConteiner, Title } from "./styles"
import { useSelector } from "react-redux"
import { RootState } from "store/store"
import HomeTabs from "components/HomeTabs/HomeTabs"

function Home() {

  const user = useSelector((state: RootState) => state.USER)

  

  return (
    <HomePageComponent>
    <SearchBoxComponent>
      <Title>All available books and libraries - for you</Title>
      <SearchConteiner>
        <Search
          onSearch={function (query: string): void {
            throw new Error("Function not implemented.")
          }}
        />
      </SearchConteiner>
      {/* <div>
        <p>ID: {user.id}</p>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
      </div> */}
    </SearchBoxComponent>

    <HomeTabs/>
    </HomePageComponent>
  )
}

export default Home
