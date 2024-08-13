import React from "react";
import { User } from "./types";
import UserItem from "./UserItem";

interface UsersListProps {
  users: User[];
  onUserUpdate: (updatedUser: User) => void;
  onUserDelete: (userId: number) => void; // Добавляем пропс для удаления пользователя
}

function UsersList({ users, onUserUpdate, onUserDelete }: UsersListProps) {
  return (
    <div>
      {users.map((user) => (
        <UserItem
          key={user.id}
          user={user}
          onUserUpdate={onUserUpdate}
          onUserDelete={onUserDelete}
        />
      ))}
    </div>
  );
}

export default UsersList;
