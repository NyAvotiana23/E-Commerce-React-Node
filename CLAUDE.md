# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Monorepo with a Node.js/Express backend and a React/Vite frontend, unified into a single Docker container. The Express server serves the built React app statically and proxies API calls.

## Structure

- `backend/` — Express server (Node.js)
  - `src/server.js` — Main entry point: serves static files, handles API routes, CORS
  - `src/routes/` — API route definitions
    - `test.route.js` — Health check endpoint (`/api/test`)
    - `product.route.js` — Product catalog endpoints (`/api/product` and `/api/product/:id`)
- `frontend/` — React 19 + Vite app
  - `src/api/api-calls.js` — Centralized API fetch calls to the backend
  - `src/api/data-test.js` — Tests the backend `/api/test` endpoint
  - `src/App.jsx` — Main React component (via router)
  - `src/pages/` — Page components (Home, ProductPage, ErrorPage)
  - `src/components/` — Reusable UI components
  - `src/layouts/` — Layout components (RootLayout)
  - `src/router/` — React Router configuration

## Commands

### Backend Development
```bash
# Install dependencies (first time or after package changes)
cd backend
npm install

# Development mode with hot reload
npm run dev

# Production mode
npm start
```

### Frontend Development
```bash
# Install dependencies (first time or after package changes)
cd frontend
npm install

# Development mode with HMR
npm run dev

# Lint JavaScript/JSX files
npm run lint

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Testing
```bash
# Test backend connectivity from frontend
cd frontend
npm run dev  # Start dev server
# In another terminal:
node src/api/data-test.js  # Tests /api/test endpoint

# Manual API testing
curl http://localhost:3000/api/test
curl http://localhost:3000/api/product
curl http://localhost:3000/api/product/1
```

### Docker (Single Container for Both)
```bash
# Build the Docker image
docker build -t kit-alika .

# Run the container
docker run -p 3000:3000 kit-alika

# With docker-compose (if configured)
docker-compose up --build
```

### Environment Variables
- Backend: `PORT` (defaults to 3000)
- Frontend: `VITE_API_BASE` (defaults to "/api" in development, used in production Docker build)

## Architecture

### Backend
- Express 5 with CORS middleware
- Serves React build output as static files from `frontend/dist`
- API routes prefixed with `/api/`
- JSON body parsing enabled
- Static product data served from memory (no database)

### Frontend
- Vite development server with proxy forwarding `/api` requests to backend
- React Router for client-side routing
- Centralized API service (`api-calls.js`) with error handling
- Environment-aware API base URL
- SEO management via react-helmet-async

### Docker Production Build
1. Multi-stage build:
   - Stage 1: Build frontend with Vite
   - Stage 2: Copy frontend dist to backend server
   - Stage 3: Serve static files + API on port 3000
2. Single container eliminates CORS issues in production
3. Backend serves both API and static frontend assets

### Data Flow
```
Frontend → api-calls.js → Vite Proxy (/api → localhost:3000) 
        → Express Server → Route Handler → JSON Response
```

## Development Workflow

1. Start backend: `cd backend && npm run dev`
2. Start frontend: `cd frontend && npm run dev`
3. Frontend automatically proxies `/api` requests to backend
4. Edit files and see changes via HMR (frontend) and nodemon (backend)
5. For production testing: `docker build -t kit-alika . && docker run -p 3000:3000 kit-alika`

## Code Quality

- ESLint configured for frontend (`npm run lint`)
- Backend relies on Express error handling and manual testing
- API responses follow consistent format: `{ status, data/timestamp, message? }`
- Error handling includes proper HTTP status codes