import { useFormik } from "formik"
import * as Yup from "yup"

import Input from "components/Input/Input"
import Button from "components/Button/Button"
import {
  FormRegistContainer,
  FormTitle,
  InputForm,
  InputForm2,
  LinkComponent,
  MainColumn,
  RadioBatComponent
} from "./styles"
import type { RegistrationFormValues } from "./types";
import  { LIB_REGISTR_FORM_NAMES } from "./types"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function LibraryRegistration() {
  // обработка линки на радиобаттом //
  // Устанавливаем начальное состояние с первым выбранным радио
  const [selectedOption, setSelectedOption] = useState("library")
  const navigate = useNavigate() // Получаем доступ к истории для навигации

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSelectedOption(value)

    if (value === "user") {
      // Переход на другую страницу если кликнул не на library
      navigate("/api/auth/register")
    }
  }
  // ------------------- //

  const schema = Yup.object().shape({
    [LIB_REGISTR_FORM_NAMES.NAME]: Yup.string()
        .required("Your library's full name is required for registration")
        .min(5, "A library's name can't be that short"),
    [LIB_REGISTR_FORM_NAMES.COUNTRY]: Yup.string()
        .required("We need to record the country of your library's origin")
        .matches(/^[a-zA-Z\s]*$/, "There probably aren't but letter and spaces in your country's name")
        .min(4, "A country's name can't be that short"),        
    [LIB_REGISTR_FORM_NAMES.CITY]: Yup.string()
        .required("We need to record the city of your library's origin")
        .min(2, "A city's name can't be that short"),
    [LIB_REGISTR_FORM_NAMES.STREET]: Yup.string()
        .required("We need to record the street where your library is located")
        .min(4, "A country's name can't be that short"),
    [LIB_REGISTR_FORM_NAMES.NUMBER]: Yup.string()
        .required("We need to record the house number where your library is located")
        .max(7, "That's a bit too long for a house number, isn't it?")
        .matches(/\d/, "House number must contain at least one numerical digit"),
    [LIB_REGISTR_FORM_NAMES.ZIP]: Yup.string()
        .required("We need your library's ZIP code")
        .min(5, "A zip number can't be that short")
        .max(9, "A zip number can't be that long")
        .matches(/^\d+$/, "ZIP code can only contain numbers"),
    [LIB_REGISTR_FORM_NAMES.PHONE]: Yup.string()
        .required("Please don't forget library's phone number")
        .min(5, "A phone number can't be that short"),
    [LIB_REGISTR_FORM_NAMES.EMAIL]: Yup.string()
      .required("Email required for registration")
      .email("This is not an acceptable email"),
    [LIB_REGISTR_FORM_NAMES.PASSWORD]: Yup.string()
      .required("Password required for registration")
      .min(8, "Password must contain 8 symbols")
      .matches(/[a-z]/, "Password must contain at least one small letter")
      .matches(/[A-Z]/, "Password must contain at least one capital letter")
      .matches(/\d/, "Password must contain at least one numerical digit")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special symbol",
      ),
    [LIB_REGISTR_FORM_NAMES.REPEAT_PASSWORD]: Yup.string()
      .oneOf(
        [Yup.ref(LIB_REGISTR_FORM_NAMES.PASSWORD), undefined],
        "Password and repeat password must be the same",
      )
      .required(
        "Repeat password is required for registration and must be the same as password",
      ),
  })

  const formik = useFormik({
    initialValues: {
        [LIB_REGISTR_FORM_NAMES.NAME]: "",
        [LIB_REGISTR_FORM_NAMES.COUNTRY]: "",
        [LIB_REGISTR_FORM_NAMES.CITY]: "",
        [LIB_REGISTR_FORM_NAMES.STREET]: "",
        [LIB_REGISTR_FORM_NAMES.NUMBER]: "",
        [LIB_REGISTR_FORM_NAMES.ZIP]: "",
        [LIB_REGISTR_FORM_NAMES.PHONE]: "",
        [LIB_REGISTR_FORM_NAMES.EMAIL]: "",
        [LIB_REGISTR_FORM_NAMES.PASSWORD]: "",
        [LIB_REGISTR_FORM_NAMES.REPEAT_PASSWORD]: "",
    } as RegistrationFormValues,
    validationSchema: schema,
    // validateOnChange: true,
    // validateOnMount: true,
    onSubmit: values => {
      console.log(values)
    },
  })

  return (
    // <FormRegistContainer action="/submit-form" method="POST">
    <FormRegistContainer
      action="/submit-form"
      method="POST"
      onSubmit={formik.handleSubmit}
    >
      <FormTitle>Register Your Library</FormTitle>  
      <MainColumn>
      <InputForm>        
        <Input
          name={LIB_REGISTR_FORM_NAMES.NAME}
          type="text"
          label="Name"
          placeholder="Enter your library's name"
          value={formik.values[LIB_REGISTR_FORM_NAMES.NAME]}
          onChange={formik.handleChange}
          error={formik.errors[LIB_REGISTR_FORM_NAMES.NAME]}
        />   
        <Input
          name={LIB_REGISTR_FORM_NAMES.COUNTRY}
          type="text"
          label="Country"
          placeholder="Enter the country the library is registered in"
          value={formik.values[LIB_REGISTR_FORM_NAMES.COUNTRY]}
          onChange={formik.handleChange}
          error={formik.errors[LIB_REGISTR_FORM_NAMES.COUNTRY]}
        />    
        <Input
          name={LIB_REGISTR_FORM_NAMES.CITY}
          type="text"
          label="City"
          placeholder="Enter the city the library is registered in"
          value={formik.values[LIB_REGISTR_FORM_NAMES.CITY]}
          onChange={formik.handleChange}
          error={formik.errors[LIB_REGISTR_FORM_NAMES.CITY]}
        />   
        <Input
          name={LIB_REGISTR_FORM_NAMES.STREET}
          type="text"
          label="Street"
          placeholder="Enter the street"
          value={formik.values[LIB_REGISTR_FORM_NAMES.STREET]}
          onChange={formik.handleChange}
          error={formik.errors[LIB_REGISTR_FORM_NAMES.STREET]}
        />   
        <Input
          name={LIB_REGISTR_FORM_NAMES.NUMBER}
          type="text"
          label="House number"
          placeholder="Enter library's house number"
          value={formik.values[LIB_REGISTR_FORM_NAMES.NUMBER]}
          onChange={formik.handleChange}
          error={formik.errors[LIB_REGISTR_FORM_NAMES.NUMBER]}
        />   
        <Input
          name={LIB_REGISTR_FORM_NAMES.ZIP}
          type="text"
          label="ZIP"
          placeholder="Enter library's zip code"
          value={formik.values[LIB_REGISTR_FORM_NAMES.ZIP]}
          onChange={formik.handleChange}
          error={formik.errors[LIB_REGISTR_FORM_NAMES.ZIP]}
        />     
        <Input
          name={LIB_REGISTR_FORM_NAMES.PHONE}
          type="text"
          label="Phone"
          placeholder="Enter library's phone"
          value={formik.values[LIB_REGISTR_FORM_NAMES.PHONE]}
          onChange={formik.handleChange}
          error={formik.errors[LIB_REGISTR_FORM_NAMES.PHONE]}
        /> 
        </InputForm>
        <InputForm2>
        <Input
          name={LIB_REGISTR_FORM_NAMES.EMAIL}
          type="email"
          label="Email*"
          placeholder="Введите email"
          value={formik.values[LIB_REGISTR_FORM_NAMES.EMAIL]}
          onChange={formik.handleChange}
          error={formik.errors[LIB_REGISTR_FORM_NAMES.EMAIL]}
        />
        <Input
          name={LIB_REGISTR_FORM_NAMES.PASSWORD}
          type="password"
          label="Password*"
          placeholder="Введите пароль"
          value={formik.values[LIB_REGISTR_FORM_NAMES.PASSWORD]}
          onChange={formik.handleChange}
          error={formik.errors[LIB_REGISTR_FORM_NAMES.PASSWORD]}
        />
        <Input
          name={LIB_REGISTR_FORM_NAMES.REPEAT_PASSWORD}
          type="password"
          label="Repeat password*"
          placeholder="Повторите пароль"
          value={formik.values[LIB_REGISTR_FORM_NAMES.REPEAT_PASSWORD]}
          onChange={formik.handleChange}
          error={formik.errors[LIB_REGISTR_FORM_NAMES.REPEAT_PASSWORD]}
        />
      
      <RadioBatComponent>
        <label>
          <input
            type="radio"
            value="user"
            name="userType"
            checked={selectedOption === "user"}
            onChange={handleRadioChange}
          />
          User
        </label>
        <label>
          <input
            type="radio"
            value="library"
            name="userType"
            checked={selectedOption === "library"}
            onChange={handleRadioChange}
          />
          Library
        </label>
      </RadioBatComponent>
      <Button
        name="Register"
        type="submit"
        disabled={!formik.isValid || !formik.dirty}
      />
      </InputForm2>
      </MainColumn>
      <LinkComponent href="/api/auth/login">Already registered user?</LinkComponent>
    </FormRegistContainer>
  )
}

export default LibraryRegistration