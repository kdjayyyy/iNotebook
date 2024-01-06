const connectToMongo = require('./db');
const express = require('express');
const authRouter = require('./routes/auth');
const notesRouter = require('./routes/notes');
require('dotenv').config({ path: '../.env' });

const app = express();
const port = 5000;
connectToMongo().catch(err => console.log(`Caught an error: ${err}`))
app.use(express.json());

// AVAILABLE ROUTES
app.use('/api/auth', authRouter);
app.use('/api/notes', notesRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
}); 