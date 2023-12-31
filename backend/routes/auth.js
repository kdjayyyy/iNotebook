const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// create a user using: POST "/api/auth/createUser". doesn't require auth

router.post('/createUser', [
  body('name').isLength({ min: 3 }),
  body('email').isEmail(),
  body('password').isLength({ min: 5 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if the user with the provided email already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: 'User with this email already exists!' });
    }

    // Create a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    // Return the newly created user
    return res.json(user);
  } 
  catch(err) {
    console.error(`Error: ${err.message}`);
    return res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
