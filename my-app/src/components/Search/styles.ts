import styled from "@emotion/styled"

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

export const InputField = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  border: 1px solid #d9d9d9;
  background-color: #d9d9d9;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  font-size: 12px;

  &:focus {
    outline: none;
    border-color: #d9d9d9;
  }

  &::placeholder {
    color: white;
  }
`

export const SearchButton = styled.button`
height: 40px;
  padding: 10px 15px;
  border: 1px solid #4a90e2;
  border-radius: 0 5px 5px 0;
  background-color: #4a90e2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  color: white;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background-color: #357ab8;
  }

  &:disabled {
    /* border: 1px solid #ccc; */
    /* background-color: #ccc; */
    cursor: not-allowed;
  }
`

export const SelectField = styled.select`
  height: 40px;
  padding: 8px;
  font-size: 12px;
  border: 1px solid #4a90e2;
  border-radius: 5px 0 0 5px;
  background-color: #4a90e2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  color: white;

  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`
