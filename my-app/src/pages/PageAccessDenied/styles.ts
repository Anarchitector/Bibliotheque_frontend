import styled from "@emotion/styled"
import { Link } from "react-router-dom"

export const AccessDeniedBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 80px;
  padding: 20px;
  gap: 30px;
`

export const ErrorBox = styled.div`
  color: red;
  font-size: 18px;
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