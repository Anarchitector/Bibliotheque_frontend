import styled from "@emotion/styled"

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  gap: 30px;
`
export const PageTitle = styled.h2`
  font-weight: 200;
`

export const TypeErrorSpan = styled.span`
  padding: 30px;
  color: red;
`

export const LinkComponent = styled.a`
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
