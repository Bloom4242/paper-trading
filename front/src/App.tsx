// eslint-disable-next-line
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';

// Define the function to get a cookie
function getCookie(key: string): string | undefined {
  const match = document.cookie.match(`(^|;)\\s*${key}\\s*=\\s*([^;]+)`);
  return match ? match.pop() : undefined;
}

const App = () => {
  const token = getCookie('token'); 
  console.log('JWT Token:', token); 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
