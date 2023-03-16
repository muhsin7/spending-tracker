import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom"
import AddCategory from "./pages/AddCategory"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/dashboard/Dashboard"
import UpdateUser from "./pages/UpdateUser"
import UserPage from "./pages/UserPage"
import PaymentsPage from "./pages/paymentsPage/PaymentsPage"
import WelcomePage from "./pages/WelcomePage"
import './styles/styles.css'
import Header from "./components/Header"
import ProtectedRoute from "./authentication/ProtectedRoute"
import { useAuth } from "./authentication/useAuth"
import NotFound from "./pages/NotFound"
import AddPayment from "./pages/AddPayment"
import Background from "./pages/Background"

function App() {
  const [isAuth, setAuth] = useAuth();

  return (
    <>
      <BrowserRouter>
    <Header auth={[isAuth, setAuth]} />
      <div className="border"></div>
        <div className="container">
          {/* <Background /> */}
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            {/* REDIRECT TO LOGIN PAGE IF NOT LOGGED IN */}
            <Route element={<ProtectedRoute privateRoute={isAuth} redirectPath="/login"/>}>
              <Route index path="/dashboard" element={<Dashboard />} />
              <Route path="/user" element={<UserPage />} />
              <Route path="/user/update" element={<UpdateUser />} />
              <Route path="/addCategory" element={<AddCategory />} />
              <Route path="/addPayment" element={<AddPayment/>} />
              <Route path="/payments" element={<PaymentsPage />} />
            </Route>
            {/* REDIRECT TO DASHBOARD IF ALREADY LOGGED IN */}
            <Route element={<ProtectedRoute privateRoute={!isAuth} redirectPath="/dashboard" />}>
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