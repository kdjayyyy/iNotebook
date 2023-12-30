const express = require('express');
const User = require('../models/User')
const router = express.Router();

// create a user using: POST "/api/auth". doesn't require auth

// const newUser = new User({
//   name: 'Ravi',
//   email: 'ravi@gmail.com',
//   password: 'arucoMarkers',
// });

router.get('/', (req, res) => {



  res.send(req.body);
});

module.exports = router;
           