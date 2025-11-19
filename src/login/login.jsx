import React, { useState } from 'react';
import './login.css';
import { NavLink, useNavigate } from 'react-router-dom';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleLogin() {
    if (!username.trim() || !password.trim()) {
      alert('Please enter both username and password');
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username.trim(), password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('username', data.email);
        navigate('/dashboard');
      } else {
        const error = await response.json();
        alert(error.msg || 'Login failed');
      }
    } catch (err) {
      alert('Network error. Is the server running?');
      console.error(err);
    }
  }

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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="button" onClick={handleLogin}>
              Login
            </button>

            <p>New user? <NavLink className='nav-link' to='../signup'>Register here</NavLink></p>
        </div>
    </main>
  );
}