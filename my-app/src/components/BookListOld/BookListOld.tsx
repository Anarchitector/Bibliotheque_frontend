import { useFormik } from "formik"
import * as Yup from "yup"
import { useState } from "react"

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

function BookListOld() {
  
  return (
    <h1>Your Books</h1>
    
  )
}

export default BookListOld