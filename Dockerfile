FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY backend/package*.json ./backend/
COPY frontend ./frontend/

# Install dependencies
RUN cd backend && npm ci

# Expose port
EXPOSE 3000

# Start server
CMD ["node", "backend/server.js"]
