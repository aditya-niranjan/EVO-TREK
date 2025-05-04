#!/bin/bash

# Set environment variables for development
export NODE_ENV=development
export PORT=5000

# Check if MongoDB is running locally
echo "Checking if MongoDB is running locally..."
if command -v mongod &> /dev/null; then
    # MongoDB is installed, check if it's running
    if pgrep -x "mongod" > /dev/null; then
        echo "MongoDB is running."
    else
        echo "MongoDB is not running. Starting MongoDB..."
        mongod --dbpath=./data/db &
        sleep 2
        echo "MongoDB started."
    fi
else
    echo "MongoDB is not installed or not in PATH. Make sure MongoDB is available."
    echo "You can set MONGODB_URI in .env to use a remote MongoDB instance."
fi

# Start the server
echo "Starting server in development mode..."
npx nodemon src/index.js
