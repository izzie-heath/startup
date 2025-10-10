import React from 'react';
import './login.css';

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
            
            <p>New user? <a href="/signup.html">Register here</a></p>
        </div>
    </main>
  );
}