import styled from "@emotion/styled"

export const PageComponent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 100px;
  padding: 20px;

  @media (max-width: 700px) {
    margin-top: 70px;
  }

  @media (max-width: 600px) {
    margin-top: 70px;
  }
`

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 100;
  color: #2275d3;
  text-align: center;

  @media (max-width: 550px) {
    padding: 0 20px;
    font-size: 16px;
  }

  @media (max-width: 450px) {
    padding: 0 20px;
    font-size: 16px;
  }
`
