import './dashboard.css';
import { NavLink } from 'react-router-dom';
import React, { useState, useEffect, use } from 'react';

export function Dashboard() {
  const username = localStorage.getItem('username') || 'Guest';

  const [habits, setHabits] = useState(() => {
    return JSON.parse(localStorage.getItem('habits')) || [
        { id: 1, text: 'Go to the gym', done: false },
        { id: 2, text: 'Read for 30 minutes', done: false },
        { id: 3, text: 'Study for 1 hour', done: false },
        { id: 4, text: 'Drink 8 glasses of water', done: false },
    ];
    });

    //this gets the current date and formats it into a month, day year format
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const day = currentDate.getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthName = monthNames[currentDate.getMonth()];
    const date = `${monthName} ${day}, ${year}`;

    //this is just simulating the API call for now by picking a random quote from an array
    const [quote, setQuote] = useState('');
    useEffect(() => {
        const quotes = [
            'I can do hard things.',
            'Every day is a fresh start.',
            'Small steps lead to big changes.',
            'Consistency is key to success.',
        ];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(randomQuote);
    }, []);

    useEffect(() => {
        localStorage.setItem('habits', JSON.stringify(habits));
    }, [habits]);


    //functions for handling habits
    function toggleHabit(id) {
        setHabits(habits.map(habit =>
            habit.id === id ? { ...habit, done: !habit.done } : habit
        ));
    }

    function addHabit() {
        const text = prompt('Enter a new habit:');
            if(!text) return;
            setHabits([...habits, { id: Date.now(), text, done: false }]);
    }

    function deleteHabit(id) {
        setHabits(habits.filter(habit => habit.id !== id));
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
            <p>{quote}</p>
        </div>
        <div className="habits">
            <div className="habits-column">
            <h3>Your Habits</h3>
                <fieldset className="habit-list">
                    {habits.map(habit => (
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
                                <img src="public/delete-icon.png" alt="X icon" />
                            </button>
                        </div>
                    ))}
                </fieldset>
                <button className="add-button" type="button" onClick={addHabit}>Add Habit</button>
            </div>

            <div className="streaks-column">
                <h3>Streaks</h3>
                <p>[Graph placeholder] [Streak data]</p>
                <p>[Graph placeholder] [Streak data]</p>
                <p>[Graph placeholder] [Streak data]</p>
                <p>[Graph placeholder] [Streak data]</p>
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