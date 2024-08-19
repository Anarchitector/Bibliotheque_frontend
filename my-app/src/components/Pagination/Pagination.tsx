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

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      handlePageClick(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < pageNumbers.length) {
      handlePageClick(currentPage + 1);
    }
  };

  return (
    <PaginationComponent>
      <nav>
        <PaginationList>
          {/* Кнопка Previous */}
          <PageLi className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <a onClick={handlePreviousClick} className="page-link">
              Previous
            </a>
          </PageLi>

          {/* Номера страниц */}
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

          {/* Кнопка Next */}
          <PageLi
            className={`page-item ${
              currentPage === pageNumbers.length ? "disabled" : ""
            }`}
          >
            <a onClick={handleNextClick} className="page-link">
              Next
            </a>
          </PageLi>
        </PaginationList>
      </nav>
    </PaginationComponent>
  );
}

export default Pagination;
