// Incldue the ExpressJS in our application
const express = require('express');
const cors = require('cors');  

// Instantiate an Express application
const app = express();

// Enable our Express application to parse JSON data
app.use(express.json());
app.use(cors());

// Create our temporary database
let db = [];

// ROUTES
// GET ALL USERS
app.get('/users', (req, res) => {
  res.json(db);
});

// GET A USER
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = db.find((u) => u.id === userId);
  
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// POST A USER
app.post('/users', (req, res) => {
  const { username, password } = req.body;
  const newUser = {
    id: db.length + 1,
    username,
    password
  };
  db.push(newUser);
  res.status(201).json(newUser);
});

// PUT/UPDATE A USER
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { username, password } = req.body;
  
  const user = db.find((u) => u.id === userId);
  
  if (user) {
    user.username = username || user.username;
    user.password = password || user.password;
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// DELETE A USER
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  users = db.filter((u) => u.id !== userId);
  
  res.status(204).json({ message: 'User deleted' });
});

// RUN SERVER
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
