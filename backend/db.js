const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017';

connectToMongo().catch(err => console.log(`Caught an error: ${err}`))
async function connectToMongo() {
  await mongoose.connect(mongoURI);
  console.log('Connected to mongoose successfully');
}

module.exports = connectToMongo;
