const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

// ROUTE 1 : create a user using: POST "/api/auth/createUser". doesn't require auth
router.post('/createUser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters long').isLength({ min: 5 })
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
    const authToken = jwt.sign(data, process.env.JWT_SECRET);

    // Return the newly created user
    return res.json({authToken});
  }
  catch (err) {
    console.error(`Error: ${err.message}`);
    return res.status(500).json({ error: 'Server Error' });
  }
});


// ROUTE 2 : authenticate a user using : /api/auth/login. No login required
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
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // password comparison
    let passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, process.env.JWT_SECRET);

    // Return the newly created user
    return res.json({authToken});

  } 
  catch (err) {
    console.error(`Error: ${err.message}`);
    return res.status(500).json({ error: 'Server Error' });
  }
});


// ROUTE 3 : get logged in user details : POST "/api/auth/getuser". login required
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    return res.send(user);
  } 
  catch (error) {
    console.log(`Error: ${error.message}`);
    return res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
