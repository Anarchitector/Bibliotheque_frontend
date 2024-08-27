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

export const UserCardTitle = styled.h2`
  display:flex;
  justify-content: center;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  @media (max-width: 600px) {
    font-size: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
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
export const TwoButtons = styled.div`
  display: flex;
  justify-content:space-around;  
  width: 200px;
  margin-left: 1em;
  margin-right: 1em;

  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
    padding: 10px; /* Немного сдвигаем контент, чтобы не прилипал к краям экрана */
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
  justify-content:center;
  padding-bottom: 25px;
 
  @media (max-width: 600px) {
    //flex-direction: column;
    gap: 15px;
    align-content:center;
  }
`


export const UserCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
  align-items: flex-start; /* Align items to the start for a more natural text alignment */
  background-color: #f0f0f0; /* Light grey background */
  color: #000; /* Black font color */
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  width: 100%;
  max-width: 600px; /* Max width for better layout */
  margin: 0 auto; /* Center the card horizontally */

  @media (max-width: 600px) {
    width: 100%;
    padding: 15px;
    gap: 15px;
  }
`;



export const UserCardWarning = styled.h4`
  display:flex;
  justify-content: center;
  width: 100%;
  @media (max-width: 600px) {
    font-size: 15px;
  }
`

export const UserCardContainer = styled.div`
  width: 100%;
  display: flex; 
  justify-content: center;
`

export const ProfileInfo = styled.div`
  width: 100%;
`;

export const InfoItem = styled.p`
  font-size: 16px;
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
  width: 100%;
`;