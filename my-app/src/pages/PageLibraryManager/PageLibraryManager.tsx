import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "store/store";
import { ButtonCushion, PageComponent } from "./styles";
import LibraryManager from "components/LibraryManager/LibraryManager";
import Button from "components/Button/Button";

function PageLibraryManager() {
  const navigate = useNavigate();

  // Используем роль пользователя из глобального состоянии
  const userRole = useSelector((state: RootState) => state.USER.role);
  const userId = useSelector((state: RootState) => state.USER.id);

  // Проверяем роль пользователя
  if (userRole !== "ROLE_LIBRARY" && userRole !== "ROLE_ADMIN") {
    navigate("/access-denied"); // Перенаправляем на страницу с ошибкой доступа
    return null; // Не рендерим компонент, если роль не соответствует
  }
   
  // Функция для обработки клика по кнопке
  const handlePersonalButtonClick = () => {
    navigate(`/api/users/${userId}`); // Перенаправляем пользователя на страницу c книгами
  }  

  return (
    <PageComponent>
      <LibraryManager/>
      <ButtonCushion></ButtonCushion>
      {userRole === "ROLE_LIBRARY" && (
        // Добавляем кнопку на странице, только если соответствует роли пользователя
        <Button 
          name="Go to Profile Manager" 
          onClick={handlePersonalButtonClick}  // Обработка клика
        />
      )}
    </PageComponent>
  );
}

export default PageLibraryManager;
