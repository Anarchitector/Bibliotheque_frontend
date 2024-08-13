import { useFormik } from "formik"
import * as Yup from "yup"
import Input from "components/Input/Input"
import Button from "components/Button/Button"
import {
  FieldSetComponent,
  FormRegistContainer,
  FormTitle,
  InputForm,
  LinkComponent,
  RadioBatComponent,
} from "./styles"
import { REGISTR_FORM_NAMES, LoginFormValues } from "./types"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { userSliceActions } from "../../store/redux/userSlice/userSlice"

function FormRegistrUserNew() {
  const [selectedOption, setSelectedOption] = useState("user")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSelectedOption(value)
  }

  const schema = Yup.object().shape({
    [REGISTR_FORM_NAMES.EMAIL]: Yup.string()
      .required("Email required.")
      .email("Input does not correspond with an email")
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Email must contain a valid domain with a dot (e.g., example.com)",
      ),
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
    onSubmit: async values => {
      const role = selectedOption === "library" ? "ROLE_LIBRARY" : "ROLE_USER"
      const dataToSubmit = {
        email: values[REGISTR_FORM_NAMES.EMAIL],
        password: values[REGISTR_FORM_NAMES.PASSWORD],
        role: role,
      }

      console.log(dataToSubmit)

      try {
        const response = await fetch(
          "http://localhost:8080/api/users/register",
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

        // Диспатчим данные пользователя и токены в Redux
        dispatch(
          userSliceActions.setUser({
            id: data.id,
            email: data.email, // Получаем email из ответа, если он есть
            role: role,
          }),
        )
        dispatch(
          userSliceActions.setTokens({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          }),
        )

        // Навигация на страницу личного кабинета
        navigate(`/api/users/${data.id}`)
      } catch (error: any) {
        console.error("Error during registration:", error)

        // Обработка ошибки
        const errorMessage =
          error instanceof Error ? error.message : String(error)
        navigate("/api/auth/error", { state: { error: errorMessage } })
      }
    },
  })

  return (
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

      <FieldSetComponent>
      <legend>Select Account Type</legend>
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
      </FieldSetComponent>

      <Button
        name="Register"
        type="submit"
        disabled={!formik.isValid || !formik.dirty}
      />
      <LinkComponent href="/api/auth/login">
        Do you already have an account?
      </LinkComponent>
    </FormRegistContainer>
  )
}

export default FormRegistrUserNew
