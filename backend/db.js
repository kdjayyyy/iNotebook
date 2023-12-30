const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://kdjayyyy:myBackendProjectaruco@cluster1.tqzuoib.mongodb.net/';

connectToMongo().catch(err => console.log(`Caught an error: ${err}`))
async function connectToMongo() {
  await mongoose.connect(mongoURI);
  console.log('Connected to mongoose successfully');
}

module.exports = connectToMongo;
