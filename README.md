# Kit Alika

A monorepo project featuring a Node.js/Express backend and React/Vite frontend unified in a single Docker container.

## How to Run the Project

### Using Docker (Recommended)

The simplest way to run the project is with Docker, which builds and runs both frontend and backend in a single container. Make sure you have Docker installed and running.

1.  **Build the Docker image:**
    Open a terminal in the root directory of the project and run:

    ```bash
    docker build -t kit-alika .
    ```

2.  **Run the Docker container:**

    ```bash
    docker run -p 3000:3000 kit-alika
    ```

3.  **Or using docker compose:**

    ```bash
    // run
    docker compose up --build -d

    // stop
    docker compose down

    ```

4.  **Access the application:**
    Open your web browser and navigate to [http://localhost:3000](http://localhost:3000).

The application is now running, with the Express backend serving the React frontend and providing the API.

### Without Docker (Development Mode)

For development, you can run the frontend and backend separately:

#### Backend (Express Server)

```bash
cd backend
npm install          # Install dependencies (first time only)
npm run dev          # Start server with hot reload on http://localhost:3000
```

#### Frontend (React/Vite App)

```bash
cd frontend
npm install          # Install dependencies (first time only)
npm run dev          # Start development server with HMR
# The frontend will be available at http://localhost:5173
# and will proxy API requests to the backend running on port 3000
```

### Testing the API

You can test the backend API endpoints directly:

```bash
# Test the health check endpoint
curl http://localhost:3000/api/test

# Get all products
curl http://localhost:3000/api/product

# Get a specific product
curl http://localhost:3000/api/product/1
```

### Building for Production

To create a production build of the frontend:

```bash
cd frontend
npm run build        # Creates optimized build in ./dist
```

Then serve it with the backend:

```bash
cd backend
npm start            # Serves static files from frontend/dist
```

## Project Overview

Kit Alika is a full-stack application designed for managing pet care products. The project follows a monorepo structure with clearly separated concerns:

### Backend (`/backend`)

- **Technology**: Node.js with Express 5
- **Features**:
  - RESTful API endpoints for product catalog
  - CORS middleware for cross-origin requests
  - Static file serving for frontend assets
  - JSON body parsing
  - Health check endpoint (`/api/test`)
  - Product endpoints (`/api/product` and `/api/product/:id`)
- **Data**: Currently uses static in-memory data (no database)

### Frontend (`/frontend`)

- **Technology**: React 19 with Vite
- **Features**:
  - Modern React hooks and functional components
  - Client-side routing with React Router v7
  - Centralized API service layer (`src/api/api-calls.js`)
  - Environment-aware configuration
  - SEO management via react-helmet-async
  - Modular component architecture
  - ESLint configuration for code quality

### Architecture Highlights

- **Development**: Frontend Vite dev server proxies `/api` requests to backend on port 3000
- **Production**: Single Docker container serves both static frontend assets and API endpoints
- **Communication**: All API calls go through `frontend/src/api/api-calls.js` which centralizes base URL and fetch logic
- **Deployment**: Multi-stage Docker build optimizes for size and performance

### Key Files

- `backend/src/server.js` - Express application entry point
- `backend/src/routes/` - API route definitions
- `frontend/src/api/api-calls.js` - Centralized API fetch functions
- `frontend/src/main.jsx` - React application entry point
- `Dockerfile` - Multi-stage build for production container
- `vite.config.js` - Vite configuration with API proxy

This structure provides a clean separation of concerns while maintaining simplicity for development and deployment.
