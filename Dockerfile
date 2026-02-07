# Use Node.js 20 alpine as required by Next.js 16
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first to leverage cache
COPY package.json package-lock.json* ./

# Install dependencies strictly from lock file
RUN npm ci

# Copy the rest of the application code
COPY . .

# Run linting to ensure code quality
# If this fails, the build will stop here
RUN npm run lint

# Build the Next.js application
# If this fails, the build will stop here
RUN npm run build


# Production server with compression
EXPOSE 3000
ENV NODE_ENV=production
CMD npm run start
