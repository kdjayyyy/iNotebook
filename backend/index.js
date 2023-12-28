const connectToMongo = require('./db');
const express = require('express');
const app = express();
const port = 3000;
connectToMongo();

app.get('/', (req, res) => {
  res.send('Yeee boiiii');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


