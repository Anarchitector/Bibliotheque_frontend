import { css } from "@emotion/react"
import styled from "@emotion/styled"

interface StyledButtonProps {
  disabled: boolean
}

export const ButtonCompanent = styled.button<{customColor?: string}>`
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
  // передача необязательного цвета кнопки
  background: ${({ disabled, customColor }) => (disabled ? ("lightgray") : ((customColor) ? (customColor) : ("#fff")) )};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};

  // осветление текста при наводе курсора выглядит хорошо с белой кнопкой, но с другими цветами не очень. 
  ${({ disabled, customColor }) =>
    !disabled &&
    `
  &:hover {
    border: 1px solid #2275D3;
    color: ${customColor ? "black" : "#4a90e2"};;
  }
`}
`