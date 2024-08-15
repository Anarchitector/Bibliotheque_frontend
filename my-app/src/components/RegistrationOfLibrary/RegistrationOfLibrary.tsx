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
import { useNavigate } from "react-router-dom"

function RegistrationOfLibrary() {

  // navigation //
  const navigate = useNavigate();

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
      .required("Library name is required to complete your registration")
      .matches(/^[^\s].*$/, "Library name must not start with an empty space")
      .min(1, "You have a name, don't you?"),
    [LIB_REGISTR_FORM_NAMES.COUNTRY]: Yup.string()
      .required("We need to record your country of origin")
      .matches(/^[^\s].*$/, "A country name can't start with an empty space")
      .matches(
        /^[a-zA-Z\s]*$/,
        "There probably aren't but letter and spaces in your country's name",
      )
      .min(4, "A country's name can't be that short"),
    [LIB_REGISTR_FORM_NAMES.CITY]: Yup.string()
      .required("We need to record your city of origin")
      .matches(/^[^\s].*$/, "A city name can't start with an empty space")
      .min(2, "A city's name can't be that short"),
    [LIB_REGISTR_FORM_NAMES.STREET]: Yup.string()
      .required("We need to record your street")
      .matches(/^[^\s].*$/, "A street name can't start with an empty space")
      .min(4, "A street's name can't be that short"),
    [LIB_REGISTR_FORM_NAMES.NUMBER]: Yup.string()
      .required("We need to record your house number")
      .max(7, "That's a bit too long for a house number, isn't it?")
      .matches(/^[^\s].*$/, "A house number can't start with an empty space")
      .matches(/\d/, "House number must contain at least one numerical digit"),
    [LIB_REGISTR_FORM_NAMES.ZIP]: Yup.string()
      .required("We need your ZIP code")
      .matches(zipRegex, "Your postal code doesn't patch a known pattern"),
    [LIB_REGISTR_FORM_NAMES.PHONE]: Yup.string().required(
      "Please don't forget your phone number",
    ),
  })

  // FORMIK //

  const formik = useFormik({
    initialValues: {
      [LIB_REGISTR_FORM_NAMES.NAME]: "",
      [LIB_REGISTR_FORM_NAMES.COUNTRY]: "",
      [LIB_REGISTR_FORM_NAMES.ZIP]: "",
      [LIB_REGISTR_FORM_NAMES.CITY]: "",
      [LIB_REGISTR_FORM_NAMES.STREET]: "",
      [LIB_REGISTR_FORM_NAMES.NUMBER]: "",
      [LIB_REGISTR_FORM_NAMES.PHONE]: "",
    } as LibraryRegistrationFormValues,
    validationSchema: schema,
    // validateOnChange: true,
    // validateOnMount: true,
    onSubmit: values => {
      console.log(values)
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
      <FormTitle>Please fill out Library Registration Form</FormTitle>
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
          name="Register"
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

export default RegistrationOfLibrary