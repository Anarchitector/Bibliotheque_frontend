import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "store/store";
import { PageComponent } from "./styles";
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

  return (
    <PageComponent>
      <RegistrationOfLibrary/>      
    </PageComponent>
  );
}

export default PageLibraryRegistration