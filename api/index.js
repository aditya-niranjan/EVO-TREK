// Vercel serverless function entry point
const app = require('../src/index');

// Export as a proper request handler for Vercel
module.exports = (req, res) => {
  // Ensure Express processes the original URL path
  if (!req.url) req.url = '/';
  app(req, res);
};
