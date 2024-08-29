import { useEffect, useState } from "react";
import {
  LibraryListContainer,
  LibraryListMain,
} from "./styles"
import Library from "components/Library/Library"
import type { ILibrary } from "./types";


function LibrariesList() {
  // State to hold the list of libraries
  const [allLibraries, setAllLibraries] = useState<ILibrary[]>([]);

  // Function to fetch libraries from the server
  const fetchLibraries = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/libraries/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setAllLibraries(data); // Set the fetched libraries to the state
      /* console.log("got libraries"+data)
      dispatch(libraryListSliceActions.setLibrariesList(data)) */
    } catch (error) {
      console.error("Error fetching libraries:", error);
    }
  };

  // Fetch libraries when the component mounts
  useEffect(() => {
    fetchLibraries();
  }, []);



  return (     
    <LibraryListContainer>
      <LibraryListMain>
        {/* <ListTitle>List of all libraries</ListTitle> */}
        {allLibraries.map(
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
              clicksDisabled={true}
            />
          ),
        )}
      </LibraryListMain>
    </LibraryListContainer>    
  )
}

export default LibrariesList
