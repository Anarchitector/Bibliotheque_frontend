
import styled from "@emotion/styled"

export const FormUserLoginContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  @media (max-width: 600px) {
    gap:10px;   
  }
`

export const FormTitle = styled.h2``

export const InputForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  @media (max-width: 600px) {
    width: 260px;   
  }
`

export const LinkComponent = styled.a`
  font-size: 16px;
  text-decoration: none;
  color: inherit; /* Использует текущий цвет текста */

  &:hover {
    text-decoration: underline; /* Добавляет подчеркивание при наведении */
    color: #2275D3; /* Замените на нужный цвет */
  }
  @media (max-width: 600px) {
    font-size: 14px;
  }
`