# ==========================================
# STAGE 1: Build the React + TS Frontend
# ==========================================
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

# Copy dependencies manifest and install
COPY frontend/package.json ./
RUN npm install

# Copy source and build static bundle
COPY frontend/ ./
RUN npm run build

# ==========================================
# STAGE 2: Build and Serve via FastAPI
# ==========================================
FROM python:3.11-slim AS backend-runner
WORKDIR /app

# Install backend python dependencies
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy FastAPI backend code
COPY backend/ ./backend/

# Copy compiled frontend assets into backend/static directory
COPY --from=frontend-builder /app/frontend/dist/ ./backend/static/

# Expose port 8000
EXPOSE 8000

# Set working directory to backend folder
WORKDIR /app/backend

# Start the uvicorn server serving both API and Frontend
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
