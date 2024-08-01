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
import { REGISTR_FORM_NAMES, LoginFormValues } from "./types"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function FormRegistrUser() {
  // обработка линки на радиобаттом //
  // Устанавливаем начальное состояние с первым выбранным радио
  const [selectedOption, setSelectedOption] = useState("user")
  const navigate = useNavigate() // Получаем доступ к истории для навигации

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSelectedOption(value)

    if (value === "library") {
      // Переход на другую страницу при выборе опции 'library'
      navigate("/api/bibliotek/register")
    }
  }
  // ------------------- //

  const schema = Yup.object().shape({
    [REGISTR_FORM_NAMES.EMAIL]: Yup.string()
      .required("Email required.")
      .email("Input does not correspond with an email"),
    [REGISTR_FORM_NAMES.PASSWORD]: Yup.string()
      .required("Password required.")
      .min(8, "Password must contain at least 8 symbols.")
      .matches(/[a-z]/, "Password must contain at least one small letter.")
      .matches(/[A-Z]/, "Password must contain at least one capital letter.")
      .matches(/\d/, "Password must contain at least one numerical digit.")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special symbol",
      ),
    [REGISTR_FORM_NAMES.REPEAT_PASSWORD]: Yup.string()
      .oneOf(
        [Yup.ref(REGISTR_FORM_NAMES.PASSWORD), undefined],
        "Passwords must coincide.",
      )
      .required(
        "Repeat password is required. It must coincide with your password.",
      ),
  })

  const formik = useFormik({
    initialValues: {
      [REGISTR_FORM_NAMES.EMAIL]: "",
      [REGISTR_FORM_NAMES.PASSWORD]: "",
      [REGISTR_FORM_NAMES.REPEAT_PASSWORD]: "",
    } as LoginFormValues,
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
      <FormTitle>Create an account</FormTitle>
      <InputForm>
        <Input
          name={REGISTR_FORM_NAMES.EMAIL}
          type="email"
          label="Email*"
          placeholder="Enter email"
          value={formik.values[REGISTR_FORM_NAMES.EMAIL]}
          onChange={formik.handleChange}
          error={formik.errors[REGISTR_FORM_NAMES.EMAIL]}
        />
        <Input
          name={REGISTR_FORM_NAMES.PASSWORD}
          type="password"
          label="Password*"
          placeholder="Enter password"
          value={formik.values[REGISTR_FORM_NAMES.PASSWORD]}
          onChange={formik.handleChange}
          error={formik.errors[REGISTR_FORM_NAMES.PASSWORD]}
        />
        <Input
          name={REGISTR_FORM_NAMES.REPEAT_PASSWORD}
          type="password"
          label="Repeat password*"
          placeholder="Repeat password"
          value={formik.values[REGISTR_FORM_NAMES.REPEAT_PASSWORD]}
          onChange={formik.handleChange}
          error={formik.errors[REGISTR_FORM_NAMES.REPEAT_PASSWORD]}
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
      <LinkComponent href="/api/auth/login">Do you already have an account?</LinkComponent>
    </FormRegistContainer>
  )
}

export default FormRegistrUser
