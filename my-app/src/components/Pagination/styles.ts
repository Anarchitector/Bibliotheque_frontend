import styled from "@emotion/styled"

export const PaginationComponent = styled.div`
  display: flex;
  align-items: center;
`

export const PaginationList = styled.ul`
  display: flex;
  gap: 20px;
  list-style: none; /* Убирает маркеры у элементов списка */
  padding: 0; /* Убирает отступы */
  margin: 0;
`

export const PageLi = styled.li`
  &:hover {
    text-decoration: underline; /* Добавляет подчеркивание при наведении */
    color: #2275d3; /* Замените на нужный цвет */
  }

  &.active {
    color: #2275d3; // Цвет для активной ссылки
    font-weight: 400;
    text-decoration: underline; /* Добавляет подчеркивание при наведении */
  }
`
