const jwt = require('jsonwebtoken');

const fetchuser = (req, res, next) => {
  // get the user from the jwt token and then add the user ID to the req object

  // token validation
  const token = req.header('auth-token');
  if(!token) {
    res.status(401).send({ error: 'Please authenticate using a valid token' });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } 
  catch(err) {
    return res.status(401).send({ err: 'Please authenticate using a valid token' });
  }
}

module.exports = fetchuser;