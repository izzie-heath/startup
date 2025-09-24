# HABITat

[My Notes](notes.md)

A brief description of the application here. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.


> [!NOTE]
>  This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

> [!NOTE]
>  If you are not familiar with Markdown then you should review the [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) before continuing.

## 🚀 Specification Deliverable

> [!NOTE]
>  Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown - I learned Markdown and typed this deliverable in it.
- [x] A concise and compelling elevator pitch - My elevator pitch explains why HABITat is helpful and introduces it's key functions.
- [x] Description of key features - I listened the main features of my startup.
- [x] Description of how you will use each technology - I listed how I will use HTML, CSS, React, Service, DB/Login, and WebSocket technologies in my startup.
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references. - I included a mockup for the dashboard page that I created using NinjaMock.

### Elevator pitch

Tired of feeling forgetful, unmotivated, or disorganized? Then HABITat is for you! This gamified daily to-do list allows you to compete against your friends and see if you have the highest consistency. As your daily streaks grow, you'll earn badges, climb the leaderboard, and make progress in your life. HABITat: a place where good habits grow.

### Design

![Design image](habitat-mockup.png)

Here is an image showing the main dashboard after a user logs in. I designed this using [NinjaMock](NinjaMock.com). 

```mermaid
sequenceDiagram
    actor You
    actor Website
    You->>Website: Replace this with your design
```

### Key features

- Register/login to create an account.
- Add and track daily habits (such as going to the gym, drinking water, etc.)
- Earn streaks when you complete habits daily.
- Earn badges and climb the leaderboard as your streak increases.
- Compete with friends: see their streaks and leaderboard ranking.
- Motivational quotes appear each day to keep users inspired. 

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Will be used to create the basic structure of 3 web pages:
    - Login/register page
    - Main dashboard with habits and condensed leaderboard
    - Full leaderboard page
- **CSS** - Will be used to style my pages. I plan to use a mostly green color palette to match the "HABITat" theme.
- **React** - Will provide login, add/remove/check off habits, increasing/refreshing streaks, and routing between pages.
- **Service** - I will be using third party services to generate inspirational quotes and the current date. My backend service will have endpoints for:
    - Login/registration
    - Retrieving a user's data
    - Submitting completed habits
- **DB/Login** - Will securely store user credentials, streak data, badges, and leadership info in a database.
- **WebSocket** - As users complete habits, their streaks are updated in real time on other users' leaderboards.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://myhabitat.click/). - I leased a domain in Route53 and edited my Caddyfile so I can access my server through HTTPS.

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **HTML pages** - I did not complete this part of the deliverable.
- [x] **Proper HTML element usage** - I correctly used several different HTML elements, such as `<nav>`, `<main>`, `<h1>`, `<h2>`, `<p>`, `<ul>`, `<li>`, and `<fieldset>`.
- [x] **Links** - I linked all four of my pages together in a `<nav>` bar.
- [x] **Text** - I included text content in the forms of headers and paragraphs across all four of my pages.
- [x] **3rd party API placeholder** - I included a placeholder for the motivational quote API on my dashboard page.
- [x] **Images** - I included several SVG icons on my homepage. Note: my logo image is currently a placeholder because my sister is helping me draw it (she is a digital artist).
- [ ] **Login placeholder** - I did not complete this part of the deliverable.
- [ ] **DB data placeholder** - I did not complete this part of the deliverable.
- [ ] **WebSocket placeholder** - I did not complete this part of the deliverable.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Header, footer, and main content body** - I did not complete this part of the deliverable.
- [ ] **Navigation elements** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing** - I did not complete this part of the deliverable.
- [ ] **Application elements** - I did not complete this part of the deliverable.
- [ ] **Application text content** - I did not complete this part of the deliverable.
- [ ] **Application images** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - I did not complete this part of the deliverable.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.


## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
