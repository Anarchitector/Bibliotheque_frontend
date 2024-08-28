import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import Input from "components/Input/Input"
import Button from "components/Button/Button"
import {
  FormRegistContainer,
  InputForm,
  InputForm2,
  MainColumn,
  LabelComponent,
  InputContainer,
  CartSpanMess,
  CheckboxContainer,
  CheckboxLabel,
  ErrorText,
} from "./styles"
import { RootState } from "../../store/store"
import { userSliceActions } from "../../store/redux/userSlice/userSlice"
import MaskedInput from "react-text-mask"
import { USER_REGISTR_FORM_NAMES } from "./types"
import type { UserRegistrationFormValues } from "./types"
import { toast } from "react-toastify"
import { cartSliceActions } from "store/redux/cartSlice/cartSlice"
import { useNavigate } from "react-router-dom"
import { SITE_MESSAGES } from "assets/messages"

function CartUserInfo() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Получаем данные пользователя и корзины из глобального состояния
  const user = useSelector((state: RootState) => state.USER)
  const cartItems = useSelector((state: RootState) => state.cart.items)
  // console.log(cartItems);
  

  // Инициализация полей формы значениями из глобального состояния
  const formik = useFormik<UserRegistrationFormValues>({
    initialValues: {
      [USER_REGISTR_FORM_NAMES.FIRST_NAME]: user.name || "",
      [USER_REGISTR_FORM_NAMES.LAST_NAME]: user.surname || "",
      [USER_REGISTR_FORM_NAMES.PHONE]: user.phone || "",
      [USER_REGISTR_FORM_NAMES.COUNTRY]: user.country || "",
      [USER_REGISTR_FORM_NAMES.ZIP]: user.zip || "",
      [USER_REGISTR_FORM_NAMES.CITY]: user.city || "",
      [USER_REGISTR_FORM_NAMES.STREET]: user.street || "",
      [USER_REGISTR_FORM_NAMES.HOUSE_NUMBER]: user.number || "",
      [USER_REGISTR_FORM_NAMES.TERMS]: false, // Новое поле для чекбокса
    },
    validationSchema: Yup.object().shape({
      [USER_REGISTR_FORM_NAMES.FIRST_NAME]: Yup.string()
        .required(SITE_MESSAGES.FIRST_NAME_REQUIRED)
        .matches(
          /^[^\s].*$/,
          SITE_MESSAGES.EMPTY_START,
        ),
      [USER_REGISTR_FORM_NAMES.LAST_NAME]: Yup.string()
        .required(SITE_MESSAGES.LAST_NAME_REQUIRED)
        .matches(/^[^\s].*$/, SITE_MESSAGES.EMPTY_START),
      [USER_REGISTR_FORM_NAMES.PHONE]: Yup.string().required(
        SITE_MESSAGES.PHONE_REQUIRED,
      ),
      [USER_REGISTR_FORM_NAMES.COUNTRY]: Yup.string()
        .required(SITE_MESSAGES.COUNTRY_REQUIRED)
        .matches(/^[^\s].*$/, SITE_MESSAGES.EMPTY_START),
      [USER_REGISTR_FORM_NAMES.ZIP]: Yup.string().required(
        SITE_MESSAGES.ZIP_REQUIRED,
      ),
      [USER_REGISTR_FORM_NAMES.CITY]: Yup.string()
        .required(SITE_MESSAGES.CITY_REQUIRED)
        .matches(/^[^\s].*$/, SITE_MESSAGES.EMPTY_START),
      [USER_REGISTR_FORM_NAMES.STREET]: Yup.string()
        .required(SITE_MESSAGES.STREET_REQUIRED)
        .matches(/^[^\s].*$/, SITE_MESSAGES.EMPTY_START),
      [USER_REGISTR_FORM_NAMES.HOUSE_NUMBER]: Yup.string()
        .required(SITE_MESSAGES.NUMBER_REQUIRED)
        .max(7, SITE_MESSAGES.NUMBER_TOO_LONG)
      .matches(/^[^\s].*$/, SITE_MESSAGES.EMPTY_START)
      .matches(/\d/, SITE_MESSAGES.NUMBER_WRONG),
      [USER_REGISTR_FORM_NAMES.TERMS]: Yup.bool().oneOf(
        [true],
        SITE_MESSAGES.TERMS_REQUIRED,
      ), // Валидатор для чекбокса
    }),
    onSubmit: async values => {
      try {
        // Обновляем данные пользователя
        const response = await axios.put("http://localhost:8080/api/users", {
          email: user.email,
          name: values[USER_REGISTR_FORM_NAMES.FIRST_NAME],
          surname: values[USER_REGISTR_FORM_NAMES.LAST_NAME],
          country: values[USER_REGISTR_FORM_NAMES.COUNTRY],
          city: values[USER_REGISTR_FORM_NAMES.CITY],
          street: values[USER_REGISTR_FORM_NAMES.STREET],
          number: values[USER_REGISTR_FORM_NAMES.HOUSE_NUMBER],
          zip: values[USER_REGISTR_FORM_NAMES.ZIP],
          phone: values[USER_REGISTR_FORM_NAMES.PHONE],
        })

        // Обновляем глобальное состояние пользователя
        dispatch(
          userSliceActions.setUser({
            id: user.id,
            email: user.email,
            name: response.data.name,
            surname: response.data.surname,
            country: response.data.country,
            city: response.data.city,
            street: response.data.street,
            number: response.data.number,
            zip: response.data.zip,
            phone: response.data.phone,
            role: user.role,
          }),
        )

        toast.success("User data updated successfully")
        console.log("User data updated successfully", response.data)

        // Подготовка данных для отправки на сервер
        const reservedBooks = cartItems.map(item => ({
          id: item.id,
          libraryId: item.libraryId,
        }))

        //console.log("Reserved Book" + reservedBooks);
        

        // Отправка данных о заказе
        await axios.post(
          `http://localhost:8080/api/reserved/user/${user.id}`,
          reservedBooks,
        )

        // Очистка корзины после успешного заказа
        dispatch(cartSliceActions.clearCart())

        // Перенаправление на главную страницу
        navigate("/")

        toast.success("Order confirmed!")
        console.log("Order confirmed with data:", reservedBooks)
      } catch (error) {
        toast.error("Failed to update user data or confirm order")
        console.error("Failed to update user data or confirm order", error)
      }
    },
  })

  // Проверка наличия данных и валидности формы для активации кнопки "Confirm order"
  const isFormValid =
    formik.isValid && Object.values(formik.values).every(value => value !== "")

  return (
    <FormRegistContainer onSubmit={formik.handleSubmit}>
      <CartSpanMess>
        To reserve books in the library, you must fill in all the necessary
        information.
      </CartSpanMess>
      <MainColumn>
        <InputForm>
          <Input
            name={USER_REGISTR_FORM_NAMES.FIRST_NAME}
            type="text"
            label="First Name*"
            placeholder="Enter your First Name"
            value={formik.values[USER_REGISTR_FORM_NAMES.FIRST_NAME]}
            onChange={formik.handleChange}
            error={formik.errors[USER_REGISTR_FORM_NAMES.FIRST_NAME]}
          />
          <Input
            name={USER_REGISTR_FORM_NAMES.LAST_NAME}
            type="text"
            label="Last Name*"
            placeholder="Enter your Last Name"
            value={formik.values[USER_REGISTR_FORM_NAMES.LAST_NAME]}
            onChange={formik.handleChange}
            error={formik.errors[USER_REGISTR_FORM_NAMES.LAST_NAME]}
          />
          <InputContainer>
            <LabelComponent>Phone Number*</LabelComponent>
            <div className="masked-input-wrapper">
              <MaskedInput
                name={USER_REGISTR_FORM_NAMES.PHONE}
                type="text"
                aria-label="Phone Number"
                mask={[
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
                ]}
                guide={true}
                placeholder="Enter your phone number"
                onChange={formik.handleChange}
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
            label="ZIP Code*"
            placeholder="Enter your ZIP Code"
            value={formik.values[USER_REGISTR_FORM_NAMES.ZIP]}
            onChange={formik.handleChange}
            error={formik.errors[USER_REGISTR_FORM_NAMES.ZIP]}
          />
        </InputForm>
        <InputForm2>
          <Input
            name={USER_REGISTR_FORM_NAMES.COUNTRY}
            type="text"
            label="Country*"
            placeholder="Enter your Country"
            value={formik.values[USER_REGISTR_FORM_NAMES.COUNTRY]}
            onChange={formik.handleChange}
            error={formik.errors[USER_REGISTR_FORM_NAMES.COUNTRY]}
          />
          <Input
            name={USER_REGISTR_FORM_NAMES.CITY}
            type="text"
            label="City*"
            placeholder="Enter your City"
            value={formik.values[USER_REGISTR_FORM_NAMES.CITY]}
            onChange={formik.handleChange}
            error={formik.errors[USER_REGISTR_FORM_NAMES.CITY]}
          />
          <Input
            name={USER_REGISTR_FORM_NAMES.STREET}
            type="text"
            label="Street*"
            placeholder="Enter your Street"
            value={formik.values[USER_REGISTR_FORM_NAMES.STREET]}
            onChange={formik.handleChange}
            error={formik.errors[USER_REGISTR_FORM_NAMES.STREET]}
          />
          <Input
            name={USER_REGISTR_FORM_NAMES.HOUSE_NUMBER}
            type="text"
            label="House number*"
            placeholder="Enter your House number"
            value={formik.values[USER_REGISTR_FORM_NAMES.HOUSE_NUMBER]}
            onChange={formik.handleChange}
            error={formik.errors[USER_REGISTR_FORM_NAMES.HOUSE_NUMBER]}
          />
        </InputForm2>
      </MainColumn>
      <CheckboxContainer>
        <CheckboxLabel htmlFor={USER_REGISTR_FORM_NAMES.TERMS}>
          <input
            type="checkbox"
            id={USER_REGISTR_FORM_NAMES.TERMS}
            name={USER_REGISTR_FORM_NAMES.TERMS}
            checked={formik.values[USER_REGISTR_FORM_NAMES.TERMS]}
            onChange={e => {
              formik.setFieldValue(
                USER_REGISTR_FORM_NAMES.TERMS,
                e.target.checked,
              )
            }}
          />
          By submitting an application, you confirm that the information you
          have filled in is up-to-date and agree to the processing of your data.
        </CheckboxLabel>
        {formik.errors[USER_REGISTR_FORM_NAMES.TERMS] && (
          <ErrorText>{formik.errors[USER_REGISTR_FORM_NAMES.TERMS]}</ErrorText>
        )}
      </CheckboxContainer>

      <div>
        <Button
          name="Confirm order"
          type="submit"
          disabled={
            !isFormValid || !formik.values[USER_REGISTR_FORM_NAMES.TERMS]
          }
        />
      </div>
    </FormRegistContainer>
  )
}

export default CartUserInfo
