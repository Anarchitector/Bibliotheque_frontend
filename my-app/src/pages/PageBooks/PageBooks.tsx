import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RootState } from "store/store"
import { PageComponent } from "./styles"
import LibraryBookManager from "components/LibraryBookManager/LibraryBookManager"

function PageBooks() {
  const navigate = useNavigate()

  // Используем роль пользователя из глобального состоянии
  const userRole = useSelector((state: RootState) => state.USER.role)

  // Проверяем роль пользователя
  if (userRole !== "ROLE_LIBRARY" && userRole !== "ROLE_ADMIN") {
    navigate("/access-denied") // Перенаправляем на страницу с ошибкой доступа
    return null // Не рендерим компонент, если роль не соответствует
  }

  return (
    <PageComponent>
      {/* Страница управления книгами */}
      <LibraryBookManager />
    </PageComponent>
  )
}

export default PageBooks
