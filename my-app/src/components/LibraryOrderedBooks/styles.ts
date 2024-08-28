import styled from "@emotion/styled"
import { Link } from "react-router-dom"

export const BookManagerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 800px;
  gap: 30px;
  align-items: left;
  
  @media (max-width: 799px) {
    width: 100%;
    padding: 0 15px;
    gap: 20px;
  }
`

export const LinkComponent = styled(Link)`
  font-size: 16px;
  text-decoration: none;
  color: inherit; /* Использует текущий цвет текста */

  &:hover {
    text-decoration: underline; /* Добавляет подчеркивание при наведении */
    color: #4a90e2; /* Замените на нужный цвет */
  }

  @media (max-width: 600px) {
    font-size: 14px;
  }
`

export const ErrorMessage = styled.h2`
  padding:20px 10px 20px 10px;
  @media (max-width: 600px) {
    padding:10px 0px 10px 0px;
    font-size: 20px;
  }
`

export const PageTitle = styled.h2`
  font-weight: 200;
`

export const LibraryListIntro = styled.div`
  width: 100%;
  border: 1px solid #d9d9d9;
  background-color: #d9d9d9;
  border-radius: 5px;
  padding: 15px;
  font-family: "Chonburi", sans-serif;
  font-size: 12px;
  text-align: left;
  color: #000;

  &::placeholder {
    color: white;
  }

  &:focus {
    border-color: #4a90e2;
    outline: none;
  }
`