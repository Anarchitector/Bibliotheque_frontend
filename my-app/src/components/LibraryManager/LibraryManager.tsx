import ListOfLibraries from "components/ListOfLibraries/ListOfLibraries";
import RegistrationOfLibrary from "components/RegistrationOfLibrary/RegistrationOfLibrary";
import {
  LinkComponent,
  LibraryListIntro,
  LibraryListContainer
} from "./styles"
import Button from "components/Button/Button";
import { useNavigate } from "react-router-dom";


function LibraryManager() {

  const navigate = useNavigate();  
  const handleRegisterClick = () => {
    navigate("/api/bibliotek/register");
  }

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
      <Button
          name="Register a new library"
          color="#45A42D"
          onClick={handleRegisterClick}
      />
      <ListOfLibraries/> 
      <LinkComponent to="/">Return to the main page</LinkComponent>     
    </LibraryListContainer>
  )
}

export default LibraryManager
