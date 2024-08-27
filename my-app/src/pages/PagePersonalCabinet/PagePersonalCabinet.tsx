import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import PersonalCabinet from "components/PersonalCabinet/PersonalCabinet";
import Button from "components/Button/Button";
import { PageComponent } from "./styles";
import { RootState } from "store/store";
import BookReservedList from "components/BookItem/BookReservedList";

function PagePersonalCabinet() {
  
  const navigate = useNavigate();

  // Используем роль пользователя из глобального состоянии
  const userRole = useSelector((state: RootState) => state.USER.role);

  // Функция для обработки клика по кнопке
  const handleLibraryButtonClick = () => {
    navigate("/api/bibliotek"); // Перенаправляем пользователя на страницу библиотеки
  };

  // Функция для обработки клика по кнопке
  const handleUsersListButtonClick = () => {
    navigate("/users"); // Перенаправляем пользователя на страницу библиотеки
  } 

  return (
    <PageComponent>
      {userRole === "ROLE_ADMIN" && (
        // Добавляем кнопку на странице, только если соответствует роли пользователя
        <Button 
          name="List of all users" 
          onClick={handleUsersListButtonClick}  // Обработка клика
        />
      )}
      <PersonalCabinet />
      {userRole === "ROLE_LIBRARY" && (
        // Добавляем кнопку на странице, только если соответствует роли пользователя
        <Button 
          name="Go to Library Manager" 
          onClick={handleLibraryButtonClick}  // Обработка клика
        />
      )}
     

     <BookReservedList />
    </PageComponent>
  );
}

export default PagePersonalCabinet;
