import { NavLink, useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import Input from "components/Input/Input"
import Button from "components/Button/Button"
import * as Yup from "yup"
import {
    FormTitle,
    InputForm,
    LinkComponent,
    FormUserLoginContainer
} from "./styles"
import { LOGIN_FORM_NAMES, LoginFormValues } from "./types"

function UserLogin() {

    const schema = Yup.object().shape({
        [LOGIN_FORM_NAMES.EMAIL]: Yup.string()
            .required("Email required to login")
            .email("This is not an acceptable email"),
        [LOGIN_FORM_NAMES.PASSWORD]: Yup.string()
            .required("Password required for login")
            .min(8, "Password must contain at least 8 symbols")
            .matches(/[a-z]/, "Password must contain at least one small letter")
            .matches(/[A-Z]/, "Password must contain at least one capital letter")
            .matches(/\d/, "Password must contain at least one numerical digit")
            .matches(
                /[!@#$%^&*(),.?":{}|<>]/,
                "Password must contain at least one special symbol",
            )
    })

    const formik = useFormik({
        initialValues: {
            [LOGIN_FORM_NAMES.EMAIL]: '',
            [LOGIN_FORM_NAMES.PASSWORD]: '',
        } as LoginFormValues,
        validationSchema: schema,
        // validateOnChange: true,
        // validateOnMount: true,
        onSubmit: (values) => {
            console.log(values)
        },
    })

    return (
        <FormUserLoginContainer>
             <FormTitle>Log In</FormTitle>
      <InputForm>
        <Input
           name={LOGIN_FORM_NAMES.EMAIL}
           type="email"
           placeholder="Enter your email"
           value={formik.values[LOGIN_FORM_NAMES.EMAIL]}
           onChange={formik.handleChange}
           error={formik.errors[LOGIN_FORM_NAMES.EMAIL]}    
        />
        <Input
          name={LOGIN_FORM_NAMES.PASSWORD}
          type="password"
          placeholder="Enter your password"
          value={formik.values[LOGIN_FORM_NAMES.PASSWORD]}
          onChange={formik.handleChange}
          error={formik.errors[LOGIN_FORM_NAMES.PASSWORD]} 
        />
       
      </InputForm>
      <Button name="Log In" type="submit" disabled={!formik.isValid || !formik.dirty} />
      <LinkComponent href="/api/auth/register">Register if you don't have an account yet.</LinkComponent>    
        </FormUserLoginContainer>
    )
}

export default UserLogin