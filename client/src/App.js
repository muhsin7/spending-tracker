import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import AddCategory from "./pages/AddCategory"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/dashboard/Dashboard"
import UpdateUser from "./pages/UpdateUser"
import UserPage from "./pages/UserPage"
import PaymentsPage from "./pages/paymentsPage/PaymentsPage"
import './styles/styles.css'
import Header from "./components/Header"

function App() {
  return (
    <>
      <Router>
    <Header />
      <div className="border"></div>
        <div className="container">
          <Routes>
            {/* Only Route tags are allowed in Routes tag */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/user/update" element={<UpdateUser />} />
            <Route path="/addCategory" element={<AddCategory />} />
            <Route path="/payments" element={<PaymentsPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;