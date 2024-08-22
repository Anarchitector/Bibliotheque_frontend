import styled from "@emotion/styled"

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

export const InputField = styled.input`
  width: 100%;
  height: 50px;
  padding: 10px;
  border: 1px solid #d9d9d9;
  background-color: #d9d9d9;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  font-family: Chonburi;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #2275D3;
  }

  &::placeholder {
    color: white;
  }

  @media screen {
    font-size: 12px;
  }
`

export const SearchButton = styled.button`
height: 50px;
  padding: 10px 15px;
  border: 1px solid #2275D3;
  border-radius: 0 5px 5px 0;
  background-color: #2275D3;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  color: white;
  font-family: Chonburi;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #357ab8;
  }

  &:disabled {
    /* border: 1px solid #ccc; */
    /* background-color: #ccc; */
    cursor: not-allowed;
  }

  @media screen {
    font-size: 12px;
  }
`

export const SelectField = styled.select`
  height: 50px;
  padding: 8px;
  font-family: Chonburi;
  font-size: 14px;
  border: 1px solid #2275D3;
  border-radius: 5px 0 0 5px;
  background-color: #2275D3;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  color: white;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    /* outline: none; */
    border-color: #2275D3;
  }

  @media screen {
    font-size: 12px;
  }
`
