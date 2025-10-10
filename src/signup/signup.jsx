import React from 'react';
import '../login/login.css';
import { NavLink } from 'react-router-dom';

export function Signup() {
  return (
    <main className="login-main">
        <div className="login-form">
            <h2>Signup</h2>
            
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" placeholder="Enter username" required />
            
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" placeholder="Enter password" required />
            
            <button type="button">Signup</button>
            
            <p>Already have an account? <NavLink className='nav-link' to='../login'>Login here</NavLink></p>
        </div>
    </main>
  );
}