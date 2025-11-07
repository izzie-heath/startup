import React from 'react';
import './leaderboard.css';

export function Leaderboard() {
  //this is a placeholder for the leaderboard logic until I get the server set up, it takes your username and highest streak from localStorage
  const habits = JSON.parse(localStorage.getItem('habits')) || [];
  const streak = habits.filter(habit => habit.streak).reduce((max, habit) => Math.max(max, habit.streak), 0);

  return (
    <main className="leaderboard-main">
        <h2>Leaderboard</h2>
        <table>
            <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Streak</th>
            </tr>
            <tr>
                <td>1</td>
                <td>{localStorage.getItem('username')}</td>
                <td>{streak}</td>
            </tr>
            <tr>
                <td>2</td>
                <td>gucci</td>
                <td>13</td>
            </tr>
            <tr>
                <td>3</td>
                <td>izzishek</td>
                <td>8</td>
            </tr>
            <tr>
               <td>4</td>
               <td>yourmom</td>
               <td>5</td>
            </tr>
            <tr>
               <td>5</td>
               <td>geronimo</td>
               <td>3</td>
            </tr>
            <tr>
               <td>6</td>
               <td>RunningOutOfUsernames1234</td>
               <td>2</td>
            </tr>
            <tr>
               <td>7</td>
               <td>helloworld</td>
               <td>1</td>
            </tr>
        </table>
    </main>
  );
}