const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { collection } = require('./mongodb'); // User collection
const { Order } = require('./order');        // Order model
const { Cart } = require('./cart');          // Cart model
const { ObjectId } = require('mongodb');     // For _id conversion

// Load environment variables from .env file
require('dotenv').config();

// Initialize Express app
const app = express();

// Enable CORS for all routes (helpful for local development)
app.use(cors());

// Middleware for parsing JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the public directory
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, '..', 'public')));




// Login Page
app.get('/', (req, res) => {
    res.render('login', { message: null, alertType: null });
});

// Signup Page
app.get('/signup', (req, res) => {
    res.render('signup');
});

// Signup logic
app.post('/signup', async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    };

    const existingUser = await collection.findOne({ name: data.name });
    if (existingUser) {
        res.send("User already exists. Please choose another username.");
    } else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword;
        await collection.insertMany([data]);
        res.render('login');
    }
});

// Login logic
app.post('/login', async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) return res.send("User not found");

        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (isPasswordMatch) {
            res.render("home", { username: check.name, userId: check._id.toString() });
        } else {
            res.send("Invalid password or username");
        }
    } catch {
        res.send("Something went wrong");
    }
});

// Shopping Page
app.get('/shopping', (req, res) => {
    res.render('shopping');
});

// Checkout Page
app.get('/check-out-page', (req, res) => {
    res.render('check-out-page');
});

// Checkout Route: Save full form + account name + items
app.post('/checkout', async (req, res) => {
    try {
        const userId = req.body.user;
        const user = await collection.findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return res.status(404).send("User not found");
        }

        // items should come as an array of objects like { name, price, image }
        const order = new Order({
            userId: user._id,
            username: user.name,             // From DB
            fullName: req.body.fullName,     // From checkout form
            address: req.body.address,
            email: req.body.email,
            phone: req.body.phone,
            items: req.body.items,            // Contains name, price, image
            total: req.body.total,
            date: req.body.date
        });

        await order.save();
        res.redirect(`/home?userId=${userId}`);
    } catch (err) {
        console.error("Checkout Error:", err);
        res.status(500).send("Failed to save order");
    }
});

// Home Page
app.get('/home', (req, res) => {
    // Check if userId is provided in query params
    const userId = req.query.userId;
    if (userId) {
        // If userId is provided, fetch user and pass to template
        collection.findOne({ _id: new ObjectId(userId) })
            .then(user => {
                if (user) {
                    res.render('home', { username: user.name, userId: user._id.toString() });
                } else {
                    res.render('home');
                }
            })
            .catch(err => {
                console.error("Home Page Error:", err);
                res.render('home');
            });
    } else {
        // If no userId, just render the home page
        res.render('home');
    }
});

// Logout
app.get('/logout', (req, res) => {
    res.render('login');
});

// ===============================================
// New Added Code for Profile and Password Update + Order History
// ===============================================

// Profile Page
app.get('/profile', async (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
        return res.redirect('/');
    }

    try {
        const user = await collection.findOne({ _id: new ObjectId(userId) });
        const orders = await Order.find({ userId: new ObjectId(userId) }).sort({ date: -1 });

        if (!user) {
            return res.redirect('/');
        }

        res.render('profile', {
            user,
            orders,
            message: null,
            alertType: null
        });
    } catch (err) {
        console.error("Profile Load Error:", err);
        res.redirect('/');
    }
});

