const http = require('http');
const WebSocket = require('ws');

const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';

//database
const db = require('./database.js');

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use('/api', apiRouter);

//creates a new user
apiRouter.post('/auth/create', async (req, res) => {
    try {
        console.log('Creating user:', req.body.email);
        const existingUser = await db.getUser(req.body.email);
        if (existingUser) {
            console.log('User already exists');
            return res.status(409).send({ msg: 'Existing user' });
        }
        const passwordHash = await bcrypt.hash(req.body.password, 10);
        const user = {
            email: req.body.email,
            password: passwordHash,
            token: uuid.v4(),
        };
        console.log('Inserting user into database...');
        await db.addUser(user);
        console.log('User created successfully');
        setAuthCookie(res, user.token);
        res.send({ email: user.email });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send({ msg: 'Error creating user', error: error.message });
    }
});


//logs in an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = await db.getUser(req.body.email);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
        user.token = uuid.v4();
        await db.updateUser(user);
        setAuthCookie(res, user.token);
        res.send({ email: user.email });
        return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

//logs out a user
apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await db.getUserByToken(req.cookies[authCookieName]);
    if (user) {
        delete user.token;
    }
    await db.updateUser({ ...user, token: null });
    res.clearCookie(authCookieName);
    res.status(204).end();
});

//middleware to verify authentication to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await db.getUserByToken(req.cookies[authCookieName]);
  if (!user) {
    res.status(401).send({ msg: 'Unauthorized' });
    return;
  }
  req.user = user;
  next();
};

//gets all habits for user
apiRouter.get('/habits', verifyAuth, async (req, res) => {
    const habits = await db.getHabits(req.user.email);
    res.send(habits);
});

//adds a new habit for user
apiRouter.post('/habit', verifyAuth, async (req, res) => {
    try {
        console.log('Creating habit for user:', req.user.email);
        const habit = {
            id: uuid.v4(),
            email: req.user.email,
            ...req.body,
        };
        console.log('Inserting habit:', habit);
        const newHabit = await db.addHabit(habit);
        console.log('Habit created successfully');
        res.send(newHabit);
    } catch (error) {
        console.error('Error creating habit:', error);
        res.status(500).send({ msg: 'Error creating habit', error: error.message });
    }
});

//updates a habit, now includes web socket
apiRouter.patch('/habit/:id', verifyAuth, async (req, res) => {
    const updatedHabit = await db.updateHabit(req.params.id, req.body);
    res.send(updatedHabit);
    try {
        const habits = await db.getHabits(req.user.email);
        const totalStreak = habits.reduce((sum, h) => sum + (h.streak || 0), 0);
        broadcastStreakUpdate(req.user.email, totalStreak);
    } catch (e) {
        console.error('Error broadcasting streak update', e);
    }
});

//deletes a habit
apiRouter.delete('/habit/:id', verifyAuth, async (req, res) => {
    await db.deleteHabit(req.params.id);
    res.status(204).end();
});

//get leaderboard data
apiRouter.get('/leaderboard', async (req, res) => {
    const users = await db.getAllUsers();
    const habits = await db.getAllHabits();
    const leaderboard = users.map(user => {
    const userHabits = habits.filter(h => h.email === user.email);
    const totalStreak = userHabits.reduce((sum, h) => sum + (h.streak || 0), 0);
    return { email: user.email, totalStreak };
    });
    leaderboard.sort((a, b) => b.totalStreak - a.totalStreak);
    res.send(leaderboard);
});


//error handler
app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

//return the application's default page if the path is unknown
app.use((_req, res) => {
    const indexPath = require('path').join(__dirname, 'public', 'index.html');
    if (require('fs').existsSync(indexPath)) {
        res.sendFile('index.html', { root: 'public' });
    } else {
        res.status(404).send({ msg: 'Not found' });
    }
});


// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
  });
}

//Web Socket
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const wss = new WebSocket.Server({ server, path: '/ws' });

function broadcastStreakUpdate(email, totalStreak) {
    const message = JSON.stringify({
        type: 'streakUpdate',
        email,
        totalStreak,
    });

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
        client.send(message);
        }
    });
}
