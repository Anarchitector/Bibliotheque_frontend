import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "store/store";
import { PageComponent } from "./styles";
import LibraryManager from "components/LibraryManager/LibraryManager";
import Button from "components/Button/Button";

function PageLibrary() {
  const navigate = useNavigate();

  // Используем роль пользователя из глобального состоянии
  const userRole = useSelector((state: RootState) => state.USER.role);

  // Проверяем роль пользователя
  if (userRole !== "ROLE_LIBRARY" && userRole !== "ROLE_ADMIN") {
    navigate("/access-denied"); // Перенаправляем на страницу с ошибкой доступа
    return null; // Не рендерим компонент, если роль не соответствует
  }
   
  // Функция для обработки клика по кнопке
  const handleBooksButtonClick = () => {
    navigate("/api/books"); // Перенаправляем пользователя на страницу c книгами
  }  

  return (
    <PageComponent>
      <LibraryManager/>

      {userRole === "ROLE_LIBRARY" && (
        // Добавляем кнопку на странице, только если соответствует роли пользователя
        <Button 
          name="Go to Books List" 
          onClick={handleBooksButtonClick}  // Обработка клика
        />
      )}
    </PageComponent>
  );
}

export default PageLibrary;
