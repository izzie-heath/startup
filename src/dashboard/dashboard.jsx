import './dashboard.css';
import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export function Dashboard() {
    const username = localStorage.getItem('username') || 'Guest';

    const [habits, setHabits] = useState([]);

    //this gets the current date and formats it into a month, day year format
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const day = currentDate.getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthName = monthNames[currentDate.getMonth()];
    const date = `${monthName} ${day}, ${year}`;

    //API call to get a random inspirational quote
    const [quote, setQuote] = useState('');
    const [quoteAuthor, setQuoteAuthor] = useState('');

    // Load habits from backend
    useEffect(() => {
        async function loadHabits() {
            try {
                const response = await fetch('/api/habits', {
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setHabits(data);
                }
            } catch (err) {
                console.error('Failed to load habits:', err);
            }
        }
        loadHabits();
    }, []);

useEffect(() => {
    async function fetchQuote() {
        fetch('https://api.realinspire.live/v1/quotes/random')
        .then(response => response.json())
        .then(data => {
            setQuote(data[0].content);
            setQuoteAuthor(data[0].author);
            console.log(`${data[0].content} — ${data[0].author}`);
        })
        .catch();
    }
    fetchQuote();
}, []);


    useEffect(() => {
        const today = new Date().toDateString();
        const lastReset = localStorage.getItem('lastReset');
        if (lastReset !== today) {
            // Reset all habits to not done
            habits.forEach(habit => {
                if (habit.done) {
                    fetch(`/api/habit/${habit.id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ done: false }),
                        credentials: 'include',
                    }).catch(err => console.error('Failed to reset habit:', err));
                }
            });
            setHabits(prev => prev.map(h => ({ ...h, done: false })));
            localStorage.setItem('lastReset', today);
        }
    }, [habits]);


    //functions for handling habits
    async function toggleHabit(id) {
        const today = new Date().toDateString();
        const habit = habits.find(h => h.id === id);
        if (!habit) return;

        let updatedHabit;
        if (!habit.done) {
            let newStreak = habit.streak ?? 0;
            if (habit.lastCompleted === getYesterday()) {
                newStreak += 1;
            } else {
                newStreak = 1;
            }
            updatedHabit = { done: true, streak: newStreak, lastCompleted: today };
        } else {
            updatedHabit = { done: false, lastCompleted: null };
        }

        try {
            const response = await fetch(`/api/habit/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedHabit),
                credentials: 'include',
            });

            if (response.ok) {
                setHabits(habits.map(h => h.id === id ? { ...h, ...updatedHabit } : h));
            }
        } catch (err) {
            console.error('Failed to update habit:', err);
        }
    }

    function getYesterday() {
        const d = new Date();
        d.setDate(d.getDate() - 1);
        return d.toDateString();
    }

    async function addHabit() {
        const text = prompt('Enter a new habit:');
        if (!text) return;

        try {
            const response = await fetch('/api/habit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text,
                    done: false,
                    streak: 0,
                    lastCompleted: null
                }),
                credentials: 'include',
            });

            if (response.ok) {
                const newHabit = await response.json();
                setHabits([...habits, newHabit]);
            }
        } catch (err) {
            console.error('Failed to add habit:', err);
        }
    }

    async function deleteHabit(id) {
        try {
            const response = await fetch(`/api/habit/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (response.ok) {
                setHabits(habits.filter(habit => habit.id !== id));
            }
        } catch (err) {
            console.error('Failed to delete habit:', err);
        }
    }

    function confirmDelete(id) {
        if(window.confirm('Are you sure you want to delete this habit?  Streak data will be lost.')) {
            deleteHabit(id);
        }
    }

  return (
    <main>
        <div className="hello-section">
            <h2>Hello, {username}!</h2>
            <h4>{date}</h4>
            <p>{quote} — {quoteAuthor}</p>
        </div>
        <div className="habits">
            <div className="habits-column">
            <h3>Your Habits</h3>
                <fieldset className="habit-list">
                    {habits.length === 0 ? (
                        <p>You don't have any habits yet. Click "Add Habit" to get started!</p>
                    ) : (
                        habits.map(habit => (
                            <div key={habit.id}>
                                <input
                                    type="checkbox"
                                    id={`habit-${habit.id}`}
                                    checked={habit.done}
                                    onChange={() => toggleHabit(habit.id)}
                                />
                                <label htmlFor={`habit-${habit.id}`}>
                                    {habit.text}
                                </label>
                                <button className="delete-button" onClick={() => confirmDelete(habit.id)}>
                                    <img src="/delete-icon.png" alt="X icon" />
                                </button>
                            </div>
                    )))}
                </fieldset>
                <button className="add-button" type="button" onClick={addHabit}>Add Habit</button>
            </div>

<div className="streaks-column">
  <h3>Streaks</h3>
  {habits.map(h => (
    <div key={h.id} className="streak-item" style={{ marginBottom: '1rem' }}>
      <p>
        <strong>{h.text}</strong>: {h.streak}-day streak
      </p>
      <div className="streak-bar" style={{
        height: '12px',
        width: '100%',
        backgroundColor: '#e0e0e0',
        borderRadius: '6px',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${Math.min((h.streak / 10) * 100, 100)}%`,
          backgroundColor: 'var(--secondary-green)',
          transition: 'width 0.5s ease',
        }}></div>
      </div>
    </div>
  ))}
</div>

        </div>

        <div className="leaderboard-preview">
            <h3>Leaderboard</h3>
            <table>
                <tr>
                    <th>Rank</th>
                    <th>Username</th>
                    <th>Streak</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>cosmothecougar</td>
                    <td>15</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>gucci</td>
                    <td>12</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>izzishek</td>
                    <td>8</td>
                </tr>
            </table>
            <NavLink className='nav-link' to='../leaderboard'><button>View Full Leaderboard</button></NavLink>
        </div>
    </main>
  );
}
