import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from "./pages/login"
import Register from "./pages/register"
import Dashboard from "./pages/dashboard"
import UpdateUser from "./pages/updateUser"
import UserPage from "./pages/userPage"
import AddCategory from "./pages/addCategory"

function App() {
  return (
    <>
      <Router>
        <div className="container">

          <Routes>
            {/* Only Route tags are allowed in Routes tag */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/user/update" element={<UpdateUser />} />
            <Route path="/addCategory" element={<AddCategory />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
