import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LibraryBox } from "./styles";
import { RootState } from "store/store";

function PageLibrary() {
  const navigate = useNavigate();

  // Используем роль пользователя из глобального состоянии
  const userRole = useSelector((state: RootState) => state.USER.role);

  // Проверяем роль пользователя
  if (userRole !== "ROLE_LIBRARY" && userRole !== "ROLE_ADMIN") {
    navigate("/access-denied"); // Перенаправляем на страницу с ошибкой доступа
    return null; // Не рендерим компонент, если роль не соответствует
  }

  return (
    <LibraryBox>
      <h3>Page bibliotek</h3>
    </LibraryBox>
  );
}

export default PageLibrary;
