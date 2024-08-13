import { useNavigate } from "react-router-dom";
import { PageLi, PaginationComponent, PaginationList } from "./styles";
import { PaginationProps } from "./types";

function Pagination({
  usersPerPage,
  totalUsers,
  paginate,
  currentPage,
}: PaginationProps) {
  const pageNumbers: number[] = [];
  const navigate = useNavigate();

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (number: number) => {
    paginate(number); // Вызываем функцию для изменения текущей страницы
    navigate(`?page=${number}`); // Обновляем URL с номером страницы
  };

  return (
    <PaginationComponent>
      <nav>
        <PaginationList>
          {pageNumbers.map((number) => (
            <PageLi
              key={number}
              className={`page-item ${currentPage === number ? "active" : ""}`}
            >
              <a
                onClick={() => handlePageClick(number)}
                className="page-link"
              >
                {number}
              </a>
            </PageLi>
          ))}
        </PaginationList>
      </nav>
    </PaginationComponent>
  );
}

export default Pagination;
