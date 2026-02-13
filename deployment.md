# Deployment Guide 🚀

The application is ready for deployment. This guide covers deploying the **Backend** (Node.js/Express) and the **Frontend** (React).

## Option 1: Deploying to Render (Recommended for Free Tier)

### 1. Backend Deployment
1.  Push your code to **GitHub**.
2.  Go to [Render Dashboard](https://dashboard.render.com/).
3.  Click **New +** -> **Web Service**.
4.  Connect your GitHub repository.
5.  **Settings**:
    -   **Root Directory**: `backend`
    -   **Build Command**: `npm install`
    -   **Start Command**: `node server.js`
6.  **Environment Variables**:
    -   Add `MONGO_URI`: (Copy from your `.env` file)
    -   Add `NODE_ENV`: `production`
7.  Click **Create Web Service**.
    -   *Copy the URL provided by Render (e.g., `https://maze-backend.onrender.com`).*

### 2. Frontend Deployment
1.  Go to [Render Dashboard](https://dashboard.render.com/).
2.  Click **New +** -> **Static Site**.
3.  Connect the same GitHub repository.
4.  **Settings**:
    -   **Root Directory**: `frontend`
    -   **Build Command**: `npm run build`
    -   **Publish Directory**: `build`
5.  **Environment Variables**:
    -   Add `REACT_APP_API_URL`: The Backend URL from Step 1 (e.g., `https://maze-backend.onrender.com`).
    *Note: You'll need to update `frontend/src/utils/api.js` to use this env var if not already set.*

---

## Option 2: Deploying to Vercel

### 1. Backend Deployment
1.  Install Vercel CLI: `npm i -g vercel`
2.  Run `vercel` inside the root folder.
3.  Link to your Vercel project.
4.  Set Output Directory to `backend`.

### 2. Frontend Deployment
1.  Go to Vercel Dashboard.
2.  Import Project from GitHub.
3.  **Root Directory**: `frontend`.
4.  **Build Command**: `npm run build`.
5.  **Output Directory**: `build`.
6.  Add Environment Variable `REACT_APP_API_URL` pointing to your backend.

## Important Code Change for Deployment
Before deploying frontend, ensure `frontend/src/utils/api.js` points to the production backend, not localhost.

**Current:**
```javascript
const API_BASE = '/api'; // relies on proxy
```

**Change for Production Build:**
```javascript
const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.onrender.com/api' 
  : '/api';
```
