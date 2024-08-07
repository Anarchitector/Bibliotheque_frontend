import { useFormik } from "formik";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import * as Yup from "yup";
import {
    FormTitle,
    InputForm,
    LinkComponent,
    FormUserLoginContainer
} from "./styles";
import type { LoginFormValues } from "./types";
import { LOGIN_FORM_NAMES } from "./types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userSliceActions } from "../../store/redux/userSlice/userSlice";

function UserLogin() {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();

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
    });

    const formik = useFormik({
        initialValues: {
            [LOGIN_FORM_NAMES.EMAIL]: '',
            [LOGIN_FORM_NAMES.PASSWORD]: '',
        } as LoginFormValues,
        validationSchema: schema,
        onSubmit: async (values) => {
            try {
                const response = await fetch("http://localhost:8080/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: values[LOGIN_FORM_NAMES.EMAIL],
                        password: values[LOGIN_FORM_NAMES.PASSWORD],
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Login successful:", data);

                // Save user data and tokens to the global state
                dispatch(userSliceActions.setUser({
                    id: data.id,
                    email: data.email,
                    role: data.role[0].title,
                }));

                dispatch(userSliceActions.setTokens({
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken,
                }));

                // Navigate to the personal cabinet page
                navigate(`/api/users/${data.id}`);

            } catch (error: any) {
                console.error("Error during login:", error);
                setError(error.message || error.toString());
                navigate("/api/auth/error", { state: { error: error.message || error.toString() } });
            }
        },
    });

    return (
        <FormUserLoginContainer onSubmit={formik.handleSubmit}>
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
    );
}

export default UserLogin;
