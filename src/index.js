const express = require('express');
const path = require('path');
const fs = require('fs');

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Resolve paths - use process.cwd() for Vercel compatibility
const isVercel = !!process.env.VERCEL;
const baseDir = isVercel ? process.cwd() : path.resolve(__dirname, '..');
const viewsDir = path.join(baseDir, 'views');
const publicDir = path.join(baseDir, 'public');

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', viewsDir);

// Serve static files
app.use(express.static(publicDir));

// Debug: Log resolved paths on cold start
console.log('[EvoTrek] isVercel:', isVercel);
console.log('[EvoTrek] baseDir:', baseDir);
console.log('[EvoTrek] views dir:', viewsDir, '| exists:', fs.existsSync(viewsDir));
console.log('[EvoTrek] public dir:', publicDir, '| exists:', fs.existsSync(publicDir));
if (fs.existsSync(viewsDir)) {
    console.log('[EvoTrek] views files:', fs.readdirSync(viewsDir));
}

// ===============================================
// Static Demo Routes — each wrapped in try-catch for Vercel debugging
// ===============================================

app.get('/', (req, res) => {
    try { res.render('home'); }
    catch (e) { console.error('/ error:', e); res.status(500).send('Render error: ' + e.message); }
});

app.get('/home', (req, res) => {
    try { res.render('home'); }
    catch (e) { console.error('/home error:', e); res.status(500).send('Render error: ' + e.message); }
});

app.get('/shopping', (req, res) => {
    try { res.render('shopping'); }
    catch (e) { console.error('/shopping error:', e); res.status(500).send('Render error: ' + e.message); }
});

app.get('/view-details', (req, res) => {
    try { res.render('view-details'); }
    catch (e) { console.error('/view-details error:', e); res.status(500).send('Render error: ' + e.message); }
});

app.get('/check-out-page', (req, res) => {
    try { res.render('check-out-page'); }
    catch (e) { console.error('/check-out-page error:', e); res.status(500).send('Render error: ' + e.message); }
});

// Redirect old routes to home
app.get('/login', (req, res) => res.redirect('/'));
app.get('/signup', (req, res) => res.redirect('/'));
app.get('/profile', (req, res) => res.redirect('/'));
app.get('/logout', (req, res) => res.redirect('/'));

// ===============================================
// Error Handling
// ===============================================
app.use((err, req, res, next) => {
    console.error('Express Error:', err.stack || err.message || err);
    res.status(500).send('Server error: ' + (err.message || 'Unknown'));
});

app.use((req, res) => {
    res.status(404).send('Page not found');
});

// ===============================================
// Export for Vercel + Start for Render/local
// ===============================================
module.exports = app;

if (!isVercel) {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`EvoTrek demo running on http://localhost:${port}`);
    });
}
