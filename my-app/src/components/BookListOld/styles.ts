import styled from "@emotion/styled"

export const PageTitle = styled.h2`
  font-weight: 200;
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