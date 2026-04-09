# ── Stage 1: Build React frontend ──
FROM oven/bun:1 AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN bun install --frozen-lockfile
COPY frontend/ .
RUN bun run build

# ── Stage 2: Final image with backend ──
FROM oven/bun:1-slim

WORKDIR /app

# Copy the whole backend folder (keeps the same structure as dev)
COPY backend/ ./backend/

# Install backend dependencies inside the backend folder
WORKDIR /app/backend
RUN bun install --frozen-lockfile --production

# Copy the built React app to the exact location server.js expects
COPY --from=frontend-builder /app/frontend/dist ../frontend/dist

EXPOSE 3000

# Start from the backend directory (where package.json + src/ live)
CMD ["bun", "run", "start"]