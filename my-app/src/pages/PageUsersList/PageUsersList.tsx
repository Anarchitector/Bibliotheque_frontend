import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "components/UserItem/types";
import { PageComponent, Title } from "./styles";
import UsersList from "components/UserItem/UsersList";
import Loader from "components/Loader/Loader";
import Pagination from "components/Pagination/Pagination";

function PageUsersList() {
  const [users, setUsers] = useState<User[]>([]); // Состояние для хранения списка пользователей
  const [loading, setLoading] = useState<boolean>(true); // Состояние загрузки
  const [error, setError] = useState<string | null>(null); // Состояние ошибок
  const [currentPage, setCurrentPage] = useState<number>(1); // Текущая страница
  const usersPerPage = 10; // Количество пользователей на одной странице

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>("http://localhost:8080/api/users");
        setUsers(response.data); // Устанавливаем полученные данные в состояние
        setLoading(false); // Завершаем состояние загрузки
      } catch (error) {
        setError("Failed to fetch users."); // Обрабатываем ошибку
        setLoading(false);
      }
    };

    fetchUsers(); // Вызываем функцию для загрузки данных
  }, []); // Пустой массив зависимостей означает, что эффект выполнится только при монтировании компонента

  const handleUserUpdate = (updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
  };

  const handleUserDelete = (userId: number) => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== userId)
    );
  };

  // Глобальная сортировка пользователей по ID перед пагинацией
  const sortedUsers = [...users].sort((a, b) => a.id - b.id);

  // Пагинация отсортированных пользователей
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return <Loader />; // Отображаем компонент загрузки
  }

  if (error) {
    return <p>{error}</p>; // Отображаем сообщение об ошибке
  }

  return (
    <PageComponent>
      <Title>List of all users.</Title>
      <UsersList
        users={currentUsers}
        onUserUpdate={handleUserUpdate} // Передаем функцию обновления статуса
        onUserDelete={handleUserDelete} // Передаем функцию удаления
      />
      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={sortedUsers.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </PageComponent>
  );
}

export default PageUsersList;
