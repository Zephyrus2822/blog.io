import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./components/Landing/Landing.jsx";
import Signup from "./components/Signup/Signup.jsx";
import Login from "./components/Signin/Signin.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import BlogPage from "./components/BlogPage/BlogPage.jsx";
import "./App.css";

function isAdmin() {
  // Replace with actual admin check logic
  return localStorage.getItem("role") === "admin";
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={isAdmin() ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/blogpage" element={<BlogPage />} />
      </Routes>
    </Router>
  );
}

export default App;
