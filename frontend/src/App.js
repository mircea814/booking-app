import React, { useState, useEffect }  from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import LogIn from './LogIn/LogIn';
import Register from './components/Register';
import { Navigate } from 'react-router-dom';


function NavMenu() {
  const location = useLocation();
  const [token, setToken] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
  }, []);
  const isAuthenticated = !!token;
  return (
    <nav className="nav-menu">  
      {isAuthenticated && <Link to="/">Home</Link>} 
      {isAuthenticated && <Link to="/logout" onClick={handleLogout}>Logout</Link>}  
      {location.pathname === '/login' && <Link to="/register">Register</Link>}    
      {location.pathname === '/register' && <Link to="/login" onClick={handleLogin}>Login</Link>}
    </nav>
  );
} 
function handleLogin() {
  window.location.href = '/';
  window.location.reload(); 
}
  function handleLogout() {
    localStorage.removeItem('token');
    setToken(null);   
    window.location.href = '/login';
    window.location.reload(); 
  }

  function App() {
  const [token, setToken] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
  }, []);
  const isAuthenticated = !!token;    
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };    
  
  return (  
    <Router>  
      <div className="App">
        <NavMenu />
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} /> 
          <Route path="/logout" element={<Navigate to="/login" />} />
          <Route path="/" element={
            <ProtectedRoute>
              <header className="App-header">
                <h1>Booking App</h1>
                <p>Welcome to your one-stop booking solution!</p>
              </header>
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}   

export default App;