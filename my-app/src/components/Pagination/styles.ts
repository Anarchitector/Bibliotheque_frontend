import styled from "@emotion/styled";

export const PaginationComponent = styled.div`
  display: flex;
  align-items: center;
`;

export const PaginationList = styled.ul`
  display: flex;
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const PageLi = styled.li`
  &.disabled {
    color: lightgray; /* Серый цвет для неактивной кнопки */
    pointer-events: none; /* Отключаем клики */
  }

  &:hover {
    text-decoration: underline;
    color: #2275d3;
    cursor: pointer;
  }

  &.disabled:hover {
    text-decoration: none; /* Убираем подчеркивание при наведении */
    color: gray; /* Оставляем серый цвет при наведении */
  }

  &.active {
    color: #2275d3; /* Цвет для активной ссылки */
    font-weight: 400;
    text-decoration: underline; /* Подчеркивание для активной ссылки */
  }
`;
