import { useEffect, useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
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
  UserCard,
  ProfileInfo,
  InfoItem,
  UserCardTitle,
  UserCardContainer,
  UserCardWarning,
} from "./styles"
import type { UserRegistrationFormValues } from "./types"
import { USER_REGISTR_FORM_NAMES } from "./types"
import MaskedInput from "react-text-mask"
import "./styles.css"
import type { RootState } from "../../store/store"
import { userSliceActions } from "../../store/redux/userSlice/userSlice"
import { toast } from "react-toastify"
import { switchSliceActions } from "store/redux/switchSlice/switchSlice"
import { SITE_MESSAGES } from "assets/messages"



function PersonalCabinet() {
  const profileState = useSelector((state: RootState) => state.SWITCH.profileState);
  const [initialValues, setInitialValues] = useState<UserRegistrationFormValues | null>(null) // Начальные значения
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false) // Флаг для отслеживания несохраненных изменений
  const dispatch = useDispatch()
  const aT = useSelector((state: RootState) => state.USER.accessToken)

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
      .required(SITE_MESSAGES.FIRST_NAME_REQUIRED)
      .matches(/^[^\s].*$/, SITE_MESSAGES.EMPTY_START)
      .min(1, SITE_MESSAGES.FIRST_NAME_REQUIRED),
    [USER_REGISTR_FORM_NAMES.LAST_NAME]: Yup.string()
      .required(SITE_MESSAGES.LAST_NAME_REQUIRED)
      .matches(/^[^\s].*$/, SITE_MESSAGES.EMPTY_START)
      .min(1, SITE_MESSAGES.LAST_NAME_REQUIRED),
    [USER_REGISTR_FORM_NAMES.PHONE]: Yup.string().required(
      SITE_MESSAGES.PHONE_REQUIRED,
    ),
    [USER_REGISTR_FORM_NAMES.COUNTRY]: Yup.string()
      .required(SITE_MESSAGES.COUNTRY_REQUIRED)
      .matches(/^[^\s].*$/, SITE_MESSAGES.EMPTY_START)
      .matches(
        /^[a-zA-Z\s]*$/,
        SITE_MESSAGES.COUNTRY_WRONG,
      )
      .min(4, SITE_MESSAGES.COUNTRY_SHORT),
    [USER_REGISTR_FORM_NAMES.ZIP]: Yup.string()
      .required(SITE_MESSAGES.ZIP_REQUIRED)
      .matches(zipRegex, SITE_MESSAGES.ZIP_WRONG),
    [USER_REGISTR_FORM_NAMES.CITY]: Yup.string()
      .required(SITE_MESSAGES.CITY_REQUIRED)
      .matches(/^[^\s].*$/, SITE_MESSAGES.EMPTY_START)
      .min(2, SITE_MESSAGES.CITY_SHORT),
    [USER_REGISTR_FORM_NAMES.STREET]: Yup.string()
      .required(SITE_MESSAGES.STREET_REQUIRED)
      .matches(/^[^\s].*$/, SITE_MESSAGES.EMPTY_START)
      .min(4, SITE_MESSAGES.STREET_SHORT),
    [USER_REGISTR_FORM_NAMES.HOUSE_NUMBER]: Yup.string()
      .required(SITE_MESSAGES.NUMBER_REQUIRED)
      .max(7, SITE_MESSAGES.NUMBER_TOO_LONG)
      .matches(/^[^\s].*$/, SITE_MESSAGES.EMPTY_START)
      .matches(/\d/, SITE_MESSAGES.NUMBER_WRONG),
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
          "http://localhost:8080/api/users",
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
          {
            headers: {
              Authorization: `Bearer ${aT}`, // Add the Authorization header with the access token
            },
          }
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
    dispatch(switchSliceActions.setProfileState("profile"))
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(event)
    setHasUnsavedChanges(true)
  }

  const handleUpdate = () => {
    dispatch(switchSliceActions.setProfileState("edit"))
  }  

  const checkForNullValues = () => {
    return Object.values(user).some((value) => value === null)
      ? "Some information is still missing..."
      : "Is your information up to date?";
  };

  return (
    <>
      { user.name ? <UserCardTitle>Welcome to your profile page, {user.name}</UserCardTitle> 
      : <UserCardTitle>Welcome to your profile page</UserCardTitle> }  
      {/* Profile Version */}

      {profileState === "profile" && (
        <UserCard>
         
        <ProfileInfo>
          <InfoItem>
            <strong>Name:</strong> {user.name ? user.name : "Not yet provided"}
          </InfoItem>
          <InfoItem>
            <strong>Surname:</strong> {user.surname ? user.surname : "Not yet provided"}
          </InfoItem>
          <InfoItem>
            <strong>Email:</strong> {user.email ? user.email : "Not yet provided"}
          </InfoItem>
          <InfoItem>
            <strong>Phone:</strong> {user.phone ? user.phone : "Not yet provided"}
          </InfoItem>
          <InfoItem>
            <strong>Country:</strong> {user.country ? user.country : "Not yet provided"}
          </InfoItem>
          <InfoItem>
            <strong>ZIP:</strong> {user.zip ? user.zip : "Not yet provided"}
          </InfoItem>
          <InfoItem>
            <strong>City:</strong> {user.city ? user.city : "Not yet provided"}
          </InfoItem>
          <InfoItem>
            <strong>Street:</strong> {user.street ? user.street : "Not yet provided"}
          </InfoItem>
          <InfoItem>
            <strong>House number:</strong> {user.number ? user.number : "Not yet provided"}
          </InfoItem>
        </ProfileInfo>
        { checkForNullValues === null ? <></> : <UserCardWarning>{checkForNullValues()}</UserCardWarning>}
        <UserCardContainer><Button name="Update Your Profile" type="button" onClick={handleUpdate}/></UserCardContainer>        
      </UserCard>     

        

      )}

      {/* EDIT Version */}

      {profileState === "edit" && (
        <FormRegistContainer
          action="/submit-form"
          method="POST"
          onSubmit={formik.handleSubmit}
        >

          <div>Fill in your details to further order books</div>


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
              />
              <Input
                name={USER_REGISTR_FORM_NAMES.LAST_NAME}
                type="text"
                label="Last Name"
                placeholder="Enter your Last Name"
                value={formik.values[USER_REGISTR_FORM_NAMES.LAST_NAME]}
                onChange={handleChange}
                error={formik.errors[USER_REGISTR_FORM_NAMES.LAST_NAME]}
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
              />
              <Input
                name={USER_REGISTR_FORM_NAMES.CITY}
                type="text"
                label="City"
                placeholder="Enter your City"
                value={formik.values[USER_REGISTR_FORM_NAMES.CITY]}
                onChange={handleChange}
                error={formik.errors[USER_REGISTR_FORM_NAMES.CITY]}
              />
              <Input
                name={USER_REGISTR_FORM_NAMES.STREET}
                type="text"
                label="Street"
                placeholder="Enter your Street"
                value={formik.values[USER_REGISTR_FORM_NAMES.STREET]}
                onChange={handleChange}
                error={formik.errors[USER_REGISTR_FORM_NAMES.STREET]}
              />
              <Input
                name={USER_REGISTR_FORM_NAMES.HOUSE_NUMBER}
                type="text"
                label="House number"
                placeholder="Enter your House number"
                value={formik.values[USER_REGISTR_FORM_NAMES.HOUSE_NUMBER]}
                onChange={handleChange}
                error={formik.errors[USER_REGISTR_FORM_NAMES.HOUSE_NUMBER]}
              />
            </InputForm2>
          </MainColumn>
          <div>
            <TwoButtons>
              <Button
                name="Save"
                type="submit"
                disabled={!formik.isValid || !formik.dirty}
                color="#45A42D"
                onClick={() => {
                  formik.handleSubmit()
                  dispatch(switchSliceActions.setProfileState("profile"))
                }}
              />
              <Button name="Cancel" type="button" onClick={handleCancel} />
            </TwoButtons>

          </div>
        </FormRegistContainer>

      )}


    </>


  )
}

export default PersonalCabinet
