import React, { useEffect, useState } from 'react';
import './leaderboard.css';

export function Leaderboard() {
  // Seed the leaderboard with the current user's best streak from localStorage
  const habits = JSON.parse(localStorage.getItem('habits')) || [];
  const initialStreak = habits
    .filter((habit) => typeof habit.streak === 'number')
    .reduce((max, habit) => Math.max(max, habit.streak), 0);

  const username = localStorage.getItem('username') || 'You';

  const [leaders, setLeaders] = useState([
    {
      email: username,
      displayName: username,
      totalStreak: initialStreak,
    },
    //placeholder entries so the leaderboard isn't empty
    { email: 'gucci@example.com', displayName: 'gucci', totalStreak: 13 },
    { email: 'izzishek@example.com', displayName: 'izzishek', totalStreak: 8 },
  ]);

  // Load initial leaderboard data from backend
  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const res = await fetch('/api/leaderboard', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setLeaders(data.map(entry => ({
            email: entry.email,
            displayName: entry.email.split('@')[0],
            totalStreak: entry.totalStreak
          })));
        }
      } catch (err) {
        console.error('Failed to load leaderboard:', err);
      }
    }
    loadLeaderboard();
  }, []);

  // WebSocket for real-time updates
  useEffect(() => {
    // Figure out ws or wss based on current page protocol
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

    socket.onopen = () => {
      console.log('Leaderboard WebSocket connected');
    };

    socket.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.type === 'streakUpdate') {
          const { email, totalStreak } = msg;
          setLeaders((prev) => {
            const existing = prev.find((l) => l.email === email);
            let next;
            if (existing) {
              next = prev.map((l) =>
                l.email === email ? { ...l, totalStreak } : l
              );
            } else {
              next = [
                ...prev,
                {
                  email,
                  displayName: email,
                  totalStreak,
                },
              ];
            }
            next.sort((a, b) => b.totalStreak - a.totalStreak);
            return next.slice(0, 10);
          });
        }
      } catch (e) {
        console.error('Bad WebSocket message', e);
      }
    };

    socket.onclose = () => {
      console.log('Leaderboard WebSocket disconnected');
    };

    socket.onerror = (err) => {
      console.error('Leaderboard WebSocket error', err);
    };

    // Cleanup on unmount
    return () => socket.close();
  }, []);

  return (
    <main className="leaderboard-main">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Streak</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((leader, index) => (
            <tr key={leader.email + index}>
              <td>{index + 1}</td>
              <td>{leader.displayName}</td>
              <td>{leader.totalStreak}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
