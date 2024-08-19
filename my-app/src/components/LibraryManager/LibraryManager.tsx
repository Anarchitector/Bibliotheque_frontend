import {
  LinkComponent,
  LibraryListIntro,
  LibraryListContainer,
  ListTitle,
  LibraryListMain,
} from "./styles"
import Button from "components/Button/Button"
import { useNavigate } from "react-router-dom"
import type { AppDispatch } from "store/store"
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "store/store"
import { useEffect, useState } from "react"
import { fetchList } from "store/redux/libraryListSlice/libraryListSlice"
import Library from "components/Library/Library"

function LibraryManager() {
  const navigate = useNavigate()
  const handleRegisterClick = () => {
    navigate("/api/bibliotek/register")
  }

  // Library List

  /* const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchList())
  }, [dispatch])
  const libraryList = useSelector(
    (state: RootState) => state.LIBRARIES_LIST.librariesList,
  )   */
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchList());
    }, 500); // 1000 milliseconds = 1 second
    // Cleanup the timer if the component is unmounted before the timeout
    return () => clearTimeout(timer);
  }, [dispatch]);
  const libraryList = useSelector(
    (state: RootState) => state.LIBRARIES_LIST.librariesList,
  );

  //delay effect for the list
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Set a delay of 2 seconds (2000 milliseconds)
    const timer = setTimeout(() => {
      setShowContent(true); // Update the state to show the content
    }, 1000);

    // Cleanup the timer if the component is unmounted before the delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <LibraryListContainer>
      <LibraryListIntro>
        Welcome to your library manager!
        <br />
        <br />
        Here you can:
        <br />
        - register a new library
        <br />
        - see the libraries you have already registered (if any)
        <br />
        - manage existing libraries
        <br />
        - delete your libraries
        <br />
      </LibraryListIntro>
      <div>
        <Button
          name="Register a new library"
          color="#45A42D"
          onClick={handleRegisterClick}
        />
      </div>
      {/* If the array is empty - provide message that there are no libraries, else - turn on libraries list */}
      <div> { showContent ? (
        <div>
        {libraryList.length === 0 ? (
          <p>No libraries so far...</p>
        ) : (
          <LibraryListMain>
            <ListTitle>Your Libraries</ListTitle>
            {libraryList.map(
              ({
                id,
                name,
                country,
                city,
                street,
                number,
                zip,
                phone,
                librarian_id,
              }) => (
                <Library
                  key={id}
                  id={id}
                  name={name}
                  country={country}
                  city={city}
                  street={street}
                  number={number}
                  zip={zip}
                  phone={phone}
                  librarian_id={librarian_id}
                />
              ),
            )}
          </LibraryListMain>
        )}
      </div>

      ) : (
        <h2>Looking up your libraries... </h2>

      ) }</div>
      
      

      {/* <LinkComponent to="/">Return to the main page</LinkComponent> */}
    </LibraryListContainer>
  )
}

export default LibraryManager
