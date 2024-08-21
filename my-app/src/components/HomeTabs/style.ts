import styled from "@emotion/styled"

// Styled components for Tabs

export const TabsContainer = styled.div`
  padding-top: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
`;

export const TabsHeader = styled.div`
  display: flex;  
`;

export const Tab = styled.button<{ isActive: boolean }>`
  padding: 10px 20px;
  font-family: "Chonburi", sans-serif;
  font-size: 20px; 
  border: none;
  border-radius: 10px 10px 0px 0px;
  border: ${({ isActive }) => (isActive ? '2px solid #007bff' : 'none')};
  background-color: ${({ isActive }) => (isActive ? 'white' : '#f0f0f0')};
  color: ${({ isActive }) => (isActive ? '#007bff' : '#333')};
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export const TabContent = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #fff;
`;