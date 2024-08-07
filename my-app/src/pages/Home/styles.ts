import styled from "@emotion/styled"

export const SearchBoxComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  margin-top: 43px;
  gap: 40px;
  background-color: #f5f5f5;

  @media (max-width: 1000px) {
    margin-top: 43px;
  }
`

export const SearchConteiner = styled.div`
  width: 600px;

  @media (max-width: 630px) {
    width: 530px;
  }

  @media (max-width: 550px) {
    width: 430px;
  }

  @media (max-width: 450px) {
    width: 330px;
  }
`

export const Title = styled.h3`
  font-size: 20px;
  font-weight: 100;
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
