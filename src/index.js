const express = require('express');
const path = require('path');

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// Serve static files (absolute path for Vercel compatibility)
app.use(express.static(path.join(__dirname, '..', 'public')));

// ===============================================
// Static Demo Routes
// ===============================================

// Home / Landing Page
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/home', (req, res) => {
    res.render('home');
});

// Shopping Page
app.get('/shopping', (req, res) => {
    res.render('shopping');
});

// Product View Details
app.get('/view-details', (req, res) => {
    res.render('view-details');
});

// Checkout Page
app.get('/check-out-page', (req, res) => {
    res.render('check-out-page');
});

// Redirect any old login/signup/profile links back to home
app.get('/login', (req, res) => res.redirect('/'));
app.get('/signup', (req, res) => res.redirect('/'));
app.get('/profile', (req, res) => res.redirect('/'));
app.get('/logout', (req, res) => res.redirect('/'));

// ===============================================
// Error Handling
// ===============================================
app.use((err, req, res, next) => {
    console.error('Error:', err.message || err);
    res.status(500).send('Something went wrong.');
});

app.use((req, res) => {
    res.status(404).send('Page not found');
});

// ===============================================
// Export for Vercel + Start for Render/local
// ===============================================
module.exports = app;

const isVercel = !!process.env.VERCEL;
if (!isVercel) {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`EvoTrek demo running on http://localhost:${port}`);
    });
}
