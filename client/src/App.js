import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom"
import AddCategory from "./pages/AddCategory"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/dashboard/Dashboard"
import UpdateUser from "./pages/UpdateUser"
import PaymentsPage from "./pages/paymentsPage/PaymentsPage"
import WelcomePage from "./pages/WelcomePage"
import CategoriesPage from "./pages/categoriesPage/CategoriesPage"
import './styles/styles.css'
import Header from "./components/Header"
import ProtectedRoute from "./authentication/ProtectedRoute"
import { useAuth } from "./authentication/useAuth"
import NotFound from "./pages/NotFound"
import AddPayment from "./pages/AddPayment"
import AddSpendingLimit from "./pages/AddSpendingLimit"
import EditSpendingLimit from "./pages/EditSpendingLimit"
import Achievements from "./pages/achievements/Achievements"
import Reports from "./pages/reports/Reports"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isAuth, setAuth] = useAuth();

  return (
    <>
    <BrowserRouter>
    <Header auth={[isAuth, setAuth]} />
    <ToastContainer />
      <div className="border"></div>
        <div className="container">
          <Routes>
            {/* REDIRECT TO LOGIN PAGE IF NOT LOGGED IN */}
            <Route element={<ProtectedRoute privateRoute={isAuth} redirectPath="/login"/>}>
              <Route index path="/dashboard" element={<Dashboard />} />
              <Route path="/user/update" element={<UpdateUser />} />
              <Route path="/addCategory" element={<AddCategory />} />
              <Route path="/addPayment" element={<AddPayment/>} />
              <Route path="/addSpendingLimit" element={<AddSpendingLimit/>} />
              <Route path="/editSpendingLimit" element={<EditSpendingLimit/>} />
              <Route path="/payments" element={<PaymentsPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/reports" element={<Reports />} />
            </Route>
            {/* REDIRECT TO DASHBOARD IF ALREADY LOGGED IN */}
            <Route element={<ProtectedRoute privateRoute={!isAuth} redirectPath="/dashboard" />}>
              <Route path="/" element={<WelcomePage />} />
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