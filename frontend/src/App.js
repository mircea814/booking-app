import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Placeholder components
const Home = () => (
  <div className="container">
    <h1>Welcome to Booking App</h1>
    <p>Your one-stop solution for bookings</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="navbar-brand">Booking App</div>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 