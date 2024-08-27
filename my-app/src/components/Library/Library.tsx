import Button from 'components/Button/Button';
import { LibraryComponent, LibraryContainer, TwoButtons } from './styles'
import type { LibraryProps } from './type'

// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useDispatch } from 'react-redux';
import type { AppDispatch } from 'store/store';
import { libraryListSliceActions } from 'store/redux/libraryListSlice/libraryListSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ViewState } from './type';
import { switchSliceActions } from 'store/redux/switchSlice/switchSlice';


function Library({ id, name, country, city, street, number, zip, phone, librarian_id, onClick, clicksDisabled }: LibraryProps) {

  const [libState, setLibState] = useState<ViewState>(ViewState.ENABLED);
  
  useEffect(() => {
    if (clicksDisabled) {
      setLibState(ViewState.DISABLED);
    } else {
      setLibState(ViewState.ENABLED);
    }
  }, [clicksDisabled]);

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  function handleLibraryAnon(libraryId: string) {
    console.log(`Opening library with ID: ${libraryId}`);
    dispatch(libraryListSliceActions.changeSelectedLibrary({ selectedLibrary: libraryId }))
    dispatch(switchSliceActions.setFrontLLState("books"))
  }

  function handleLibraryOpen(libraryId: string) {
    console.log(`Opening library with ID: ${libraryId}`);
    dispatch(libraryListSliceActions.changeSelectedLibrary({ selectedLibrary: libraryId }))
    navigate("/api/books")
  }

  function handleLibraryEdit(libraryId: string) {
    console.log(`Editing library with ID: ${libraryId}`);
    dispatch(libraryListSliceActions.changeSelectedLibrary({ selectedLibrary: libraryId }))
    navigate("/api/bibliotek/edit")
  }

  async function handleLibraryDelete(libraryId: string) {
    console.log(`Deleting library with ID: ${libraryId}`);
    dispatch(libraryListSliceActions.changeSelectedLibrary({ selectedLibrary: libraryId }))

    try {
      const response = await fetch(
        `http://localhost:8080/api/libraries/${libraryId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      )

      if (response.ok) {
        console.log(`Library with ID: ${libraryId} successfully deleted`);
        setLibState(ViewState.DELETED);
        toast.success("Library successfully deleted!");
      }

    } catch (error: any) {
      console.error("Error during library's removal:", error)
      toast.error(`"Library's removal has failed..." - ${error}`)
    }

  }

  return (   
    <div>
      {libState === ViewState.DISABLED && (<LibraryContainer>
        <LibraryComponent onClick={() => handleLibraryAnon(id)}>
          NAME: {name} <br />
          COUNTRY: {country} <br />
          ZIP CODE and CITY: {zip}, {city} <br />
          ADDRESS: {street}, {number} <br />
          PHONE: {phone}
        </LibraryComponent>
      </LibraryContainer>)}

      {libState === ViewState.ENABLED && (<LibraryContainer>
        <LibraryComponent onClick={() => handleLibraryOpen(id)}>
          ID: {id}, <br />
          NAME: {name}, <br />
          COUNTRY: {country}, <br />
          ZIP CODE and CITY: {zip}, {city}, <br />
          ADDRESS: {street}, {number} <br />
          PHONE: {phone}
        </LibraryComponent>
        <TwoButtons>
          <Button name='Edit Library Profile' color="#4A90E2" onClick={() => handleLibraryEdit(id)}></Button>
          <Button name='Delete Library Profile' color="#D91F13" onClick={() => handleLibraryDelete(id)}></Button>
        </TwoButtons>
      </LibraryContainer>)}

      {libState === ViewState.DELETED && (<></>)}

    </div>
  )
}

export default Library

