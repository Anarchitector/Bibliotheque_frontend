import axios from "axios";
import Button from "components/Button/Button";
import { ButtonBox, NameBox, StatusBox, UserItemComponent } from "./styles";
import { User } from "./types";

interface UserItemProps {
  user: User;
  onUserUpdate: (updatedUser: User) => void; // Пропс для обновления пользователя в родительском компоненте
  onUserDelete: (userId: number) => void; // Пропс для удаления пользователя
}

function UserItem({ user, onUserUpdate, onUserDelete }: UserItemProps) {
  const handleBlockOrActivate = async () => {
    const action = user.active ? "block" : "unlock"; // Обновлено для активации
    try {
      await axios.put(`http://localhost:8080/api/users/${action}`, {
        email: user.email,
      });

      // Обновляем состояние пользователя, чтобы отразить изменения на UI
      onUserUpdate({
        ...user,
        active: !user.active, // Переключаем статус активности
      });
    } catch (error) {
      console.error("Failed to update user status", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/users/delete`, {
        data: { email: user.email }
      });

      // Уведомляем родительский компонент об удалении
      onUserDelete(user.id);
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  return (
    <UserItemComponent>
      <div className="user-info">
        <p>ID: {user.id}</p>
        <p>{user.email}</p>
        <NameBox>
          <p>Name: {user.name || "N/A"}</p>
          <p>Surname: {user.surname || "N/A"}</p>
        </NameBox>
        <p>Phone: {user.phone || "N/A"}</p>
        <p>Roles: {user.roles.map((role) => role.title).join(", ")}</p>
        <div>
          <StatusBox isActive={user.active}>
            Active: {user.active ? "Yes" : "No"}
          </StatusBox>
        </div>
      </div>
      <ButtonBox>
        <Button name="Delete" onClick={handleDelete} />
        <Button
          name={user.active ? "Block" : "Activate"}
          onClick={handleBlockOrActivate}
        />
      </ButtonBox>
    </UserItemComponent>
  );
}

export default UserItem;
