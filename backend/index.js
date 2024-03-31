const connectToMongo = require('./db');
const express = require('express');
const authRouter = require('./routes/auth');
const notesRouter = require('./routes/notes');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = 5000;
app.use(cors({
  origin: "http://localhost:3000"
}
));
app.use(express.json());

// AVAILABLE ROUTES
app.use('/api/auth', authRouter);
app.use('/api/notes', notesRouter);

connectToMongo().catch(err => console.log(`Caught an error: ${err}`))
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
}); 
