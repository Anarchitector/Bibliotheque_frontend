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
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 600px) {
    font-size: 20px;
  }
`

export const MainColumn = styled.div`
  display: flex;
  margin-top: 15px;
  margin-bottom: 15px;

  @media (max-width: 600px) {
    flex-direction: column;    
    align-items: center;
    width: 100%;
    padding: 0 10px; /* Немного сдвигаем контент, чтобы не прилипал к краям экрана */
    margin-top: 10px;
    margin-bottom: 10px;
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

export const TwoButtons = styled.div`
  display: flex;  
  justify-content:center;  
  //align-items: center;
  width: 200px;
  gap: 30px;
  margin-left: 1em;
  margin-right: 1em;

  @media (max-width: 600px) {
    display: flex;  
    flex-direction: column;
    width: 100%;
    margin-left: 0;
    margin-right: 0;
    //padding: 10px; /* Немного сдвигаем контент, чтобы не прилипал к краям экрана */
  }
`

export const TwoTopButtons = styled.div`
  display: flex;  
  justify-content:center;  
  width: 100%;
  gap: 30px;
  margin-bottom:20px;

  @media (max-width: 600px) {
    display: flex;  
    flex-direction: column;
    width: 100%;
    
    //padding: 10px; /* Немного сдвигаем контент, чтобы не прилипал к краям экрана */
  }
`