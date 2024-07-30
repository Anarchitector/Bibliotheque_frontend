import styled from "@emotion/styled"
import { Link, NavLink } from "react-router-dom"

// Основной контейнер заголовка
export const HeaderComponent = styled.header`
  display: flex;
  align-items: center; // Центрирует элементы по вертикали
  justify-content: center; // Центрирует элементы по горизонтали
  padding: 0 30px; // Отступы по бокам
  margin: 30px 0; // Вертикальный отступ
  position: relative; // Необходим для абсолютного позиционирования элементов внутри
  width: 100%;
  margin-left: auto;
  margin-right: auto; // Центрирует HeaderComponent по горизонтали в родительском контейнере
`

// Логотип
export const Logo = styled.div`
  font-size: 36px;
  font-weight: 400;
  text-align: center; // Центрирует текст в логотипе
`

// Ссылка на логотип
export const LogoLink = styled(Link)`
  text-decoration: none;
  color: black;
  display: flex;
  justify-content: center; // Центрирует логотип внутри ссылки
  flex-grow: 1; // Позволяет логотипу занимать оставшееся пространство
`

// Навигационное меню
export const NavContainer = styled.nav`
  display: flex;
  gap: 10px; // Отступы между ссылками
  position: absolute; // Абсолютное позиционирование для размещения справа
  right: 30px; // Отступ справа

  @media (max-width: 1000px) {
    display: none; /* Скрыть навигацию при уменьшении экрана */
  }
`

// Ссылки навигации
export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-size: 14px;
  color: black;
  position: relative;
  padding: 0 10px;

  &:hover {
    text-decoration: underline; /* Добавляет подчеркивание при наведении */
    color: #4a90e2; /* Замените на нужный цвет */
  }

  &.active {
    color: #4a90e2; // Цвет для активной ссылки
    text-decoration: underline; /* Добавляет подчеркивание при наведении */
  }

  // Псевдоэлемент для горизонтальной линии
  &:not(:last-child)::after {
    content: "";
    position: absolute;
    right: -5px; /* смещает линию вправо от текста */
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 20px;
    background-color: grey;
  }
`

// Ссылки навигации в мобильном меню
export const MobileStyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-size: 14px;
  color: black;
  position: relative;
  padding: 0 10px;
  

  &:hover {
    text-decoration: underline; /* Добавляет подчеркивание при наведении */
    color: #4a90e2; /* Замените на нужный цвет */
  }

  &.active {
    color: #4a90e2; // Цвет для активной ссылки
    text-decoration: underline; /* Добавляет подчеркивание при наведении */
  }
`

// Сендвич бар для мобильного меню
export const HamburgerButton = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  span {
    background: black;
    border-radius: 2px;
    height: 2px;
    margin: 4px;
    width: 25px;
  }

  @media (max-width: 1000px) {
    display: flex; /* Показать кнопку при уменьшении экрана */
  }
`

//  Мобильное меню
export const MobileMenuContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

export const MobileMenu = styled.div`
  background: #F5F5F5;
  width: 80%;
  max-width: 300px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 5px;
`

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 36px;
  color: white;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`
