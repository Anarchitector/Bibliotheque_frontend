import { useEffect, useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import Input from "components/Input/Input"
import Button from "components/Button/Button"
import {
  FormRegistContainer,
  FormTitle,
  InputForm,
  InputForm2,
  MainColumn,
  TwoButtons,
  LabelComponent,
  InputContainer,
} from "./styles"
import type { UserRegistrationFormValues } from "./types"
import { USER_REGISTR_FORM_NAMES } from "./types"
import MaskedInput from "react-text-mask"
import "./styles.css"
import { RootState } from "../../store/store"
import { userSliceActions } from "../../store/redux/userSlice/userSlice"
import { toast } from "react-toastify"

function PersonalCabinet() {
  const [isEdit, setIsEdit] = useState(false)
  const [initialValues, setInitialValues] =
    useState<UserRegistrationFormValues | null>(null) // Начальные значения
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false) // Флаг для отслеживания несохраненных изменений
  const dispatch = useDispatch()

  // Получаем все необходимые данные пользователя из Redux
  const user = useSelector((state: RootState) => state.USER)
  const {
    id: userId,
    email: userEmail,
    role: userRole,
    name: firstName,
    surname: lastName,
    phone: phone,
    country: country,
    zip: zip,
    city: city,
    street: street,
    number: houseNumber,
  } = user

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

  const schema = Yup.object().shape({
    [USER_REGISTR_FORM_NAMES.FIRST_NAME]: Yup.string()
      .required("The field must not be empty")
      .matches(/^[^\s].*$/, "A first name must not start with an empty space")
      .min(1, "You have a name, don't you?"),
    [USER_REGISTR_FORM_NAMES.LAST_NAME]: Yup.string()
      .required("The field must not be empty")
      .matches(/^[^\s].*$/, "A last name must not start with an empty space")
      .min(1, "Your family name is not that embarrassing, is it?"),
    [USER_REGISTR_FORM_NAMES.PHONE]: Yup.string().required(
      "The field must not be empty",
    ),
    [USER_REGISTR_FORM_NAMES.COUNTRY]: Yup.string()
      .required("The field must not be empty")
      .matches(/^[^\s].*$/, "A country name can't start with an empty space")
      .matches(
        /^[a-zA-Z\s]*$/,
        "There probably aren't but letter and spaces in your country's name",
      )
      .min(4, "A country's name can't be that short"),
    [USER_REGISTR_FORM_NAMES.ZIP]: Yup.string()
      .required("The field must not be empty")
      .matches(zipRegex, "Your postal code doesn't match a known pattern"),
    [USER_REGISTR_FORM_NAMES.CITY]: Yup.string()
      .required("The field must not be empty")
      .matches(/^[^\s].*$/, "A city name can't start with an empty space")
      .min(2, "A city's name can't be that short"),
    [USER_REGISTR_FORM_NAMES.STREET]: Yup.string()
      .required("The field must not be empty")
      .matches(/^[^\s].*$/, "A street name can't start with an empty space")
      .min(4, "A street's name can't be that short"),
    [USER_REGISTR_FORM_NAMES.HOUSE_NUMBER]: Yup.string()
      .required("The field must not be empty")
      .max(7, "That's a bit too long for a house number, isn't it?")
      .matches(/^[^\s].*$/, "A house number can't start with an empty space")
      .matches(/\d/, "House number must contain at least one numerical digit"),
  })

  // Устанавливаем начальные значения формы на основе данных из Redux
  const formik = useFormik({
    initialValues: {
      [USER_REGISTR_FORM_NAMES.FIRST_NAME]: firstName || "",
      [USER_REGISTR_FORM_NAMES.LAST_NAME]: lastName || "",
      [USER_REGISTR_FORM_NAMES.PHONE]: phone || "",
      [USER_REGISTR_FORM_NAMES.COUNTRY]: country || "",
      [USER_REGISTR_FORM_NAMES.ZIP]: zip || "",
      [USER_REGISTR_FORM_NAMES.CITY]: city || "",
      [USER_REGISTR_FORM_NAMES.STREET]: street || "",
      [USER_REGISTR_FORM_NAMES.HOUSE_NUMBER]: houseNumber || "",
    } as UserRegistrationFormValues,
    validationSchema: schema,
    onSubmit: async values => {
      try {
        const response = await axios.put(
          "http://localhost:8080/api/users/update",
          {
            email: userEmail,
            name: values[USER_REGISTR_FORM_NAMES.FIRST_NAME],
            surname: values[USER_REGISTR_FORM_NAMES.LAST_NAME],
            country: values[USER_REGISTR_FORM_NAMES.COUNTRY],
            city: values[USER_REGISTR_FORM_NAMES.CITY],
            street: values[USER_REGISTR_FORM_NAMES.STREET],
            number: values[USER_REGISTR_FORM_NAMES.HOUSE_NUMBER],
            zip: values[USER_REGISTR_FORM_NAMES.ZIP],
            phone: values[USER_REGISTR_FORM_NAMES.PHONE],
          },
        )

        dispatch(
          userSliceActions.setUser({
            id: userId,
            email: userEmail,
            name: response.data.name,
            surname: response.data.surname,
            country: response.data.country,
            city: response.data.city,
            street: response.data.street,
            number: response.data.number,
            zip: response.data.zip,
            phone: response.data.phone,
            role: userRole,
          }),
        )

        setInitialValues(formik.values) // Обновляем начальные значения после успешного обновления
        setHasUnsavedChanges(false) // Сброс флага после успешного сохранения

        // Показываем уведомление об успешном обновлении
        toast.success("User data updated successfully!")

        console.log("User data updated successfully", response.data)
      } catch (error) {
        console.error("Failed to update user data", error)
      }
    },
  })

  useEffect(() => {
    if (!initialValues && userEmail) {
      setInitialValues(formik.values)
    }
  }, [userEmail, formik.values, initialValues])

  // const handleCancel = () => {
  //   if (hasUnsavedChanges) {
  //     formik.setValues(initialValues || formik.initialValues)
  //     setHasUnsavedChanges(false)
  //   }
  //   setIsEdit(false)
  // }

  //   Сбрасываем форму и очищаем ошибки, вместо очистки до начального состояния
  const handleCancel = () => {
    if (hasUnsavedChanges) {
      formik.resetForm() // Сбрасываем форму и очищаем ошибки
      setHasUnsavedChanges(false)
    }
    setIsEdit(false)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(event)
    setHasUnsavedChanges(true)
  }

  return (
    <FormRegistContainer
      action="/submit-form"
      method="POST"
      onSubmit={formik.handleSubmit}
    >

      <FormTitle>Welcome to your profile page</FormTitle>
      <div>Fill in your details to further order books.</div>
      <div>
        {isEdit ? (
          <TwoButtons>
            <Button
              name="Save"
              type="submit"
              disabled={!formik.isValid || !formik.dirty}
              onClick={() => {
                formik.handleSubmit()
                setIsEdit(false)
              }}
            />
            <Button name="Cancel" type="button" onClick={handleCancel} />
          </TwoButtons>
        ) : (
          <div>
            <Button
              name="Update Info"
              type="button"
              onClick={() => setIsEdit(true)}
            />
          </div>
        )}
      </div>

      <MainColumn>
        <InputForm>
          <Input
            name={USER_REGISTR_FORM_NAMES.FIRST_NAME}
            type="text"
            label="First Name"
            placeholder="Enter your First Name"
            value={formik.values[USER_REGISTR_FORM_NAMES.FIRST_NAME]}
            onChange={handleChange}
            error={formik.errors[USER_REGISTR_FORM_NAMES.FIRST_NAME]}
            disabled={!isEdit}
          />
          <Input
            name={USER_REGISTR_FORM_NAMES.LAST_NAME}
            type="text"
            label="Last Name"
            placeholder="Enter your Last Name"
            value={formik.values[USER_REGISTR_FORM_NAMES.LAST_NAME]}
            onChange={handleChange}
            error={formik.errors[USER_REGISTR_FORM_NAMES.LAST_NAME]}
            disabled={!isEdit}
          />
          <InputContainer>
            <LabelComponent>Phone Number</LabelComponent>
            <div className="masked-input-wrapper">
              <MaskedInput
                name={USER_REGISTR_FORM_NAMES.PHONE}
                type="text"
                aria-label="Phone Number"
                mask={phoneNumberMask}
                guide={true}
                placeholder="Enter your phone number"
                onChange={handleChange}
                value={formik.values[USER_REGISTR_FORM_NAMES.PHONE]}
                disabled={!isEdit}
              />
            </div>
            {formik.errors[USER_REGISTR_FORM_NAMES.PHONE] && (
              <div className="error">
                {formik.errors[USER_REGISTR_FORM_NAMES.PHONE]}
              </div>
            )}
          </InputContainer>
          <Input
            name={USER_REGISTR_FORM_NAMES.ZIP}
            type="text"
            label="ZIP Code"
            placeholder="Enter your ZIP Code"
            value={formik.values[USER_REGISTR_FORM_NAMES.ZIP]}
            onChange={handleChange}
            error={formik.errors[USER_REGISTR_FORM_NAMES.ZIP]}
            disabled={!isEdit}
          />
        </InputForm>
        <InputForm2>
          <Input
            name={USER_REGISTR_FORM_NAMES.COUNTRY}
            type="text"
            label="Country"
            placeholder="Enter your Country"
            value={formik.values[USER_REGISTR_FORM_NAMES.COUNTRY]}
            onChange={handleChange}
            error={formik.errors[USER_REGISTR_FORM_NAMES.COUNTRY]}
            disabled={!isEdit}
          />
          <Input
            name={USER_REGISTR_FORM_NAMES.CITY}
            type="text"
            label="City"
            placeholder="Enter your City"
            value={formik.values[USER_REGISTR_FORM_NAMES.CITY]}
            onChange={handleChange}
            error={formik.errors[USER_REGISTR_FORM_NAMES.CITY]}
            disabled={!isEdit}
          />
          <Input
            name={USER_REGISTR_FORM_NAMES.STREET}
            type="text"
            label="Street"
            placeholder="Enter your Street"
            value={formik.values[USER_REGISTR_FORM_NAMES.STREET]}
            onChange={handleChange}
            error={formik.errors[USER_REGISTR_FORM_NAMES.STREET]}
            disabled={!isEdit}
          />
          <Input
            name={USER_REGISTR_FORM_NAMES.HOUSE_NUMBER}
            type="text"
            label="House number"
            placeholder="Enter your House number"
            value={formik.values[USER_REGISTR_FORM_NAMES.HOUSE_NUMBER]}
            onChange={handleChange}
            error={formik.errors[USER_REGISTR_FORM_NAMES.HOUSE_NUMBER]}
            disabled={!isEdit}
          />
        </InputForm2>
      </MainColumn>
    </FormRegistContainer>
  )
}

export default PersonalCabinet
