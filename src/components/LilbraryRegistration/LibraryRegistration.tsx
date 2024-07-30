import { useFormik } from "formik"
import * as Yup from "yup"

import Input from "components/Input/Input"
import Button from "components/Button/Button"
import {
  FormRegistContainer,
  FormTitle,
  InputForm,
  LinkComponent,
  RadioBatComponent
} from "./styles"
import type { RegistrationFormValues } from "./types";
import  { LIB_REGISTR_FORM_NAMES } from "./types"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function LibraryRegistration() {
  // обработка линки на радиобаттом //
  // Устанавливаем начальное состояние с первым выбранным радио
  const [selectedOption, setSelectedOption] = useState("user")
  const navigate = useNavigate() // Получаем доступ к истории для навигации

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSelectedOption(value)

    if (value !== "library") {
      // Переход на другую страницу если кликнул не на library
      navigate("/api/bibliotek/register")
    }
  }
  // ------------------- //

  const schema = Yup.object().shape({
    [LIB_REGISTR_FORM_NAMES.NAME]: Yup.string()
        .required("Your library's full name is required for registration")
        .min(5, "A library's name can't be that short"),
    [LIB_REGISTR_FORM_NAMES.COUNTRY]: Yup.string()
        .required("We need to record the country of your library's origin")
        .min(4, "A country's name can't be that short"),
    [LIB_REGISTR_FORM_NAMES.CITY]: Yup.string()
        .required("We need to record the country of your library's origin")
        .min(4, "A country's name can't be that short"),
    [LIB_REGISTR_FORM_NAMES.STREET]: Yup.string()
        .required("We need to record the country of your library's origin")
        .min(4, "A country's name can't be that short"),
    [LIB_REGISTR_FORM_NAMES.NUMBER]: Yup.string()
        .required("We need to record the country of your library's origin")
        .min(4, "A country's name can't be that short"),
    [LIB_REGISTR_FORM_NAMES.ZIP]: Yup.string()
        .required("We need to record the country of your library's origin")
        .min(4, "A country's name can't be that short"),
    [LIB_REGISTR_FORM_NAMES.PHONE]: Yup.string()
        .required("We need to record the country of your library's origin")
        .min(4, "A country's name can't be that short"),
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
      <InputForm>
        <Input
          name={LIB_REGISTR_FORM_NAMES.NAME}
          type="text"
          label="name"
          placeholder="Enter your library's name"
          value={formik.values[LIB_REGISTR_FORM_NAMES.NAME]}
          onChange={formik.handleChange}
          error={formik.errors[LIB_REGISTR_FORM_NAMES.NAME]}
        />   
        <Input
          name={LIB_REGISTR_FORM_NAMES.COUNTRY}
          type="text"
          label="country"
          placeholder="Enter the country the library is registered in"
          value={formik.values[LIB_REGISTR_FORM_NAMES.COUNTRY]}
          onChange={formik.handleChange}
          error={formik.errors[LIB_REGISTR_FORM_NAMES.COUNTRY]}
        />    
        <Input
          name={LIB_REGISTR_FORM_NAMES.CITY}
          type="text"
          label="city"
          placeholder="Enter the city the library is registered in"
          value={formik.values[LIB_REGISTR_FORM_NAMES.CITY]}
          onChange={formik.handleChange}
          error={formik.errors[LIB_REGISTR_FORM_NAMES.CITY]}
        />   
        <Input
          name={LIB_REGISTR_FORM_NAMES.STREET}
          type="text"
          label="street"
          placeholder="Enter the street"
          value={formik.values[LIB_REGISTR_FORM_NAMES.STREET]}
          onChange={formik.handleChange}
          error={formik.errors[LIB_REGISTR_FORM_NAMES.STREET]}
        />   
        <Input
          name={LIB_REGISTR_FORM_NAMES.NUMBER}
          type="text"
          label="number"
          placeholder="Enter library's house number"
          value={formik.values[LIB_REGISTR_FORM_NAMES.NUMBER]}
          onChange={formik.handleChange}
          error={formik.errors[LIB_REGISTR_FORM_NAMES.NUMBER]}
        />   
        <Input
          name={LIB_REGISTR_FORM_NAMES.ZIP}
          type="text"
          label="zip"
          placeholder="Enter library's zip code"
          value={formik.values[LIB_REGISTR_FORM_NAMES.ZIP]}
          onChange={formik.handleChange}
          error={formik.errors[LIB_REGISTR_FORM_NAMES.ZIP]}
        />     
        <Input
          name={LIB_REGISTR_FORM_NAMES.PHONE}
          type="text"
          label="phone"
          placeholder="Enter library's phone"
          value={formik.values[LIB_REGISTR_FORM_NAMES.PHONE]}
          onChange={formik.handleChange}
          error={formik.errors[LIB_REGISTR_FORM_NAMES.PHONE]}
        /> 
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
      </InputForm>
      <RadioBatComponent>
        <label>
          <input
            type="radio"
            value="user"
            name="userType"
            checked={selectedOption === "user"}
            onChange={handleRadioChange}
          />
          Пользователь
        </label>
        <label>
          <input
            type="radio"
            value="library"
            name="userType"
            checked={selectedOption === "library"}
            onChange={handleRadioChange}
          />
          Библиотека
        </label>
      </RadioBatComponent>
      <Button
        name="Зарегистрироваться"
        type="submit"
        disabled={!formik.isValid || !formik.dirty}
      />
      <LinkComponent href="/api/auth/login">Уже есть учетная запись</LinkComponent>
    </FormRegistContainer>
  )
}

export default LibraryRegistration