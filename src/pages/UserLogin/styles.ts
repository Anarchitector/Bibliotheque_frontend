import { NavLink } from 'react-router-dom';
import styled from "@emotion/styled"

export const MainTitle = styled.h2`
  text-align: center;
  position: fixed;
  top: 20px;
  font-size: 15px;
  font-size: 30px;
`

export const BottomLine = styled.h2`
  text-align: center;
  position: fixed;
  bottom: 20px;
  font-size: 15px;
`

export const EntryField = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 50%;
  font-weight: bold;
  text {
    height: 12px;
  }
  margin-top: 18.5px;
  margin-bottom: 18.5px;
  input {
    background-color: #d9d9d9;
    color: #6d6968;
    height: 40px;
    border-radius: 5px;
    border-width: 0;
  }
`

export const LoginButton = styled.button`
  width: 200px;
  padding: 7px;
  margin: 25px;
  font-size: 20px;
  background-color: white;
  border-radius: 5px;
  border-color: black;
    /*
    border-style: solid;
    makes clicking invisible
    */
`

export const AuthorizationForm = styled.div`
  margin-top: 18.5px;
  margin-bottom: 18.5px;
  display: flex;
  flex-direction: column;
  width: 38%;
  padding: 37px;
`

export const RegistrationLink = styled.div`
  margin-top: 18.5px;
  margin-bottom: 18.5px;
  height: 19px;
`
