import { NavLink, useNavigate } from "react-router-dom"
import { BottomLine, MainTitle, AuthorizationForm, EntryField, LoginButton, RegistrationLink } from "./styles"

function UserLogin() {

    const login = () => {

    }

    return (
        <>
            <MainTitle>BiblioHub</MainTitle>

            <EntryField>
                <small>Email:</small>
                <input placeholder="Enter your email" />
            </EntryField>
            <EntryField>
                <small>Password:</small>
                <input placeholder="Enter your password" />
            </EntryField>

            <LoginButton onClick={login}>Log In</LoginButton>

            <RegistrationLink>
                <NavLink to="/api/auth/register" className="nav-link">
                    Register if you don't have an account yet
                </NavLink>
            </RegistrationLink>






            <BottomLine>© BiblioHub 2024</BottomLine>
        </>
    )
}

export default UserLogin
