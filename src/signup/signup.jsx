import React, { useState } from 'react';
import '../login/login.css';
import { NavLink, useNavigate } from 'react-router-dom';

export function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSignup() {
    if (!username.trim() || !password.trim()) {
      alert('Please enter both username and password');
      return;
    }

    try {
      const response = await fetch('/api/auth/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username.trim(), password }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('username', data.email);
        navigate('/dashboard');
      } else {
        let errorMsg = 'Signup failed';
        try {
          const error = await response.json();
          errorMsg = error.msg || errorMsg;
        } catch {
          errorMsg = `Server error (${response.status})`;
        }
        alert(errorMsg);
      }
    } catch (err) {
      console.error('Signup error:', err);
      console.error('Error details:', {
        message: err.message,
        name: err.name,
        stack: err.stack
      });
      alert(`Unable to connect to server: ${err.message}`);
    }
  }

  return (
    <main className="login-main">
        <div className="login-form">
            <h2>Signup</h2>

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

            <button type="button" onClick={handleSignup}>
              Signup
            </button>

            <p>Already have an account? <NavLink className='nav-link' to='../login'>Login here</NavLink></p>
        </div>
    </main>
  );
}