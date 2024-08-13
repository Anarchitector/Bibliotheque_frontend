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
