// import React from "react";
// import { Navigate, Route } from "react-router-dom";

import { Navigate, Outlet } from "react-router-dom";

// function ProtectedRoute({ component: Component, ...restOfProps }) {
//   const isAuthenticated = localStorage.getItem("isAuthenticated");
//   console.log("this", isAuthenticated);

//   return (
//     <Route
//       {...restOfProps}
//       render={(props) =>
//         isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />
//       }
//     />
//   );
// }

// export default ProtectedRoute;

function ProtectedRoute({
  isAllowed,
  redirectPath = '/login',
  children,
}) {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;