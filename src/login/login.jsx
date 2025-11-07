import React, { useState } from 'react';
import './login.css';
import { NavLink, useNavigate } from 'react-router-dom';

export function Login() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  return (
    <main className="login-main">
        <div className="login-form">
            <h2>Login</h2>

            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              required
            />

            <button
              type="button"
              onClick={() => {
                if (!username.trim()) {
                  alert('Please enter a username');
                } else {
                  localStorage.setItem('username', username.trim());
                  navigate('/dashboard');
                }
              }}
            >
              Login
            </button>

            <p>New user? <NavLink className='nav-link' to='../signup'>Register here</NavLink></p>
        </div>
    </main>
  );
}