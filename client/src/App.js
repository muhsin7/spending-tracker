import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import UpdateUser from "./pages/UpdateUser"

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
            <Route path="/user" element={<UpdateUser />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
