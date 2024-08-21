import styled from "@emotion/styled"

interface StyledLibraryProps {
}

export const LibraryComponent = styled.div<StyledLibraryProps>`
  width: auto;
  height: auto;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid black;
  color: black;
  font-family: "Chonburi", sans-serif;
  font-size: 15px;
  background-color: lightgray;

  &:hover {
    background-color: darkgrey; /* Change to a darker grey when hovered */  
    transform: translateY(-2px); /* Slight lift effect */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Add a subtle shadow */
  } 
`

export const LibraryContainer = styled.form`
  display: flex;
  justify-content: space-evenly;
  gap: 30px;
  align-items: center;
  border: 1px solid black;
  padding: 15px;
  background-color: #f4f4f4;
  margin-bottom: 15px;

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 15px;
    gap: 20px;
    padding: 5px;
    margin-bottom: 5px;
  }
`

export const TwoButtons = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  
  gap: 30px; /* Horizontal gap between buttons for screens wider than 600px */

  @media (max-width: 600px) {
    width: 100%;
    padding: 10px; /* Немного сдвигаем контент, чтобы не прилипал к краям экрана */
    gap: 20px; /* Vertical gap between buttons for screens narrower than 600px */
  }
`