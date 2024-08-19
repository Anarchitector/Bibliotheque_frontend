import styled from "@emotion/styled"
import { Link } from "react-router-dom"

export const PageComponent = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  @media (max-width: 600px) {
    margin-top: 20px;
  }
`

export const LinkComponent = styled(Link)`
  font-size: 16px;
  color: #000;

  &:hover {
    color: #2275d3;
  }
`
export const BoxAuthorization = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`

export const BtnBoxAuthorization = styled.div`
  display: flex;
  gap: 30px;
`
