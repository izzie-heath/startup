// service/index.js
import express from 'express';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;
const authCookieName = 'token';
app.use(express.json());
app.use(cookieParser());

//database placeholder
let users = [];
let habits = [];

function setAuthCookie(res, token) {
  res.cookie(authCookieName, token, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

async function createUser(email, password) {
  const hashed = await bcrypt.hash(password, 10);
  const user = { email, password: hashed, token: uuidv4() };
  users.push(user);
  return user;
}

function findUserBy(field, value) {
  return users.find((u) => u[field] === value);
}

// 🧩 Auth endpoints
app.post('/api/auth/register', async (req, res) => {
  if (findUserBy('email', req.body.email)) {
    res.status(409).send({ msg: 'User already exists' });
  } else {
    const user = await createUser(req.body.email, req.body.password);
    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const user = findUserBy('email', req.body.email);
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    user.token = uuidv4();
    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  } else {
    res.status(401).send({ msg: 'Invalid credentials' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  const user = findUserBy('token', req.cookies[authCookieName]);
  if (user) delete user.token;
  res.clearCookie(authCookieName);
  res.status(204).end();
});

function verifyAuth(req, res, next) {
  const user = findUserBy('token', req.cookies[authCookieName]);
  if (user) next();
  else res.status(401).send({ msg: 'Unauthorized' });
}

// 🌿 Habit endpoints
app.get('/api/habits', verifyAuth, (_req, res) => {
  res.send(habits);
});

app.post('/api/habits', verifyAuth, (req, res) => {
  const newHabit = { id: uuidv4(), ...req.body };
  habits.push(newHabit);
  res.status(201).send(newHabit);
});

app.patch('/api/habits/:id', verifyAuth, (req, res) => {
  const idx = habits.findIndex((h) => h.id === req.params.id);
  if (idx !== -1) {
    habits[idx] = { ...habits[idx], ...req.body };
    res.send(habits[idx]);
  } else {
    res.status(404).send({ msg: 'Habit not found' });
  }
});

app.delete('/api/habits/:id', verifyAuth, (req, res) => {
  habits = habits.filter((h) => h.id !== req.params.id);
  res.status(204).end();
});

// 🖼️ Serve frontend (for deployment)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, '../public')));

// 🎧 Start server
app.listen(port, () => {
  console.log(`HABITat service running on port ${port}`);
});
