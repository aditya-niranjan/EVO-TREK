const mongoose = require('mongoose');
require('dotenv').config();

const mongodbURL = process.env.DB_URL || 'mongodb://localhost:27017/evotrek';



// Determine environment
const isProduction = process.env.NODE_ENV === 'production';

// Use environment variable for MongoDB connection string
// In production, use DB_URL from environment variables
// In development, fall back to local MongoDB if not provided

// Connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Connect to MongoDB
const connectDB = mongoose.connect(mongodbURL, options);

// Log connection status
connectDB
  .then(() => {
    console.log(`Connected to MongoDB ${isProduction ? 'in production' : 'locally'}`);
    if (!isProduction) {
      console.log(`Database: ${mongodbURL.includes('localhost') ? 'Local MongoDB' : 'MongoDB Atlas'}`);
    }
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    if (!isProduction) {
      console.log('Make sure MongoDB is running locally or provide a valid DB_URL in .env file');
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



