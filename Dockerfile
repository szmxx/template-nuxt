# Dockerfile

# Stage 1: Build the Nuxt application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy all files
COPY . .

# Build the application
RUN pnpm run build

# Stage 2: Create the production image with Nginx
FROM nginx:alpine

# Copy the built Nuxt app from the builder stage
# Install Node.js and pm2 to run the Nuxt server
RUN apk add --no-cache nodejs npm
RUN npm install -g pm2

# Copy the built Nuxt app from the builder stage
# Install Node.js for running the Nuxt server
RUN apk add --no-cache nodejs

# Copy the built Nuxt app and node_modules from the builder stage
COPY --from=builder /app/.output /app/.output
COPY --from=builder /app/node_modules /app/node_modules

# Copy the Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx and the Nuxt server with pm2
CMD sh -c "(pm2-runtime /app/.output/server/index.mjs --name nuxt-app &) && nginx -g 'daemon off;'"