import { useFormik } from "formik"
import * as Yup from "yup"

import Input from "components/Input/Input"
import Button from "components/Button/Button"
import {
  FormRegistContainer,
  FormTitle,
  InputForm,
  LinkComponent,
} from "./styles"
import { REGISTR_FORM_NAMES, LoginFormValues } from "./types"

function FormRegistrUser() {
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
      .oneOf([Yup.ref(REGISTR_FORM_NAMES.PASSWORD), undefined], "Пароли должны совпадать")
      .required("Поле обязательно для заполнения и оно должно совпадать с вашим паролем"),
  })

  const formik = useFormik({
    initialValues: {
      [REGISTR_FORM_NAMES.EMAIL]: '',
      [REGISTR_FORM_NAMES.PASSWORD]: '',
      [REGISTR_FORM_NAMES.REPEAT_PASSWORD]: '',
    } as LoginFormValues,
    validationSchema: schema,
    // validateOnChange: true,
    // validateOnMount: true,
    onSubmit: (values) => {
      console.log(values)
    },
  })

  return (
    // <FormRegistContainer action="/submit-form" method="POST">
    <FormRegistContainer action="/submit-form" method="POST" onSubmit={formik.handleSubmit}>
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
      <Button name="Зарегистрироваться" type="submit" disabled={!formik.isValid || !formik.dirty} />
      <LinkComponent href="#">Уже есть учетная запись</LinkComponent>
    </FormRegistContainer>
  )
}

export default FormRegistrUser
