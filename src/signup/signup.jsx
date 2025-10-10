import React from 'react';
import './login.css';

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
            
            <p>Already have an account? <a href="/login.html">Login Here</a></p>
        </div>
    </main>
  );
}