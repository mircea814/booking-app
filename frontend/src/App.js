import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import LogIn from './LogIn/LogIn';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="nav-menu">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>

        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <header className="App-header">
              <h1>Booking App</h1>
              <p>Welcome to your one-stop booking solution!</p>
            </header>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;