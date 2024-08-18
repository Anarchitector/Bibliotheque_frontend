import styled from "@emotion/styled"

interface StyledLibraryProps {
}

export const LibraryComponent = styled.div<StyledLibraryProps>`
  width: auto;
  height: auto;
  padding: 10px;
  border: 5px solid black;
  border-radius: 5px;
  color: black;
  font-family: "Chonburi", sans-serif;
  font-size: 15px;
  background: "lightgray";
 
`

export const LibraryContainer = styled.form`
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