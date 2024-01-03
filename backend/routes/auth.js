const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'boyT@ISguddd';


// create a user using: POST "/api/auth/createUser". doesn't require auth
router.post('/createUser', [
  body('name').isLength({ min: 3 }),
  body('email').isEmail(),
  body('password').isLength({ min: 5 })
], async (req, res) => {
  try {

    // in case errors exist, return a bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if the user with the provided email already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: 'User with this email already exists!' });
    }

    // bcrypt salting
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword
    });

    // JWT token -> signing
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);

    // Return the newly created user
    return res.json({authToken});
  }
  catch (err) {
    console.error(`Error: ${err.message}`);
    return res.status(500).json({ error: 'Server Error' });
  }
});


// authenticate a user using : /api/auth/login. No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists()
], async (req, res) => {
  try {

    // in case errors exist, return a bad request and the error
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // find user
    let user = await User.findOne({ email });
    if(!user) {
      return res.status(400).json({ error: "User not found!" });
    }

    // password comparison
    let passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: " Please login with the correct credentials!" });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);

    // Return the newly created user
    return res.json({authToken});

  }
  catch (err) {
    console.error(`Error: ${err.message}`);
    return res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
