import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ privateRoute, redirectPath = "/login", children }) {
  const isAllowed = privateRoute;
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
