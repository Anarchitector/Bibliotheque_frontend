import { css } from "@emotion/react"
import styled from "@emotion/styled"

interface StyledButtonProps {
  disabled: boolean
  buttonType: string
}

export const ButtonComponent = styled.button<StyledButtonProps>`
  width: auto;
  height: auto;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  color: black;
  font-family: "Chonburi", sans-serif;
  font-size: 14px;
  opacity: ${({ disabled }) =>
    disabled ? 0.5 : 1}; // Прозрачность для неактивной кнопки
  background: ${({ disabled }) => (disabled ? "lightgray" : "#fff")};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};

  ${({ disabled }) =>
    !disabled &&
    `
  &:hover {
    border: 1px solid #2275D3;
    color: #2275D3;
  }
`}

  ${({ buttonType }) => {
    switch (buttonType) {
      case "Delete":
        return css`
          border: 1px solid red;
          color: red;
          &:hover {
            background: red;
            color: white;
            border: 1px solid red;
          }
        `
      case "Block":
        return css`
          border: 1px solid darkorange;
          color: darkorange;
          &:hover {
            background: darkorange;
            color: white;
            border: 1px solid darkorange;
          }
        `
      case "Update Info":
        return css`
          border: 1px solid darkorange;
          color: darkorange;
          &:hover {
            background: darkorange;
            color: white;
            border: 1px solid darkorange;
          }
        `
      case "Activate":
        return css`
          /* background: green; */
          border: 1px solid darkgreen;
          color: darkgreen;
          &:hover {
            background: darkgreen;
            color: white;
            border: 1px solid darkgreen;
          }
        `
      default:
        return css`` // Для остальных кнопок применяем стандартные стили
    }
  }}
`
