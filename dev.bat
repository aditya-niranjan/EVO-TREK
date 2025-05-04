@echo off
echo Starting EvoTrek in development mode...

:: Set environment variables
set NODE_ENV=development
set PORT=5000

:: Check if MongoDB is running (simplified check for Windows)
echo Checking MongoDB status...
tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo MongoDB is running.
) else (
    echo MongoDB is not running. Please start MongoDB manually.
    echo You can set MONGODB_URI in .env to use a remote MongoDB instance.
)

:: Start the server
echo Starting server...
npx nodemon src/index.js
