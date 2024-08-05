import { useState } from "react"
import {
  HeaderComponent,
  Logo,
  LogoLink,
  StyledNavLink,
  NavContainer,
  HamburgerButton,
  MobileMenuContainer,
  CloseButton,
  MobileMenu,
  MobileStyledNavLink,
} from "./styles"

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <HeaderComponent>
      <LogoLink to="/">
        <Logo>BiblioHub</Logo>
      </LogoLink>
      <NavContainer>
        <StyledNavLink to="/api/auth/login">Log In</StyledNavLink>
        <StyledNavLink to="/api/auth/register">
          Register
        </StyledNavLink>
        {/* to be removed*/ }
        <StyledNavLink to="/api/users/id">
          (!Personal Cabinet)
        </StyledNavLink>
      </NavContainer>
      <HamburgerButton onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </HamburgerButton>
      {isMenuOpen && (
        <MobileMenuContainer>
          <CloseButton onClick={toggleMenu}>×</CloseButton>
          <MobileMenu>
            <MobileStyledNavLink to='/' onClick={toggleMenu}>Main Page</MobileStyledNavLink>
            <MobileStyledNavLink to='/api/auth/login' onClick={toggleMenu}>Log in</MobileStyledNavLink>
            <MobileStyledNavLink to='/api/auth/register' onClick={toggleMenu}>Register</MobileStyledNavLink>
          </MobileMenu>
        </MobileMenuContainer>
      )}
    </HeaderComponent>
  )
}

export default Header
