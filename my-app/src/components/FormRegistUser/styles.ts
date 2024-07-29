import styled from "@emotion/styled"

export const FormRegistContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`

export const FormTitle = styled.h2``

export const InputForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
`

export const LinkComponent = styled.a`
  font-size: 16px;
  text-decoration: none;
  color: inherit; /* Использует текущий цвет текста */

  &:hover {
    text-decoration: underline; /* Добавляет подчеркивание при наведении */
    color: #4a90e2; /* Замените на нужный цвет */
  }
`
