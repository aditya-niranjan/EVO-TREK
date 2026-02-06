// Vercel serverless function entry point
let app;
try {
  app = require('../src/index');
  console.log('[Vercel] App loaded successfully');
} catch (e) {
  console.error('[Vercel] FAILED to load app:', e);
}

module.exports = (req, res) => {
  if (!app) {
    res.status(500).send('App failed to initialize. Check Vercel build logs.');
    return;
  }
  try {
    app(req, res);
  } catch (e) {
    console.error('[Vercel] Request handler error:', e);
    res.status(500).send('Handler error: ' + e.message);
  }
};
