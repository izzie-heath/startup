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
    const existingUser = await db.getUser(req.body.email);
    if (existingUser) {
        return res.status(409).send({ msg: 'Existing user' });
    }
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const user = {
        email: req.body.email,
        password: passwordHash,
        token: uuid.v4(),
    };
    await db.addUser(user);
    setAuthCookie(res, user.token);
    res.send({ email: user.email });
    await db.updateUser({ ...user });
});


//logs in an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = await db.getUser(req.body.email);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
        user.token = uuid.v4();
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
    res.clearCookie(authCookieName);
    res.status(204).end();
    await db.updateUser({ ...user, token:null });
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
apiRouter.get('/habits', verifyAuth, async (_req, res) => {
    const habits = await db.getHabits(req.user.email);
    res.send(habits);
});

//adds a new habit for user
apiRouter.post('/habit', verifyAuth, async (req, res) => {
    const habit = {
        id: uuid.v4(),
        email: req.user.email,
        ...req.body,
    };
    const newHabit = await db.addHabit(habit);
    res.send(newHabit);
});

//updates a habit
apiRouter.patch('/habit/:id', verifyAuth, async (req, res) => {
    const updatedHabit = await db.updateHabit(req.params.id, req.body);
    res.send(updatedHabit);
});

//deletes a habit
apiRouter.delete('/habit/:id', verifyAuth, async (req, res) => {
    await db.deleteHabit(req.params.id);
    res.status(204).end();
});

//error handler
app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

//return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});



// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
