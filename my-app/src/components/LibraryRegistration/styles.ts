import styled from "@emotion/styled"

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

export const FormTitle = styled.h2`
  @media (max-width: 600px) {
    font-size: 20px;
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