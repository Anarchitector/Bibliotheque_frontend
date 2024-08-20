import styled from "@emotion/styled"

// Styled components for Tabs
export const TabsContainer = styled.div`
  display: flex;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
`;

export const Tab = styled.button<{ isActive: boolean }>`
  padding: 10px 20px;
  border: none;
  border-bottom: ${({ isActive }) => (isActive ? '2px solid #007bff' : 'none')};
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
  border-top: none;
  background-color: #fff;
`;