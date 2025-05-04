# EvoTrek E-commerce Website

A responsive e-commerce website for shoes with user authentication, shopping cart, and order management.

## Features

- User authentication (signup, login)
- Responsive design for all devices
- Shopping cart functionality
- Order placement and history
- Profile management with password update
- GSAP animations

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript, EJS templates, GSAP animations
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: bcrypt for password hashing

## Deployment on Vercel

### Prerequisites

1. A [Vercel](https://vercel.com/) account
2. A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
3. Git installed on your machine

### Setup Environment Variables

1. In your Vercel dashboard, go to your project settings
2. Add the following environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `SESSION_SECRET`: A secret string for session management

### Deployment Steps

1. Fork or clone this repository
2. Push your code to GitHub
3. Connect your GitHub repository to Vercel
4. Configure the environment variables in Vercel
5. Deploy the application

### Manual Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to Vercel
vercel
```

## Local Development

### Prerequisites

- Node.js installed (v14 or higher)
- MongoDB installed locally or MongoDB Atlas account
- Git installed

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/evotrek.git
cd evotrek
```

2. Install dependencies
```bash
npm install
```

3. Set up your environment variables:
   - Copy `.env.example` to `.env`
   ```bash
   cp .env.example .env
   ```
   - Edit `.env` with your specific configuration
   - For local MongoDB, use: `MONGODB_URI=mongodb://localhost:27017/evotrek`
   - For MongoDB Atlas, use your connection string

4. Start MongoDB locally (if using local MongoDB)
```bash
# Create a data directory if it doesn't exist
mkdir -p data/db

# Start MongoDB
mongod --dbpath=./data/db
```

5. Start the development server
```bash
# On Linux/Mac
./dev.sh

# On Windows
dev.bat

# Or use npm scripts
npm run dev
```

6. Open your browser and navigate to `http://localhost:5000`

### Development Scripts

- `npm start` - Start the server in production mode
- `npm run dev` - Start the server in development mode with auto-reload
- `npm run prod` - Start the server in production mode with production environment variables
- `npm run local` - Start the server using local .env file

## Project Structure

- `src/` - Server-side code
  - `index.js` - Main server file
  - `mongodb.js` - Database connection
  - `order.js` - Order model
  - `cart.js` - Cart model
- `public/` - Static assets
  - `css/` - Stylesheets
  - `js/` - Client-side JavaScript
  - `images/` - Image assets
- `views/` - EJS templates
  - `login.ejs` - Login page
  - `signup.ejs` - Signup page
  - `home.ejs` - Home page
  - `shopping.ejs` - Shopping page
  - `profile.ejs` - User profile page
  - `check-out-page.ejs` - Checkout page

## License

This project is licensed under the MIT License.
