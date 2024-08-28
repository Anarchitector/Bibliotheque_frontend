// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "store/store";
import { PageComponent } from "./styles";
import LibraryOrderedBooks from "components/LibraryOrderedBooks/LibraryOrderedBooks";

function PageLibraryOrderedBooks() {
  const navigate = useNavigate();

  // Используем роль пользователя из глобального состоянии
  const userRole = useSelector((state: RootState) => state.USER.role);

  // Проверяем роль пользователя
  if (userRole !== "ROLE_LIBRARY" && userRole !== "ROLE_ADMIN") {
    navigate("/access-denied"); // Перенаправляем на страницу с ошибкой доступа
    return null; // Не рендерим компонент, если роль не соответствует
  } 

  return (
    <PageComponent>
      <LibraryOrderedBooks/>      
    </PageComponent>
  );
}

export default PageLibraryOrderedBooks;
