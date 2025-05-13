const mongoose = require('mongoose');
require('dotenv').config();

// Determine environment
const isProduction = process.env.NODE_ENV === 'production';
const isVercel = !!process.env.VERCEL_URL;

// Get MongoDB connection string from environment variables
// In production, use DB_URL from environment variables
// In development, fall back to local MongoDB if not provided
const mongodbURL = process.env.DB_URL || 'mongodb://localhost:27017/evotrek';

// Log MongoDB connection attempt
console.log(`Attempting to connect to MongoDB ${isProduction ? 'in production' : 'locally'}`);
console.log(`MongoDB URL is ${mongodbURL ? 'provided' : 'not provided'}`);

// Connection options with improved reliability for serverless environments
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 30
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};

// For Vercel, add additional connection options
if (isVercel) {
  options.bufferCommands = false; // Disable mongoose buffering
  options.autoCreate = false; // Disable auto creation of indexes
}

// Connect to MongoDB with retry logic
const connectWithRetry = async (retryCount = 0, maxRetries = 3) => {
  try {
    await mongoose.connect(mongodbURL, options);
    console.log(`Successfully connected to MongoDB ${isProduction ? 'in production' : 'locally'}`);

    if (!isProduction) {
      console.log(`Database: ${mongodbURL.includes('localhost') ? 'Local MongoDB' : 'MongoDB Atlas'}`);
    }
  } catch (err) {
    console.error(`MongoDB connection error (attempt ${retryCount + 1}/${maxRetries}):`, err.message);

    if (retryCount < maxRetries) {
      console.log(`Retrying connection in ${(retryCount + 1) * 1000}ms...`);
      setTimeout(() => connectWithRetry(retryCount + 1, maxRetries), (retryCount + 1) * 1000);
    } else {
      console.error('Failed to connect to MongoDB after multiple attempts');
      if (!isProduction) {
        console.log('Make sure MongoDB is running locally or provide a valid DB_URL in .env file');
      }
    }
  }
};

// Start connection process
connectWithRetry();

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



