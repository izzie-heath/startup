import React from 'react';
import './login.css';
import { NavLink } from 'react-router-dom';

export function Login() {
  return (
    <main className="login-main">
        <div className="login-form">
            <h2>Login</h2>
            
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" placeholder="Enter username" required />
            
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" placeholder="Enter password" required />
            
            <button type="button">Login</button>
            
            <p>New user? <NavLink className='nav-link' to='../signup'>Register here</NavLink></p>
        </div>
    </main>
  );
}