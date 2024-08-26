import { useState, useEffect } from "react"
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
  CartLink,
  MobileCartLink,
  CartItem,
} from "./styles"
import { FaShoppingCart } from "react-icons/fa" // Импорт иконки
import { useDispatch, useSelector } from "react-redux"
import { userSliceActions } from "../../store/redux/userSlice/userSlice"
import { RootState } from "../../store/store" // Корневое состояния
import { cartSliceActions } from "store/redux/cartSlice/cartSlice"
import { libraryListSliceActions } from "store/redux/libraryListSlice/libraryListSlice"
import { switchSliceActions } from "store/redux/switchSlice/switchSlice"
import { librarySliceActions } from "store/redux/librarySlice/librarySlice"
import { bookSliceActions } from "store/redux/bookSlice/bookSlice"

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.USER) // Получение данных пользователя из глобального состояния
  const cartItemsCount = useSelector((state: RootState) => state.cart.items.length) // Берем данные о товарах в корзине

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = () => {
    dispatch(userSliceActions.clearUser())
    dispatch(cartSliceActions.clearCart())
    dispatch(libraryListSliceActions.clearLibrariesList())
    dispatch(switchSliceActions.resetSwitcher())
    dispatch(librarySliceActions.clearLibrary())
    dispatch(bookSliceActions.clearBook())
    sessionStorage.clear()
  }

  const getUsername = () => {
    // Написать логику когда появиться имя пользователя
    if (user.name !== null) {
      return user.name
    }
    // return `Пользователь ${user.id}`
    return `${user.email}`
  }

  return (
    <HeaderComponent>
      <LogoLink to="/">
        <Logo>BiblioHub</Logo>
      </LogoLink>
      <NavContainer>
        {user.id ? (
          <>
            <StyledNavLink to={`/api/users/${user.id}`}>
              {getUsername()}
            </StyledNavLink>
            <StyledNavLink onClick={handleLogout} to={""}>
              Log out
            </StyledNavLink>
          </>
        ) : (
          <>
            <StyledNavLink to="/api/auth/login">Log In</StyledNavLink>
            <StyledNavLink to="/api/auth/register">Register</StyledNavLink>
          </>
        )}
        <CartLink to="/cart" aria-label="View Cart" title="View Cart">
          <FaShoppingCart size={22} />
          {/* // Отображаем количество книг в корзине // */}
          {cartItemsCount > 0 && <CartItem>{cartItemsCount}</CartItem>}
        </CartLink>
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
            <MobileStyledNavLink to="/" onClick={toggleMenu}>
              Main Page
            </MobileStyledNavLink>
            {user.id ? (
              <>
                <MobileStyledNavLink
                  to={`/api/users/${user.id}`}
                  onClick={toggleMenu}
                >
                  {getUsername()}
                </MobileStyledNavLink>
                <MobileStyledNavLink
                  onClick={() => {
                    handleLogout()
                    toggleMenu()
                  }}
                  to={""}
                >
                  Log out
                </MobileStyledNavLink>
              </>
            ) : (
              <>
                <MobileStyledNavLink to="/api/auth/login" onClick={toggleMenu}>
                  Log in
                </MobileStyledNavLink>
                <MobileStyledNavLink
                  to="/api/auth/register"
                  onClick={toggleMenu}
                >
                  Register
                </MobileStyledNavLink>
              </>
            )}
            <MobileCartLink to="/cart" aria-label="View Cart" title="View Cart">
              <FaShoppingCart size={22} />
            </MobileCartLink>
          </MobileMenu>
        </MobileMenuContainer>
      )}
    </HeaderComponent>
  )
}

export default Header
