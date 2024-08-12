import { css } from "@emotion/react"
import styled from "@emotion/styled"

interface StyledButtonProps {
  disabled: boolean
}

export const ButtonCompanent = styled.button`
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
`