// Update Password
app.post('/update-password', async (req, res) => {
    // Extract user data from request body
    const userId = req.body.userId;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    // Validate inputs
    if (!userId || !oldPassword || !newPassword) {
        return res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Error</title>
                <script>
                    alert('Missing required fields. Please provide all required information.');
                    window.location.href = '/profile?userId=${userId}';
                </script>
            </head>
            <body>
                <h1>Error</h1>
                <p>Missing required fields. If you are not redirected automatically, please <a href="/profile?userId=${userId}">click here</a> to go back to your profile.</p>
            </body>
            </html>
        `);
    }

    try {
        // Find user by ID
        const user = await collection.findOne({ _id: new ObjectId(userId) });

        // Check if user exists
        if (!user) {
            return res.send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Error</title>
                    <script>
                        alert('User not found. Please try again.');
                        window.location.href = '/';
                    </script>
                </head>
                <body>
                    <h1>Error</h1>
                    <p>User not found. If you are not redirected automatically, please <a href="/">click here</a> to go to the login page.</p>
                </body>
                </html>
            `);
        }

        // Verify old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Error</title>
                    <script>
                        alert('Old password is incorrect. Please try again.');
                        window.location.href = '/profile?userId=${userId}';
                    </script>
                </head>
                <body>
                    <h1>Error</h1>
                    <p>Old password is incorrect. If you are not redirected automatically, please <a href="/profile?userId=${userId}">click here</a> to go back to your profile.</p>
                </body>
                </html>
            `);
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password in database
        await collection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: { password: hashedPassword } }
        );

        // Return success response with redirect to login
        return res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Password Updated</title>
                <script>
                    alert('Password updated successfully. Please login with your new password.');
                    window.location.href = '/';
                </script>
            </head>
            <body>
                <h1>Password Updated Successfully</h1>
                <p>If you are not redirected automatically, please <a href="/">click here</a> to go to the login page.</p>
            </body>
            </html>
        `);
    } catch (err) {
        // Log error and return error response
        console.error("Password Update Error:", err);
        return res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Error</title>
                <script>
                    alert('An error occurred while updating your password. Please try again.');
                    window.location.href = '/profile?userId=${userId}';
                </script>
            </head>
            <body>
                <h1>Error</h1>
                <p>An error occurred while updating your password. If you are not redirected automatically, please <a href="/profile?userId=${userId}">click here</a> to go back to your profile.</p>
            </body>
            </html>
        `);
    }
});

// Clear Order History
app.post('/clear-orders', async (req, res) => {
    try {
        const userId = req.body.userId;
        await Order.deleteMany({ userId });
        res.redirect(`/profile?userId=${userId}`);
    } catch (err) {
        console.error("Clear Orders Error:", err);
        res.status(500).send("Failed to clear orders");
    }
});


app.get('/view-details', (req, res) => {
    res.render('view-details');
});

// ===============================================
// Cart API Routes
// ===============================================

// Get cart for a user
app.get('/api/cart/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const cart = await Cart.findOne({ userId: new ObjectId(userId) });
        res.json(cart ? cart.items : []);
    } catch (err) {
        console.error("Get Cart Error:", err);
        res.status(500).json({ error: "Failed to get cart" });
    }
});

// Update cart for a user
app.post('/api/cart/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const items = req.body.items;

        // Upsert the cart (update if exists, create if doesn't)
        const result = await Cart.findOneAndUpdate(
            { userId: new ObjectId(userId) },
            {
                userId: new ObjectId(userId),
                items: items,
                updatedAt: new Date()
            },
            { upsert: true, new: true }
        );

        res.json(result.items);
    } catch (err) {
        console.error("Update Cart Error:", err);
        res.status(500).json({ error: "Failed to update cart" });
    }
});

// Clear cart for a user
app.delete('/api/cart/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        await Cart.findOneAndDelete({ userId: new ObjectId(userId) });
        res.json({ success: true });
    } catch (err) {
        console.error("Clear Cart Error:", err);
        res.status(500).json({ error: "Failed to clear cart" });
    }
});

// Get product details by ID
app.get('/api/products/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        // This assumes you're using the products.json file
        // In a real app, you'd fetch from a database
        const products = require('../public/products.json');
        const product = products.find(p => p.id == productId);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json(product);
    } catch (err) {
        console.error("Get Product Error:", err);
        res.status(500).json({ error: "Failed to get product" });
    }
});

// ===============================================

// Determine environment
const isProduction = process.env.NODE_ENV === 'production';

// Determine deployment platform
const isRender = process.env.RENDER === 'true' || !!process.env.RENDER_EXTERNAL_URL;
const isVercel = !!process.env.VERCEL_URL;

// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running in ${isProduction ? 'production' : 'development'} mode on port ${port}`);

    if (isProduction) {
        if (isRender) {
            console.log(`Deployed on Render: ${process.env.RENDER_EXTERNAL_URL || 'URL not available yet'}`);
        } else if (isVercel) {
            console.log(`Deployed on Vercel: ${process.env.VERCEL_URL || 'URL not available yet'}`);
        } else {
            console.log('Running in production mode');
        }
    } else {
        console.log(`Local URL: http://localhost:${port}`);
    }
});
