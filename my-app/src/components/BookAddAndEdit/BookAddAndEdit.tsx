import type { BookFormValues } from "./types";
import { BOOK_FORM_NAMES, type BookAEProps } from "./types";
import * as Yup from "yup"
import {
  FormRegistContainer,
  FormTitle,
  InputForm,
  MainColumn,
  InputForm2,
  TwoButtons
} from "./styles"
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useDispatch, useSelector } from "react-redux";
import { bookSlice, bookSliceActions } from "store/redux/bookSlice/bookSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import { RootState } from "store/store";
import { SITE_MESSAGES } from "assets/messages";

function BookAddAndEdit({ editSwitch }: BookAEProps) {

  // Shared preparations
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false) // Флаг для отслеживания несохраненных изменений

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      formikAdd.resetForm() // Сбрасываем форму и очищаем ошибки
      setHasUnsavedChanges(false)
    }
  }

  const handleChangeAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
    formikAdd.handleChange(event)
    setHasUnsavedChanges(true)
  }

  const currentLibraryID = useSelector(
    (state: RootState) => state.LIBRARIES_LIST.selectedLibrary,
  )  ; //to be used as libraryId if needed
  

  // Preparation for the version which ADDS the book  

  const schemaAdd = Yup.object().shape({    
    [BOOK_FORM_NAMES.TITLE]: Yup.string()
      .min(3, SITE_MESSAGES.TITLE_SHORT)
      .required(SITE_MESSAGES.TITLE_REQUIRED),
    [BOOK_FORM_NAMES.AUTHOR_NAME]: Yup.string()
      .required(SITE_MESSAGES.AUTHOR_NAME_REQUIRED),
    [BOOK_FORM_NAMES.AUTHOR_SURNAME]: Yup.string()
      .required(SITE_MESSAGES.AUTHOR_SURNAME_REQUIRED),
    [BOOK_FORM_NAMES.YEAR]: Yup.string()
      .matches(/^\d{4}$/, SITE_MESSAGES.YEAR_WRONG)
      .required(SITE_MESSAGES.YEAR_WRONG),
    [BOOK_FORM_NAMES.ISBN]: Yup.string()
      .required(SITE_MESSAGES.ISBN_REQUIRED)
      .matches(/^\d{13}$/, SITE_MESSAGES.ISBN_WRONG),
    [BOOK_FORM_NAMES.PUBLISHER]: Yup.string()
      .required(SITE_MESSAGES.PUBLISHER_REQUIRED),
    [BOOK_FORM_NAMES.QUANTITY]: Yup.string()
      .required(SITE_MESSAGES.QUANTITY_REQUIRED)
  })

  const formikAdd = useFormik({
    initialValues: {
      [BOOK_FORM_NAMES.ID]: "",
      [BOOK_FORM_NAMES.TITLE]: "",
      [BOOK_FORM_NAMES.AUTHOR_NAME]: "",
      [BOOK_FORM_NAMES.AUTHOR_SURNAME]: "",
      [BOOK_FORM_NAMES.YEAR]: "",
      [BOOK_FORM_NAMES.ISBN]: "",
      [BOOK_FORM_NAMES.PUBLISHER]: "",
      [BOOK_FORM_NAMES.LIBRARY_ID]: currentLibraryID,
      [BOOK_FORM_NAMES.QUANTITY]: "0",
      [BOOK_FORM_NAMES.AVAILABLE]: "0",
    } as BookFormValues,
    validationSchema: schemaAdd,
    onSubmit: async values => {

      const dataToSubmit = {
        title: values[BOOK_FORM_NAMES.TITLE],
        authorName: values[BOOK_FORM_NAMES.AUTHOR_NAME],
        authorSurname: values[BOOK_FORM_NAMES.AUTHOR_SURNAME],
        year: values[BOOK_FORM_NAMES.YEAR],
        isbn: values[BOOK_FORM_NAMES.ISBN],
        publisher: values[BOOK_FORM_NAMES.PUBLISHER],
        libraryId: currentLibraryID,
        quantity: values[BOOK_FORM_NAMES.QUANTITY],
        available: values[BOOK_FORM_NAMES.QUANTITY]  
      }

      console.log("Adding following book: ")
      console.log(dataToSubmit)

      try {
        const response = await fetch(
          "http://localhost:8080/api/books",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSubmit),
          },
        )

       if (!response.ok) {
          const errorData = await response.json()
          throw new Error(
            errorData.message || `HTTP error! Status: ${response.status}`,
          )
        }

        const data = await response.json()
        console.log("Registration successful:", data)
        toast.success("Book added to the library!") 

      } catch (error: any) {

        console.error("Error during book addition:", error)
        toast.error("Book addition failed...", error)

      }
    },
  })

  // Preparation for the version which EDITS the book

  return (
    <>
      {editSwitch ? (

        <h1>Edit book here</h1>

      ) : (

        <FormRegistContainer
          action="/submit-form"
          method="POST"
          onSubmit={formikAdd.handleSubmit}
        >
          <FormTitle>Please fill in book data</FormTitle>
          <MainColumn>
            <InputForm>
              <Input
                name={BOOK_FORM_NAMES.TITLE}
                type="text"
                label="Book title"
                placeholder="Enter book's title"
                value={formikAdd.values[BOOK_FORM_NAMES.TITLE]}
                onChange={handleChangeAdd}
                error={formikAdd.errors[BOOK_FORM_NAMES.TITLE]}
              />
              <Input
                name={BOOK_FORM_NAMES.AUTHOR_NAME}
                type="text"
                label="Author's name"
                placeholder="Enter author's name"
                value={formikAdd.values[BOOK_FORM_NAMES.AUTHOR_NAME]}
                onChange={handleChangeAdd}
                error={formikAdd.errors[BOOK_FORM_NAMES.AUTHOR_NAME]}
              />
              <Input
                name={BOOK_FORM_NAMES.AUTHOR_SURNAME}
                type="text"
                label="Author's surname"
                placeholder="Enter author's surname"
                value={formikAdd.values[BOOK_FORM_NAMES.AUTHOR_SURNAME]}
                onChange={handleChangeAdd}
                error={formikAdd.errors[BOOK_FORM_NAMES.AUTHOR_SURNAME]}
              />
              <Input
                name={BOOK_FORM_NAMES.YEAR}
                type="year"
                label="Year of publication"
                placeholder="Enter year of publication"
                value={formikAdd.values[BOOK_FORM_NAMES.YEAR]}
                onChange={handleChangeAdd}
                error={formikAdd.errors[BOOK_FORM_NAMES.YEAR]}
              />
              
              
            </InputForm>
            <InputForm2>
              <Input
                name={BOOK_FORM_NAMES.ISBN}
                type="text"
                label="ISBN"
                placeholder="Enter book's ISBN"
                value={formikAdd.values[BOOK_FORM_NAMES.ISBN]}
                onChange={handleChangeAdd}
                error={formikAdd.errors[BOOK_FORM_NAMES.ISBN]}
              />
              <Input
                name={BOOK_FORM_NAMES.PUBLISHER}
                type="text"
                label="Publisher"
                placeholder="Enter book's publisher"
                value={formikAdd.values[BOOK_FORM_NAMES.PUBLISHER]}
                onChange={handleChangeAdd}
                error={formikAdd.errors[BOOK_FORM_NAMES.PUBLISHER]}
              />
              <Input
                name={BOOK_FORM_NAMES.QUANTITY}
                type="number"
                label="Number of books"
                placeholder="Enter the amount"
                value={formikAdd.values[BOOK_FORM_NAMES.QUANTITY]}
                onChange={handleChangeAdd}
                error={formikAdd.errors[BOOK_FORM_NAMES.QUANTITY]}
              />          

            </InputForm2>
          </MainColumn>
          <TwoButtons>
            <Button
              name="Add new book"
              type="submit"
              disabled={!formikAdd.isValid || !formikAdd.dirty}
              color="#45A42D"
              /* onClick={() => {
                formikAdd.handleSubmit()
                //mixed poorly with input form, producing double book addition request
              }} */
            />
            <Button name="Cancel" type="button" onClick={handleCancel} />
          </TwoButtons>

        </FormRegistContainer>
      )}
    </>


  )
}

export default BookAddAndEdit