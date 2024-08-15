import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "store/store";
import { PageComponent } from "./styles";
import LibraryManager from "components/LibraryManager/LibraryManager";
import Button from "components/Button/Button";
import RegistrationOfLibrary from "components/RegistrationOfLibrary/RegistrationOfLibrary";

function PageLibraryRegistration() {
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
      <RegistrationOfLibrary/>      
    </PageComponent>
  );
}

export default PageLibraryRegistration;
