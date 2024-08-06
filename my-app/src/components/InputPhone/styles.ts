import styled from "@emotion/styled"

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`

export const InputField = styled.input`
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

export const ErrorMessage = styled.div`
  font-size: 12px;
  color: red;
  min-height: 20px; /* Зарезирвированное место для отображения ошибки */
`
