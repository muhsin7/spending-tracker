import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

function ProtectedRoute({
  privateRoute,
  redirectPath = '/login',
  children,
}) {
  const [isAuth, setAuth] = useAuth();
  // const isAllowed = privateRoute ? isAuth : !isAuth;
  const isAllowed = privateRoute;
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;