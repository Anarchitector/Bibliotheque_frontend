import styled from "@emotion/styled"

export const UserItemComponent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  padding: 15px;
  margin: 10px;
  border: 1px solid lightgray;
  border-radius: 5px;
  flex-wrap: wrap; /* Added to allow wrapping */

  &:hover {
    border: 1px solid #2275d3;
    background-color: #f5f5f5;
  }

  .user-info {
    display: flex;
    gap: 20px;
  }

  @media (max-width: 1220px) {
    flex-direction: column;
    gap: 20px;

    .user-info {
      flex-direction: column;
      flex: 1;
      display: block;
    }
  }
`

export const NameBox = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap; /* Allow wrapping for smaller screens */

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`

export const ButtonBox = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-end;

  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
    gap: 10px;
  }
`

export const StatusBox = styled.p<{ isActive: boolean }>`
  color: ${({ isActive }) => (isActive ? 'green' : 'red')};
`