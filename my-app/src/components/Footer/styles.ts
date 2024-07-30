import styled from "@emotion/styled"

export const FooterComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Copyright = styled.div`
  font-size: 12px;
  margin-bottom: 15px;

  @media (max-width: 600px) {
    font-size: 10px;
    margin-bottom: 10px;
  }
`
