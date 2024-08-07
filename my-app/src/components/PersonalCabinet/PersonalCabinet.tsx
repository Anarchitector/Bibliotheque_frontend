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
  TwoButtons,
} from "./styles"
import type { UserRegistrationFormValues } from "./types"
import { USER_REGISTR_FORM_NAMES } from "./types"
import { useState } from "react"

function PersonalCabinet() {

  const [isEdit, setIsEdit] = useState(false);


// Актуальная версия //
  // ------------------- //

  const schema = Yup.object().shape({
    [USER_REGISTR_FORM_NAMES.FIRST_NAME]: Yup.string()
      .required("Your first name is required to complete your registration")
      .matches(/^[^\s].*$/, "A first name must not start with an empty space")
      .min(1, "You have a name, don't you?"),
    [USER_REGISTR_FORM_NAMES.LAST_NAME]: Yup.string()
      .required("Your last name is required to complete your registration")
      .matches(/^[^\s].*$/, "A last name must not start with an empty space")
      .min(1, "Your family name is not that embarrassing, is it?"),
    [USER_REGISTR_FORM_NAMES.PHONE]: Yup.string()
      //placeholder="+38 (097) 123 45 99"
      .matches(/^\+\d{2}\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}$/, "Please provide your phone in following format: +38 (097) 123 45 99")
      .required("Please don't forget your phone number")
      .matches(/^[^\s].*$/, "A phone can't start with an empty space")
      .min(5, "A phone number can't be that short"),
    [USER_REGISTR_FORM_NAMES.EMAIL]: Yup.string()
      //.required("Email required for registration")
      .matches(/^[^\s].*$/, "An email can't start with an empty space")
      .email("This is not an acceptable email"),      
    [USER_REGISTR_FORM_NAMES.PASSWORD]: Yup.string()
      //.required("Password required for registration")
      .min(8, "Password must contain 8 symbols")
      .matches(/^[^\s].*$/, "A password must not start with an empty space")
      .matches(/[a-z]/, "Password must contain at least one small letter")
      .matches(/[A-Z]/, "Password must contain at least one capital letter")
      .matches(/\d/, "Password must contain at least one numerical digit")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special symbol",
      ),
    [USER_REGISTR_FORM_NAMES.COUNTRY]: Yup.string()
      .required("We need to record your country of origin")
      .matches(/^[^\s].*$/, "A country name can't start with an empty space")
      .matches(/^[a-zA-Z\s]*$/, "There probably aren't but letter and spaces in your country's name")
      .min(4, "A country's name can't be that short"),
    [USER_REGISTR_FORM_NAMES.ZIP]: Yup.string()
      .required("We need your ZIP code")
      .min(5, "A zip number can't be that short")
      .matches(/^[^\s].*$/, "A postal code can't start with an empty space")
      .max(9, "A zip number can't be that long"),      
    [USER_REGISTR_FORM_NAMES.CITY]: Yup.string()
      .required("We need to record your city of origin")
      .matches(/^[^\s].*$/, "A city name can't start with an empty space")
      .min(2, "A city's name can't be that short"),
    [USER_REGISTR_FORM_NAMES.STREET]: Yup.string()
      .required("We need to record your street")
      .matches(/^[^\s].*$/, "A street name can't start with an empty space")
      .min(4, "A street's name can't be that short"),
    [USER_REGISTR_FORM_NAMES.HOUSE_NUMBER]: Yup.string()
      .required("We need to record your house number")
      .max(7, "That's a bit too long for a house number, isn't it?")
      .matches(/^[^\s].*$/, "A house number can't start with an empty space")
      .matches(/\d/, "House number must contain at least one numerical digit"),
  })

  // ------------------- //

  const formik = useFormik({
    initialValues: {
      [USER_REGISTR_FORM_NAMES.FIRST_NAME]: "",
      [USER_REGISTR_FORM_NAMES.LAST_NAME]: "",
      [USER_REGISTR_FORM_NAMES.PHONE]: "",
      [USER_REGISTR_FORM_NAMES.EMAIL]: "",
      [USER_REGISTR_FORM_NAMES.PASSWORD]: "",
      [USER_REGISTR_FORM_NAMES.COUNTRY]: "",
      [USER_REGISTR_FORM_NAMES.ZIP]: "",
      [USER_REGISTR_FORM_NAMES.CITY]: "",
      [USER_REGISTR_FORM_NAMES.STREET]: "",
      [USER_REGISTR_FORM_NAMES.HOUSE_NUMBER]: ""
    } as UserRegistrationFormValues,
    validationSchema: schema,
    // validateOnChange: true,
    // validateOnMount: true,
    onSubmit: values => {
      console.log(values)
    },
  })

  // ------------------- //

  return (
    // <FormRegistContainer action="/submit-form" method="POST">
    <FormRegistContainer
      action="/submit-form"
      method="POST"
      onSubmit={formik.handleSubmit}
    >
      <FormTitle>Welcome to your profile page</FormTitle>
      <MainColumn>
        <InputForm>
          <Input
            name={USER_REGISTR_FORM_NAMES.FIRST_NAME}
            type="text"
            label="First Name"
            placeholder="James"
            value={formik.values[USER_REGISTR_FORM_NAMES.FIRST_NAME]}
            onChange={formik.handleChange}
            error={formik.errors[USER_REGISTR_FORM_NAMES.FIRST_NAME]}
            disabled={!isEdit}
          />
          <Input
            name={USER_REGISTR_FORM_NAMES.LAST_NAME}
            type="text"
            label="Last Name"
            placeholder="Holden"
            value={formik.values[USER_REGISTR_FORM_NAMES.LAST_NAME]}
            onChange={formik.handleChange}
            error={formik.errors[USER_REGISTR_FORM_NAMES.LAST_NAME]}
            disabled={!isEdit}
          />
          <Input
            name={USER_REGISTR_FORM_NAMES.PHONE}
            type="text"
            label="Phone"
            placeholder="+38 (097) 123 45 99"
            value={formik.values[USER_REGISTR_FORM_NAMES.PHONE]}
            onChange={formik.handleChange}
            error={formik.errors[USER_REGISTR_FORM_NAMES.PHONE]}
            disabled={!isEdit}
          />
          <Input
            name={USER_REGISTR_FORM_NAMES.EMAIL}
            type="email"
            label="Email"
            placeholder="Enter your email here"
            value={formik.values[USER_REGISTR_FORM_NAMES.EMAIL]}
            onChange={formik.handleChange}
            error={formik.errors[USER_REGISTR_FORM_NAMES.EMAIL]}     
            //TODO change later!!!
            disabled={true}   
          />
          <Input
            name={USER_REGISTR_FORM_NAMES.PASSWORD}
            type="password"
            label="Password"
            placeholder="Enter your password here"
            value={formik.values[USER_REGISTR_FORM_NAMES.PASSWORD]}
            onChange={formik.handleChange}
            error={formik.errors[USER_REGISTR_FORM_NAMES.PASSWORD]}
            //TODO change later!!!
            disabled={true}  
          />
        </InputForm>
        <InputForm2>
          <Input
            name={USER_REGISTR_FORM_NAMES.COUNTRY}
            type="text"
            label="Country"
            placeholder="Germany"
            value={formik.values[USER_REGISTR_FORM_NAMES.COUNTRY]}
            onChange={formik.handleChange}
            error={formik.errors[USER_REGISTR_FORM_NAMES.COUNTRY]}
            disabled={!isEdit}
          />
          <Input
            name={USER_REGISTR_FORM_NAMES.ZIP}
            type="text"
            label="ZIP"
            placeholder="96148"
            value={formik.values[USER_REGISTR_FORM_NAMES.ZIP]}
            onChange={formik.handleChange}
            error={formik.errors[USER_REGISTR_FORM_NAMES.ZIP]}
            disabled={!isEdit}
          />
          <Input
            name={USER_REGISTR_FORM_NAMES.CITY}
            type="text"
            label="City"
            placeholder="Bamberg"
            value={formik.values[USER_REGISTR_FORM_NAMES.CITY]}
            onChange={formik.handleChange}
            error={formik.errors[USER_REGISTR_FORM_NAMES.CITY]}
            disabled={!isEdit}
          />
          <Input
            name={USER_REGISTR_FORM_NAMES.STREET}
            type="text"
            label="Street"
            placeholder="Marktplatz"
            value={formik.values[USER_REGISTR_FORM_NAMES.STREET]}
            onChange={formik.handleChange}
            error={formik.errors[USER_REGISTR_FORM_NAMES.STREET]}
            disabled={!isEdit}
          />
          <Input
            name={USER_REGISTR_FORM_NAMES.HOUSE_NUMBER}
            type="text"
            label="House number"
            placeholder="25"
            value={formik.values[USER_REGISTR_FORM_NAMES.HOUSE_NUMBER]}
            onChange={formik.handleChange}
            error={formik.errors[USER_REGISTR_FORM_NAMES.HOUSE_NUMBER]}
            disabled={!isEdit}
          />
        </InputForm2>
      </MainColumn>

      <div>
        {isEdit ? (
          <TwoButtons>
            <Button
              name="Save"
              type="submit"
              disabled={!formik.isValid || !formik.dirty}
              onClick={() => setIsEdit(false)}
            />
            <Button
              name="Cancel"
              type="submit"
              onClick={() => setIsEdit(false)}
            />
          </TwoButtons>
        ) : (
          <div>
            <Button
              name="Update Your Profile Info"
              type="submit"
              onClick={() => setIsEdit(true)}
            />
          </div>
        )}
      </div>

      <LinkComponent to="/">Return to the main page</LinkComponent>
    </FormRegistContainer>
  )
}

export default PersonalCabinet