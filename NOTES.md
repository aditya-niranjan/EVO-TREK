# EvoTrek — Dev Notes

## Quick Start
```bash
npm install
npm run dev      # local dev with nodemon
npm start        # production start
```
Open `http://localhost:5000`

## Routes
| Page | URL |
|------|-----|
| Home | `/` |
| Shop | `/shopping` |
| Product Detail | `/view-details` |
| Checkout | `/check-out-page` |

## Deploy
- **Vercel**: Auto-deploys from `static-demo` branch via `api/index.js` serverless handler
- **Render**: Uses `npm start` as a persistent server

---

## Things to Improve (for future projects)

### 1. Organize `public/` folder
```
❌  public/home.css, shopping.js, products.json (all flat)
✅  public/css/home.css, public/js/shopping.js, public/data/products.json
```

### 2. Consistent file naming
```
❌  view-details-js.js, view-details-css.css, home-resp-js.js
✅  view-details.js, view-details.css, home-responsive.js
```

### 3. Use EJS partials (don't copy-paste nav/header)
```html
<!-- views/partials/nav.ejs -->
<%- include('partials/nav') %>
```

### 4. Always use absolute paths for assets
```html
❌  <link href="shopping.css">
✅  <link href="/css/shopping.css">
```
*This is what caused the Vercel 500 errors.*

### 5. Don't fake a backend
If it's a static demo, keep it static from the start. Don't write mock DB files (`mongodb.js` returning `null`) — it confuses the code and adds failure points.

### 6. Add tooling early
```bash
npm init @eslint/config   # linting
npm i -D prettier          # formatting
```

### 7. Fix the typo in check-out-page.ejs
```html
❌  <form " id="checkoutForm">
✅  <form id="checkoutForm">
```
