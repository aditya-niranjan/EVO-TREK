const mongoose = require('mongoose');
require('dotenv').config();

// Use environment variable for MongoDB connection string
const MONGODB_URI_atlas = process.env.MONGODB_URL

const connectDB = mongoose.connect(MONGODB_URI_atlas, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

connectDB.then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log('MongoDB connection error:', err);
});

const loginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});


const  collection = mongoose.model('users', loginSchema);

module.exports = {collection};



