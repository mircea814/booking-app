import React from 'react';
import './LogIn.css';

function LogIn() {
    return (
        <div className='login-container'>
        <h1>Log In</h1>
       <form className='login-form'>
        <input type="text" placeholder="Username" className='login-input' required />
        <input type="password" placeholder="Password" className='login-input'  re/>
        <button type="submit" className='login-button'>Log In</button>
       </form>
      </div>
    );
}

export default LogIn;