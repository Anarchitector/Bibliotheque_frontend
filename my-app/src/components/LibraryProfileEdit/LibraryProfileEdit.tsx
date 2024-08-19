import { useFormik } from "formik"
import * as Yup from "yup"

import Input from "components/Input/Input"
import Button from "components/Button/Button"
import MaskedInput from "react-text-mask"

import type { LibraryRegistrationFormValues } from "./types";
import { LIB_REGISTR_FORM_NAMES } from "./types"

import {
  FormRegistContainer,
  FormTitle,
  InputForm,
  InputForm2,
  MainColumn,
  TwoButtons
} from "./styles"
import { InputContainer, LabelComponent } from "components/Input/styles"
import { useNavigate } from "react-router-dom"
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useDispatch, useSelector } from "react-redux"
import { SITE_MESSAGES } from "assets/messages"
import { librarySliceActions } from "store/redux/librarySlice/librarySlice"
import type { RootState } from "store/store"
import { toast } from "react-toastify"

function LibraryProfileEdit() {

  // navigation //
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const editedLibraryId = useSelector((state: RootState) => state.LIBRARIES_LIST.selectedLibrary)
  console.log("Library about ot be edited has id "+editedLibraryId)
  const editedLibrary = useSelector((state:RootState) => state.LIBRARIES_LIST.librariesList.find(library => library.id === editedLibraryId))
  console.log("That's the library we are about to edit "+JSON.stringify(editedLibrary))

  // American, German, English postal codes //
  const zipRegex =
    /^\d{5}(-\d{4})?$|^\d{5}$|^([A-Z]{1,2}\d{1,2}[A-Z]?)\s?\d[A-Z]{2}$/
  const phoneNumberMask = [
    "+",
    /\d/,
    /\d/,
    " ",
    "(",
    /[1-9]/,
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    " ",
    /\d/,
    /\d/,
    " ",
    /\d/,
    /\d/,
  ]

  // YUP for formik //

  const schema = Yup.object().shape({
    [LIB_REGISTR_FORM_NAMES.NAME]: Yup.string()
      .required(SITE_MESSAGES.LIBRARY_NAME_REQUIRED)
      .matches(/^[^\s].*$/, SITE_MESSAGES.EMPTY_START)
      .min(1, SITE_MESSAGES.LIBRARY_NAME_SHORT),
    [LIB_REGISTR_FORM_NAMES.COUNTRY]: Yup.string()
      .required(SITE_MESSAGES.COUNTRY_REQUIRED_LIBRARY)
      .matches(/^[^\s].*$/, SITE_MESSAGES.EMPTY_START)
      .matches(
        /^[a-zA-Z\s]*$/,
        SITE_MESSAGES.COUNTRY_WRONG,
      )
      .min(4, SITE_MESSAGES.CITY_SHORT),
    [LIB_REGISTR_FORM_NAMES.CITY]: Yup.string()
      .required(SITE_MESSAGES.CITY_REQUIRED_LIBRARY)
      .matches(/^[^\s].*$/, SITE_MESSAGES.EMPTY_START)
      .min(2, SITE_MESSAGES.CITY_SHORT),
    [LIB_REGISTR_FORM_NAMES.STREET]: Yup.string()
      .required(SITE_MESSAGES.STREET_REQUIRED_LIBRARY)
      .matches(/^[^\s].*$/, SITE_MESSAGES.EMPTY_START)
      .min(4, SITE_MESSAGES.STREET_SHORT),
    [LIB_REGISTR_FORM_NAMES.NUMBER]: Yup.string()
      .required(SITE_MESSAGES.NUMBER_REQUIRED_LIBRARY)
      .max(7, SITE_MESSAGES.NUMBER_TOO_LONG)
      .matches(/^[^\s].*$/, SITE_MESSAGES.EMPTY_START)
      .matches(/\d/, SITE_MESSAGES.NUMBER_WRONG),
    [LIB_REGISTR_FORM_NAMES.ZIP]: Yup.string()
      .required(SITE_MESSAGES.ZIP_REQUIRED_LIBRARY)
      .matches(zipRegex, SITE_MESSAGES.ZIP_WRONG),
    [LIB_REGISTR_FORM_NAMES.PHONE]: Yup.string().required(
      SITE_MESSAGES.PHONE_REQUIRED_LIBRARY,
    ),
  })

  // GETTING USER's ID //

  const currentUserID = useSelector((state: RootState) => state.USER.id); //to be used as librarian_id if needed

  // FORMIK //

  const formik = useFormik({
    initialValues: {
      [LIB_REGISTR_FORM_NAMES.NAME]: editedLibrary?.name,
      [LIB_REGISTR_FORM_NAMES.COUNTRY]: editedLibrary?.country,
      [LIB_REGISTR_FORM_NAMES.ZIP]: editedLibrary?.zip,
      [LIB_REGISTR_FORM_NAMES.CITY]: editedLibrary?.city,
      [LIB_REGISTR_FORM_NAMES.STREET]: editedLibrary?.street,
      [LIB_REGISTR_FORM_NAMES.NUMBER]: editedLibrary?.number,
      [LIB_REGISTR_FORM_NAMES.PHONE]: editedLibrary?.phone,
    } as LibraryRegistrationFormValues,
    validationSchema: schema,
    // validateOnChange: true,
    // validateOnMount: true,
    onSubmit: async values => {
      //console.log(values);

      const dataToSubmit = {
        id: editedLibraryId,
        name: values[LIB_REGISTR_FORM_NAMES.NAME],
        country: values[LIB_REGISTR_FORM_NAMES.COUNTRY],
        city: values[LIB_REGISTR_FORM_NAMES.CITY],
        street: values[LIB_REGISTR_FORM_NAMES.STREET],
        number: values[LIB_REGISTR_FORM_NAMES.NUMBER],
        zip: values[LIB_REGISTR_FORM_NAMES.ZIP],
        phone: values[LIB_REGISTR_FORM_NAMES.PHONE]
      }

      console.log("re-submitted data");
      console.log(dataToSubmit);

      try {
        const response = await fetch(
          `http://localhost:8080/api/libraries?=${editedLibraryId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSubmit),
          },
        )     

        const data = await response.json()
        console.log("Registration of Library successful:", data)


        // Диспатчим данные библиотеки и токены в Redux
        dispatch(
          librarySliceActions.setLibrary({
            id: data.id,
            name: data.name,
            country: data.country,
            city: data.city,
            street: data.street,
            number: data.number,
            zip: data.zip,
            phone: data.phone,
            librarian_id: data.librarian_id
          }),
        )
        toast.success("Your library's profile has been updated!")


      } catch (error: any) {
        console.error("Error during library's profile update:", error)
        toast.error(`"Library's profile update has failed..." - ${error}`)
      }
    },
  })

  // RETURN //

  return (
    // <FormRegistContainer action="/submit-form" method="POST">
    <FormRegistContainer
      action="/submit-form"
      method="POST"
      onSubmit={formik.handleSubmit}
    >
      <FormTitle>Please Edit Your Library Profile</FormTitle>
      <MainColumn>
        <InputForm>
          <Input
            name={LIB_REGISTR_FORM_NAMES.NAME}
            type="text"
            label="First Name"
            placeholder="James"
            value={formik.values[LIB_REGISTR_FORM_NAMES.NAME]}
            onChange={formik.handleChange}
            error={formik.errors[LIB_REGISTR_FORM_NAMES.NAME]}
          />
          <Input
            name={LIB_REGISTR_FORM_NAMES.COUNTRY}
            type="text"
            label="Country"
            placeholder="Germany"
            value={formik.values[LIB_REGISTR_FORM_NAMES.COUNTRY]}
            onChange={formik.handleChange}
            error={formik.errors[LIB_REGISTR_FORM_NAMES.COUNTRY]}
          />
          <Input
            name={LIB_REGISTR_FORM_NAMES.ZIP}
            type="text"
            label="ZIP"
            placeholder="96148"
            value={formik.values[LIB_REGISTR_FORM_NAMES.ZIP]}
            onChange={formik.handleChange}
            error={formik.errors[LIB_REGISTR_FORM_NAMES.ZIP]}
          />
          <Input
            name={LIB_REGISTR_FORM_NAMES.CITY}
            type="text"
            label="City"
            placeholder="Bamberg"
            value={formik.values[LIB_REGISTR_FORM_NAMES.CITY]}
            onChange={formik.handleChange}
            error={formik.errors[LIB_REGISTR_FORM_NAMES.CITY]}
          />
        </InputForm>
        <InputForm2>
          <Input
            name={LIB_REGISTR_FORM_NAMES.STREET}
            type="text"
            label="Street"
            placeholder="Marktplatz"
            value={formik.values[LIB_REGISTR_FORM_NAMES.STREET]}
            onChange={formik.handleChange}
            error={formik.errors[LIB_REGISTR_FORM_NAMES.STREET]}
          />
          <Input
            name={LIB_REGISTR_FORM_NAMES.NUMBER}
            type="text"
            label="House number"
            placeholder="25"
            value={formik.values[LIB_REGISTR_FORM_NAMES.NUMBER]}
            onChange={formik.handleChange}
            error={formik.errors[LIB_REGISTR_FORM_NAMES.NUMBER]}
          />
          <InputContainer>
            <LabelComponent>Phone Number</LabelComponent>
            <div className="masked-input-wrapper">
              <MaskedInput
                name={LIB_REGISTR_FORM_NAMES.PHONE}
                type="text"
                mask={phoneNumberMask}
                guide={true}
                placeholder="Enter your phone number"
                onChange={formik.handleChange}
                value={formik.values[LIB_REGISTR_FORM_NAMES.PHONE]}
              />
            </div>
          </InputContainer>
        </InputForm2>
      </MainColumn>

      <TwoButtons>
        <Button
          name="Save Changes"
          type="submit"
          disabled={!formik.isValid || !formik.dirty}
          color="#45A42D"
           onClick={() => {
            formik.handleSubmit(); // Trigger Formik's submit function
            navigate("/api/bibliotek");
          }}  
        />
        <Button
          name="Cancel"
          type="submit"
          onClick={() => {
            navigate("/api/bibliotek");
          }}
        />
      </TwoButtons>
    </FormRegistContainer>
  )
}

export default LibraryProfileEdit