import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom"
import AddCategory from "./pages/AddCategory"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/dashboard/Dashboard"
import UpdateUser from "./pages/UpdateUser"
import UserPage from "./pages/UserPage"
import PaymentsPage from "./pages/paymentsPage/PaymentsPage"
import './styles/styles.css'
import Header from "./components/Header"
import ProtectedRoute from "./authentication/ProtectedRoute"
import { useAuth } from "./authentication/useAuth"
import NotFound from "./pages/NotFound"

function App() {
  const [isAuth, setAuth] = useAuth();

  return (
    <>
      <BrowserRouter>
    <Header isAuth={isAuth} setAuth={setAuth} />
      <div className="border"></div>
        <div className="container">
          <Routes>
            {/* REDIRECT TO LOGIN PAGE IF NOT LOGGED IN */}
            <Route element={<ProtectedRoute isAllowed={isAuth} redirectPath="/login"/>}>
              <Route index path="/" element={<Dashboard />} />
              <Route path="/user" element={<UserPage />} />
              <Route path="/user/update" element={<UpdateUser />} />
              <Route path="/addCategory" element={<AddCategory />} />
              <Route path="/payments" element={<PaymentsPage />} />
            </Route>
            {/* REDIRECT TO DASHBOARD IF ALREADY LOGGED IN */}
            <Route element={<ProtectedRoute isAllowed={!isAuth} redirectPath="/" />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            {/* 404 PAGE FOR OTHER PATHS */}
            <Route path='*' element={<NotFound />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;