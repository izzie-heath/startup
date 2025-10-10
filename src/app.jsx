import React from 'react';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Home } from './home/home';
import { Dashboard } from './dashboard/dashboard';
import { Leaderboard } from './leaderboard/leaderboard';
import { Login } from './login/login';
import { Signup } from './signup/signup';

export default function App() {
    return(
        <BrowserRouter>
            <div className="body">
                <header>
                <nav>
                    <div className="logo-group">
                        <img src="habitat-mascot.png" alt="HABITat Logo" className="logo-img" />
                        <div className="logo-group-text">
                            <NavLink className='nav-link' to='home'><h1>HABITat</h1></NavLink>
                            <p id="slogan">a place for good habits to grow</p>
                        </div> 
                    </div>
                    <div className="nav-links">
                        <p><NavLink className='nav-link' to='home'>Home</NavLink></p>
                        <p><NavLink className='nav-link' to='dashboard'>Dashboard</NavLink></p>
                        <p><NavLink className='nav-link' to='leaderboard'>Leaderboard</NavLink></p>
                        <p><NavLink className='nav-link' to='login'>Login</NavLink></p>
                    </div>
                </nav>
            </header>

            <Routes>
                <Route path="//" element={<Home />} exact/>
                <Route path="/home" element={<Home />} exact/>
                <Route path="/dashboard" element={<Dashboard />} exact/>
                <Route path="/leaderboard" element={<Leaderboard />} exact/>
                <Route path="/login" element={<Login />} exact/>
                <Route path="/signup" element={<Signup />} exact/>
                <Route path="*" element={<NotFound />} />
            </Routes>

            <footer>
                <div className="footer-text">
                    <p>Created by Izzie Heath</p>
                    <div className="footer-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="footer-icon" style={{ marginRight: '-15px' }}><path fill="#fff" d="m20 8l-8 5l-8-5V6l8 5l8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2"/></svg>
                        <p><a href="mailto:izzieh@byu.edu">Contact</a></p>
                    </div>
                    <div className="footer-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="footer-icon"><path fill="#fff" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/></svg>
                        <a href="https://github.com/izzie-heath/startup">GitHub</a>
                    </div>
                </div>
            </footer>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}