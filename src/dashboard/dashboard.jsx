import React from 'react';
import './dashboard.css';

export function Dashboard() {
  return (
    <main>
        <div className="hello-section">
            <h2>Hello, [Your Name]!</h2>
            <h4>[Today's date]</h4>
            <p>[Inspirational quote of the day; generated via third-party service.]</p>
        </div>
        <div className="habits">
            <div className="habits-column">
            <h3>Your Habits</h3>
                <fieldset className="habit-list">
                    <input type="checkbox" id="habit1" name="habit1" />
                    <label htmlFor="habit1">Go to the gym</label>
                    <br />
                    <input type="checkbox" id="habit2" name="habit2" />
                    <label htmlFor="habit2">Read for 30 minutes</label>
                    <br />
                    <input type="checkbox" id="habit3" name="habit3" />
                    <label htmlFor="habit3">Study for 1 hour</label>
                    <br />
                    <input type="checkbox" id="habit4" name="habit4" />
                    <label htmlFor="habit4">Drink 8 glasses of water</label>
                </fieldset>
                <button type="button">Add Habit</button>
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
            <a href="/leaderboard.html"><button>View Full Leaderboard</button></a>
        </div>
    </main>
  );
}