import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { RootState } from "store/store" // Импорт корневого состояния для типизации
import { ProtectedRouteProps } from "./types"

function ProtectedRoute({
  allowedRoles,
  redirectPath = "/access-denied",
}: ProtectedRouteProps) {
  const { isAuthenticated, role: userRole } = useSelector((state: RootState) => state.USER);

  if (!isAuthenticated) {
    return <Navigate to="/api/auth/login" replace />;
  }

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
