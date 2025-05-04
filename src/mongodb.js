const mongoose = require('mongoose');
require('dotenv').config();

// Determine environment
const isProduction = process.env.NODE_ENV === 'production';

// Use environment variable for MongoDB connection string
// In production, use MONGODB_URL from Vercel environment variables
// In development, fall back to local MongoDB if not provided
const MONGODB_URI = process.env.MONGODB_URL || 'mongodb://localhost:27017/evotrek';

// Connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Connect to MongoDB
const connectDB = mongoose.connect(MONGODB_URI, options);

// Log connection status
connectDB
  .then(() => {
    console.log(`Connected to MongoDB ${isProduction ? 'in production' : 'locally'}`);
    if (!isProduction) {
      console.log(`Database: ${MONGODB_URI.includes('localhost') ? 'Local MongoDB' : 'MongoDB Atlas'}`);
    }
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    if (!isProduction) {
      console.log('Make sure MongoDB is running locally or provide a valid MONGODB_URL in .env file');
    }
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



