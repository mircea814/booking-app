import React, { useState } from 'react';
import './LogIn.css';
import axios from 'axios';


function LogIn() {


 const[formData, setFormData] = useState({
    username: '',
    password: ''
 });
 const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
 }; 
 const [message, setMessage] = useState('');
 const [error, setError] = useState('');

 const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); 
    setError('');

    try {
      const token = localStorage.getItem('token');  
      const response = await axios.post('http://localhost:5000/api/users/login', formData,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      setMessage('Login successful!');
      localStorage.setItem('token', response.data.token);
      setFormData({ username  : '', password: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred during login');
    }
  };      


    return (
        <div className='login-container'>
        <h1>Log In</h1>
       <form className='login-form' onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" className='login-input' name='username' value={formData.username} onChange={handleChange}  />
        <input type="password" placeholder="Password" className='login-input' name='password' value={formData.password} onChange={handleChange}    />
        <button type="submit" className='login-button'>Log In</button>  
        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}
       </form>
      </div>
    );
}

export default LogIn;