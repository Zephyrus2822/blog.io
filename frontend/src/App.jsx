import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/Landing/Landing.jsx';
import Signup from './components/Signup/Signup.jsx';
import Login from './components/Signin/Signin.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;