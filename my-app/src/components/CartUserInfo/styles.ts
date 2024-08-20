import styled from "@emotion/styled"
import { Link } from "react-router-dom"

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  min-height: 94px; /* Зарезирвированное место для отображения ошибки */
`

export const InputMaskContainer = styled.div`
  width: 100%;
  height: 40px;
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

export const LabelComponent = styled.label`
  font-size: 12px;
  color: black;
`

export const FormRegistContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;

  @media (max-width: 600px) {
    width: 100%;
    padding: 0 15px;
    gap: 20px;
  }
`

export const MainColumn = styled.div`
  display: flex;

  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
    padding: 0 10px; /* Немного сдвигаем контент, чтобы не прилипал к краям экрана */
  }
`
export const InputForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding-right: 25px;

  @media (max-width: 600px) {
    width: 100%;
    padding: 0 10px; /* Немного сдвигаем контент, чтобы не прилипал к краям экрана */
  }
`

export const InputForm2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding-left: 25px;

  @media (max-width: 600px) {
    width: 100%;
    padding: 0 10px; /* Немного сдвигаем контент, чтобы не прилипал к краям экрана */
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

export const RadioBatComponent = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
  padding-bottom: 25px;

  @media (max-width: 600px) {
    //flex-direction: column;
    gap: 15px;
    align-content: center;
  }
`

export const CartSpanMessage1 = styled.span`
  font-size: 16px;
  color: #ff6b35;
`

export const CheckboxContainer = styled.div`
  max-width: 650px;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`

export const ErrorText = styled.div`
  color: red;
  font-size: 12px;
  padding-left: 30px;
`
