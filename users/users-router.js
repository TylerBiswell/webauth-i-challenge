const express = require('express');
const bcrypt = require('bcryptjs');

const Users = require('./users-model');

const router = express();

// POST /api/register Endpoint
router.post('/register', (req, res) => {
  // res.send('POST /api/register endpoint');
  let user = req.body;

  if (user.username && user.password) {
    const hash = bcrypt.hashSync(user.password, 8);

    user.password = hash;

    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  } else {
    res
      .status(400)
      .json({ message: 'Please provide registration information' });
  }
});

// POST /api/login Endpoint
router.post('/login', (req, res) => {
  res.send('POST /api/login endpoint');
});

// GET /api/users Endpoint
router.get('/users', (req, res) => {
  res.send('GET /api/users endpoint');
});

module.exports = router;