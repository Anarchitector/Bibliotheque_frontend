import { NavLink } from 'react-router-dom';
import styled from "@emotion/styled"

export const MainTitle = styled.h2`
  text-align: center;
  position: fixed;
  top: 20px;
  font-size: 30px;
  @media (max-width: 600px) {
    text-align: center;
    position: fixed;
    top: 10px;
    font-size: 29px;      
  }
`

export const BottomLine = styled.h2`
  text-align: center;
  position: fixed;
  bottom: 20px;
  font-size: 15px;
  @media (max-width: 600px) {
    text-align: center;
    position: fixed;
    bottom: 10px;
    font-size: 12px;  
  }
`

export const EntryField = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 50%;
  font-weight: bold;
  margin-top: 18.5px;
  margin-bottom: 18.5px;
  text {
    height: 12px;
  }  
  input {
    background-color: #d9d9d9;
    color: #6d6968;
    height: 40px;
    border-radius: 5px;
    border-width: 0;
  }
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    text-align: left;
    width: 90%;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 10x;
    text {
      height: 12px;
    }  
    input {
      background-color: #d9d9d9;
      color: #6d6968;
      height: 40px;
      border-radius: 2.5px;
      border-width: 0;
    }    
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
  @media (max-width: 600px) {
    width: 103px;
    padding: 3px;
    margin: 12.5px;
    font-size: 14px;
    background-color: white;
    border-radius: 2.5px;
    border-color: black;  
  }
`

export const AuthorizationForm = styled.div`
  margin-top: 18.5px;
  margin-bottom: 18.5px;
  display: flex;
  flex-direction: column;
  width: 38%;
  padding: 37px;
  @media (max-width: 600px) {
    margin-top: 9px;
    margin-bottom: 9px;
    display: flex;
    flex-direction: column;
    width: 38%;
    padding: 18px;  
  }
`

export const RegistrationLink = styled.div`
  margin-top: 18.5px;
  margin-bottom: 18.5px;
  height: 19px;
  @media (max-width: 600px) {
    margin-top: 9px;
    margin-bottom: 9px;
    height: 14px;  
  }
`
