export interface User {
    id: string;
    email: string;
    role: "ROLE_USER" | "ROLE_LIBRARY" | "ROLE_ADMIN"; // Роли пользователя
  }
  
  export interface FetchError {
    message: string;
  }
  