import React from 'react';
import './LogIn.css';

function LogIn() {
    return (
        <div className="login-container">
            <h1>Log1In</h1>
            <form> 
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Log In</button>
            </form>

        </div>
    );
}

export default LogIn;