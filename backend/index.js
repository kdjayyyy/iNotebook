const connectToMongo = require('./db');
const express = require('express');
const authRouter = require('./routes/auth');

const app = express();
const port = 5000;
connectToMongo();
app.use(express.json());

// AVAILABLE ROUTES
app.use('/api/auth', authRouter);
// app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
}); 