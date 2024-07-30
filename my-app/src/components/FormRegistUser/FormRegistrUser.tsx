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
      .required("Поле email обязательно для заполнения")
      .email("Значение не соответствует формату email"),
    [REGISTR_FORM_NAMES.PASSWORD]: Yup.string()
      .required("Поле password обязательно для заполнения")
      .min(8, "Пароль должен содержать минимум 8 символов")
      .matches(/[a-z]/, "Пароль должен содержать хотя бы одну строчную букву")
      .matches(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
      .matches(/\d/, "Пароль должен содержать хотя бы одну цифру")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Пароль должен содержать хотя бы один специальный символ",
      ),
    [REGISTR_FORM_NAMES.REPEAT_PASSWORD]: Yup.string()
      .oneOf(
        [Yup.ref(REGISTR_FORM_NAMES.PASSWORD), undefined],
        "Пароли должны совпадать",
      )
      .required(
        "Поле обязательно для заполнения и оно должно совпадать с вашим паролем",
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
      <FormTitle>Создать учетную запись</FormTitle>
      <InputForm>
        <Input
          name={REGISTR_FORM_NAMES.EMAIL}
          type="email"
          label="Email*"
          placeholder="Введите email"
          value={formik.values[REGISTR_FORM_NAMES.EMAIL]}
          onChange={formik.handleChange}
          error={formik.errors[REGISTR_FORM_NAMES.EMAIL]}
        />
        <Input
          name={REGISTR_FORM_NAMES.PASSWORD}
          type="password"
          label="Password*"
          placeholder="Введите пароль"
          value={formik.values[REGISTR_FORM_NAMES.PASSWORD]}
          onChange={formik.handleChange}
          error={formik.errors[REGISTR_FORM_NAMES.PASSWORD]}
        />
        <Input
          name={REGISTR_FORM_NAMES.REPEAT_PASSWORD}
          type="password"
          label="Repeat password*"
          placeholder="Повторите пароль"
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

export default FormRegistrUser
