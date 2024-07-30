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
        <StyledNavLink to="/api/auth/login">Авторизоваться</StyledNavLink>
        <StyledNavLink to="/api/auth/register">
          Зарегистрироваться
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
            <MobileStyledNavLink to='/"' onClick={toggleMenu}>Главная страница</MobileStyledNavLink>
            <MobileStyledNavLink to='/api/auth/login"' onClick={toggleMenu}>Авторизоваться</MobileStyledNavLink>
            <MobileStyledNavLink to='/api/auth/register' onClick={toggleMenu}>Зарегистрироваться</MobileStyledNavLink>
          </MobileMenu>
        </MobileMenuContainer>
      )}
    </HeaderComponent>
  )
}

export default Header
