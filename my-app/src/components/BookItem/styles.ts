import styled from "@emotion/styled"

export const ErrorMessage = styled.h2`
  padding:20px 10px 20px 10px;
  @media (max-width: 600px) {
    padding:10px 0px 10px 0px;
    font-size: 20px;
  }
`

export const BookItemComponent = styled.div`
  min-width: 950px;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  &:hover {
    border: 1px solid #ff6b35;
    box-shadow: 0px 4px 6px rgba(255, 107, 53, 0.3);
  }

  @media (max-width: 980px) {
    /* Адаптация для мобильных устройств */
    flex-direction: column;
    align-items: center;
    min-width: 100%;
    text-align: center;
  }
`

export const BookPhotoComponent = styled.div`
  padding: 15px 0px 15px 20px;

  @media (max-width: 768px) {
    padding: 15px;
  }
`

export const BookPhoto = styled.img`
  width: 140px;
  height: 170px;
  border-radius: 5px;
`

export const BtnComponent = styled.div<{ specialFunction: string }>`
  display: flex;
  flex-direction: ${({ specialFunction }) => (specialFunction === 'librarian' ? 'column' : 'column-reverse')};
  justify-content: ${({ specialFunction }) => (specialFunction === 'librarian' ? 'space-between' : 'flex-start')};
  height: ${({ specialFunction }) => (specialFunction === 'librarian' ? '100%' : 'auto')};

  @media (max-width: 768px) {
    margin-top: 10px;
    ${({ specialFunction }) =>
      specialFunction === 'librarian' &&
      `
      flex-direction: row; /* Assemble into a row */
      justify-content: space-evenly; /* Evenly distribute elements in the row */
      align-items: center; /* Center the items vertically */
    `}
  }
`;

export const BookInfoComponent = styled.div`
  width: 100%; /* Добавляем процентную ширину для уменьшения */
  min-width: 300px; /* Минимальная ширина блока */
  max-width: 100%; /* Максимальная ширина блока */
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;

  @media (min-width: 768px) and (max-width: 1024px) {
    min-width: 700px; /* Минимальная ширина блока */
  }

  @media (max-width: 768px) {
    width: 100%; /* Полная ширина на мобильных устройствах */
    min-width: 300px; /* Минимальная ширина блока */
    flex-direction: column;
    align-items: center;
    padding: 10px;
  }
`

export const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;

  @media (max-width: 768px) {
    // align-items: center;
    gap: 8px;
  }
`

export const BookTitle = styled.span`
  font-size: 22px;
  color: #2275d3;
`

export const SpanInfo = styled.span`
  font-size: 18px;
`

export const BookInfoSpan = styled.span`
  font-family: Cabin;
  font-size: 18px;
  color: #2275d3;
`
