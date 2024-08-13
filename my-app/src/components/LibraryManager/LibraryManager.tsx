import ListOfLibraries from "components/ListOfLibraries/ListOfLibraries";
import RegistrationOfLibrary from "components/RegistrationOfLibrary/RegistrationOfLibrary";
import {
  LinkComponent,
  LibraryListIntro,
  LibraryListContainer
} from "./styles"


function LibraryManager() {
  return (
    <LibraryListContainer>
      <LibraryListIntro>
        Welcome to your library manager!<br />
        <br />
        Here you can:<br />
        - register a new library<br />
        - see the libraries you have already registered (if any)<br />
        - manage existing libraries<br />
        - delete your libraries<br />
      </LibraryListIntro>
      <RegistrationOfLibrary />
      <ListOfLibraries/> 
      <LinkComponent to="/">Return to the main page</LinkComponent>     
    </LibraryListContainer>
  )
}

export default LibraryManager
